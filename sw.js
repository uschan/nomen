// Basic Service Worker to enable "Add to Home Screen"
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through strategy for development safety. 
  // This ensures users always get the latest code without cache issues,
  // while still satisfying the PWA requirement of having a fetch handler.
  event.respondWith(fetch(event.request));
});