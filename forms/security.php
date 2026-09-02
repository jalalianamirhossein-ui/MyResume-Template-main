<?php
declare(strict_types=1);

/**
 * Shared, server-side controls for the public contact form.
 *
 * This file deliberately contains no request handling, making its security
 * controls straightforward to exercise from a CLI test as well as HTTP.
 */

function meet_aj_is_https_request(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (isset($_SERVER['SERVER_PORT']) && (int) $_SERVER['SERVER_PORT'] === 443);
}

function meet_aj_start_secure_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    ini_set('session.use_strict_mode', '1');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => meet_aj_is_https_request(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function meet_aj_send_endpoint_security_headers(string $contentType): void
{
    header('Content-Type: ' . $contentType);
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');

    if (meet_aj_is_https_request()) {
        header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    }
}

function meet_aj_issue_csrf_token(): string
{
    if (!isset($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['csrf_token'];
}

function meet_aj_is_valid_csrf_token($submittedToken): bool
{
    $expectedToken = $_SESSION['csrf_token'] ?? null;

    return is_string($submittedToken)
        && is_string($expectedToken)
        && $expectedToken !== ''
        && hash_equals($expectedToken, $submittedToken);
}

function meet_aj_consume_csrf_token(): void
{
    unset($_SESSION['csrf_token']);
}

/**
 * Atomically consumes one request from a per-client hourly budget.
 *
 * @throws RuntimeException when a durable decision cannot be made. Callers
 *         should fail closed instead of accepting an unrate-limited request.
 */
function meet_aj_consume_contact_rate_limit(
    string $clientAddress,
    ?int $now = null,
    ?string $rateLimitDirectory = null
): bool {
    $now = $now ?? time();
    $rateLimitDirectory = $rateLimitDirectory
        ?? sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'meet-aj-contact-rate-limit';

    if (!is_dir($rateLimitDirectory) && !mkdir($rateLimitDirectory, 0700, true) && !is_dir($rateLimitDirectory)) {
        throw new RuntimeException('Unable to create rate-limit storage.');
    }

    @chmod($rateLimitDirectory, 0700);
    $rateLimitFile = $rateLimitDirectory . DIRECTORY_SEPARATOR . hash('sha256', $clientAddress) . '.json';
    $handle = fopen($rateLimitFile, 'c+');

    if ($handle === false) {
        throw new RuntimeException('Unable to open rate-limit storage.');
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            throw new RuntimeException('Unable to lock rate-limit storage.');
        }

        rewind($handle);
        $content = stream_get_contents($handle);
        $storedTimestamps = $content === false ? null : json_decode($content, true);
        $timestamps = is_array($storedTimestamps) ? $storedTimestamps : [];
        $timestamps = array_values(array_filter($timestamps, static function ($timestamp) use ($now): bool {
            return is_int($timestamp) && ($now - $timestamp) < 3600;
        }));

        if (count($timestamps) >= 5) {
            return false;
        }

        $timestamps[] = $now;
        $encodedTimestamps = json_encode($timestamps, JSON_THROW_ON_ERROR);

        rewind($handle);
        if (!ftruncate($handle, 0) || fwrite($handle, $encodedTimestamps) === false || !fflush($handle)) {
            throw new RuntimeException('Unable to persist rate-limit storage.');
        }

        @chmod($rateLimitFile, 0600);

        return true;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}
