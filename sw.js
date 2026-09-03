/**
 * ===============================================
 * MEET AJ PORTFOLIO - SERVICE WORKER
 * ===============================================
 *
 * Progressive Web App (PWA) service worker
 * Handles offline functionality and caching strategies
 *
 * Features:
 * - Offline-first caching for static assets
 * - Automatic cache updates
 * - Performance optimization
 * - Dynamic form/API endpoints are NEVER cached
 *
 * Version: 1.0.6
 * Author: AmirHossein Jalalian
 * ===============================================
 */

// Cache configuration
const ASSET_VERSION = "1000";
const CACHE_NAME = `meet-aj-v1.0.6-${ASSET_VERSION}`;
const OFFLINE_FALLBACK_CACHE = `meet-aj-offline-${ASSET_VERSION}`;

const versionedAssets = [
  "./assets/css/main.css",
  "./assets/css/rtl.css",
  "./assets/css/lang-toggle.css",
  "./assets/js/main.js",
  "./assets/js/i18n.js",
];

// Core assets that must be cached for offline functionality
const coreAssets = [
  "./",
  "./index.html",
  ...versionedAssets,
  ...versionedAssets.map((url) => `${url}?v=${ASSET_VERSION}`),
  "./assets/img/favicon.png",
  "./assets/img/apple-touch-icon.png",
  "./assets/img/logo.png",
  "./assets/img/hero-bg.jpg",
  "./assets/img/my-profile-img.jpg",
  "./assets/img/my-profile-img-2.jpg",
  "./assets/vendor/bootstrap/css/bootstrap.min.css",
  "./assets/vendor/bootstrap-icons/bootstrap-icons.css",
  "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "./assets/vendor/aos/aos.css",
  "./assets/vendor/aos/aos.js",
  "./assets/vendor/glightbox/css/glightbox.min.css",
  "./assets/vendor/glightbox/js/glightbox.min.js",
  "./assets/vendor/swiper/swiper-bundle.min.css",
  "./assets/vendor/swiper/swiper-bundle.min.js",
  "./assets/vendor/typed.js/typed.umd.js",
  "./assets/vendor/purecounter/purecounter_vanilla.js",
  "./assets/vendor/waypoints/noframework.waypoints.js",
  "./assets/vendor/imagesloaded/imagesloaded.pkgd.min.js",
  "./assets/vendor/isotope-layout/isotope.pkgd.min.js",
  "./manifest.json",
];

// Portfolio images - cached on demand with stale-while-revalidate
const portfolioImages = [
  "./assets/img/portfolio/linux-1.png",
  "./assets/img/portfolio/linux-2.png",
  "./assets/img/portfolio/linux-3.png",
  "./assets/img/portfolio/linux-4.png",
  "./assets/img/portfolio/linux-5.png",
  "./assets/img/portfolio/linux-6.png",
  "./assets/img/portfolio/mikrotik-1.png",
  "./assets/img/portfolio/mikrotik-2.png",
  "./assets/img/portfolio/mikrotik-3.png",
  "./assets/img/portfolio/mikrotik-4.png",
  "./assets/img/portfolio/mikrotik-5.png",
  "./assets/img/portfolio/mikrotik-6.png",
  "./assets/img/portfolio/other-1.png",
  "./assets/img/portfolio/other-2.png",
  "./assets/img/portfolio/other-3.png",
  "./assets/img/portfolio/vmware-1.png",
  "./assets/img/portfolio/vmware-2.png",
  "./assets/img/portfolio/vmware-3.png",
  "./assets/img/portfolio/windows-1.png",
  "./assets/img/portfolio/windows-2.png",
  "./assets/img/portfolio/windows-3.png",
  "./assets/img/portfolio/windows-4.png",
  "./assets/img/portfolio/windows-5.png",
  "./assets/img/portfolio/windows-6.png",
];

