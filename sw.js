/**
 * ===============================================
 * MEET AJ PORTFOLIO - SERVICE WORKER
 * ===============================================
 *
 * Progressive Web App (PWA) service worker
 * Handles offline functionality and caching strategies
 *
 * Features:
 * - Offline-first caching
 * - Automatic cache updates
 * - Background sync
 * - Push notifications support
 * - Performance optimization
 *
 * Version: 1.0.4
 * Author: AmirHossein Jalalian
 * ===============================================
 */

// Cache configuration
const ASSET_VERSION = "999";
const CACHE_NAME = `meet-aj-v1.0.5-${ASSET_VERSION}`;
const versionedAssets = [
  "./assets/css/main.css",
  "./assets/css/rtl.css",
  "./assets/css/lang-toggle.css",
  "./assets/js/main.js",
  "./assets/js/i18n.js",
];
const urlsToCache = [
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

// Install Event - Cache Resources
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        // Cache opened successfully - add all resources
        return cache.addAll(urlsToCache);
      })
      .catch(function (error) {
        // Cache failed silently - app will still work
        console.warn("Cache installation failed:", error);
      })
  );
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Fetch Event - Serve from Cache When Offline
self.addEventListener("fetch", function (event) {
  // Skip non-GET requests (POST, PUT, DELETE, etc.)
  if (event.request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests (external APIs, CDNs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }

        return fetch(event.request).then(function (response) {
          // Check if we received a valid response
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clone the response
          var responseToCache = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(function () {
        // Return offline page if both cache and network fail
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      })
  );
});

// Activate Event - Clean Up Old Caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            // Delete old cache versions
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Message Event - Handle Messages from Main Thread
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SKIP_WAITING") {
    // Skip waiting for new service worker to activate
    self.skipWaiting();
  }
});
