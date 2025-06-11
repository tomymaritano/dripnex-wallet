self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('dripnex-cache').then(cache =>
      cache.addAll(['/', '/manifest.json', '/logodripnex.svg'])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
