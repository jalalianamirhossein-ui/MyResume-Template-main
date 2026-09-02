<?php
declare(strict_types=1);

require_once __DIR__ . '/../forms/security.php';

function assert_true(bool $condition, string $message): void
{
    if (!$condition) {
        throw new RuntimeException($message);
    }
}

$_SESSION = ['csrf_token' => str_repeat('a', 64)];
assert_true(meet_aj_is_valid_csrf_token(str_repeat('a', 64)), 'The expected CSRF token must validate.');
assert_true(!meet_aj_is_valid_csrf_token(['not-a-string']), 'Array-shaped CSRF input must be rejected safely.');
assert_true(!meet_aj_is_valid_csrf_token(str_repeat('b', 64)), 'A mismatched CSRF token must be rejected.');
meet_aj_consume_csrf_token();
assert_true(!meet_aj_is_valid_csrf_token(str_repeat('a', 64)), 'A consumed CSRF token must not be reusable.');

$rateLimitDirectory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'meet-aj-contact-rate-limit-test-' . bin2hex(random_bytes(8));
try {
    for ($request = 0; $request < 5; $request++) {
        assert_true(
            meet_aj_consume_contact_rate_limit('198.51.100.1', 1700000000, $rateLimitDirectory),
            'The first five requests must be accepted.'
        );
    }

    assert_true(
        !meet_aj_consume_contact_rate_limit('198.51.100.1', 1700000000, $rateLimitDirectory),
        'The sixth request in an hour must be rejected.'
    );

    assert_true(
        meet_aj_consume_contact_rate_limit('198.51.100.1', 1700003601, $rateLimitDirectory),
        'An expired rate-limit window must allow a new request.'
    );
} finally {
    $rateLimitFile = $rateLimitDirectory . DIRECTORY_SEPARATOR . hash('sha256', '198.51.100.1') . '.json';
    if (is_file($rateLimitFile)) {
        unlink($rateLimitFile);
    }
    if (is_dir($rateLimitDirectory)) {
        rmdir($rateLimitDirectory);
    }
}

echo "Contact security tests passed.\n";