// Install Event - Cache Core Resources First
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        // Cache core assets first - critical for offline
        return cache.addAll(coreAssets);
      })
      .then(function () {
        // Pre-cache portfolio images in background (non-blocking)
        return caches.open(CACHE_NAME).then(function (cache) {
          return Promise.allSettled(
            portfolioImages.map((url) =>
              fetch(url)
                .then((response) => {
                  if (response.ok) {
                    return cache.put(url, response);
                  }
                })
                .catch(() => {
                  // Silently fail for portfolio images - they'll be cached on demand
                }),
            ),
          );
        });
      })
      .then(function () {
        // Only skip waiting if core assets cached successfully
        console.log("Service Worker installed successfully");
        return self.skipWaiting();
      })
      .catch(function (error) {
        // Core cache installation is mandatory - propagate failure
        console.error("Core cache installation failed:", error);
        throw error;
      }),
  );
});

// Fetch Event - Stale-While-Revalidate for Static Assets, Network-First for Documents
self.addEventListener("fetch", function (event) {
  // Skip non-GET requests (POST contact form submissions must reach the server)
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  const url = new URL(event.request.url);

  // NEVER cache dynamic PHP endpoints (CSRF tokens, contact form, etc.)
  if (url.pathname.startsWith("/forms/") || url.pathname.endsWith(".php")) {
    return;
  }

  const isPortfolioImage = portfolioImages.some((img) =>
    url.pathname.endsWith(img.replace("./", "")),
  );
  const isStaticAsset =
    /\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ico)$/i.test(url.pathname);
  const isHtmlDocument =
    event.request.destination === "document" || url.pathname.endsWith(".html");

  // Strategy 1: Network-First for HTML documents (with offline fallback)
  if (isHtmlDocument) {
    event.respondWith(
      (async function () {
        // Use navigation preload if available for faster response
        if (self.registration.navigationPreload) {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
        }

        // Network-first with cache fallback
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          // Network failed - return cached if available
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Return offline fallback
          return caches.match("./index.html");
        }
      })(),
    );
    return;
  }

  // Strategy 2: Stale-While-Revalidate for static assets and portfolio images
  if (isStaticAsset || isPortfolioImage) {
    event.respondWith(
      (async function () {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        // Fetch from network in background
        const networkFetch = fetch(event.request)
          .then(function (networkResponse) {
            if (networkResponse.ok) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(function () {
            // Network failed - return cached if available
            return cachedResponse;
          });

        // Return cached immediately if available, otherwise wait for network
        return cachedResponse || networkFetch;
      })(),
    );
    return;
  }

  // Strategy 3: Cache-First for everything else
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(function (response) {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(function () {
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      }),
  );
});

// Activate Event - Clean Up Old Caches and Enable Navigation Preload
self.addEventListener("activate", function (event) {
  event.waitUntil(
    (async function () {
      // Clean up old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(function (cacheName) {
          if (
            cacheName !== CACHE_NAME &&
            cacheName !== OFFLINE_FALLBACK_CACHE
          ) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );

      // Enable Navigation Preload (if supported)
      if ("navigationPreload" in self.registration) {
        try {
          await self.registration.navigationPreload.enable();
        } catch (error) {
          console.warn("Navigation preload not supported:", error);
        }
      }

      // Take control of all clients immediately
      await self.clients.claim();
    })(),
  );
});

// Message Event - Handle Messages from Main Thread
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  // Allow clients to request cache cleanup
  if (event.data && event.data.type === "CLEAR_CACHE") {
    caches.delete(CACHE_NAME).then(function () {
      event.ports[0].postMessage({ success: true });
    });
  }
});

// Periodic cache cleanup (optional - runs when SW is active)
self.addEventListener("periodicsync", function (event) {
  if (event.tag === "cache-cleanup") {
    event.waitUntil(cleanupOldCacheEntries());
  }
});

async function cleanupOldCacheEntries() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  const now = Date.now();
  const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days

  for (const request of keys) {
    const response = await cache.match(request);
    const dateHeader = response.headers.get("date");
    if (dateHeader) {
      const cacheDate = new Date(dateHeader).getTime();
      if (now - cacheDate > MAX_AGE) {
        await cache.delete(request);
      }
    }
  }
}
