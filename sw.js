const CACHE = 'haomen-v2';
const ASSETS = ["apple-touch-icon.png", "creator-poster.jpg", "icon-192.png", "icon-512.png", "logo.png", "manifest.webmanifest", "stadium-bg.jpg", "zu-qiu-kuang-mo.html"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('.html')) {
    e.respondWith(fetch(e.request).then((r) => {
      const c = r.clone();
      caches.open(CACHE).then((x) => x.put(e.request, c));
      return r;
    }).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).then((n) => {
      const c = n.clone();
      caches.open(CACHE).then((x) => x.put(e.request, c));
      return n;
    })));
  }
});
