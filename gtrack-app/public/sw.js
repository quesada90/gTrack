const CACHE_NAME = 'gtrack-v2';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/videos/leg-press.gif',
  '/videos/chest-press.gif',
  '/videos/shoulder-press.gif',
  '/videos/pec-deck.gif',
  '/videos/triceps-pushdown.gif',
  '/videos/plank.gif',
  '/videos/dead-bug.gif',
  '/videos/pull-down.gif',
  '/videos/low-row.gif',
  '/videos/assisted-pull-up.gif',
  '/videos/bicep-curl.gif',
  '/videos/face-pull.gif',
  '/videos/dead-hang.gif',
  '/videos/side-plank.gif',
  '/videos/leg-extension.gif',
  '/videos/leg-curl.gif',
  '/videos/hip-abduction.gif',
  '/videos/hip-thrust.gif',
  '/videos/calf-raise.gif',
  '/videos/hollow-body.gif',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache core assets; skip GIFs that don't exist yet — fail gracefully
        return Promise.allSettled(
          PRECACHE_ASSETS.map(url => cache.add(url).catch(() => {}))
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
