const CACHE = 'haomen-v11';
const ASSETS = ['apple-touch-icon.png', 'creator-poster.jpg', 'icon-192.png', 'icon-512.png', 'logo.png', 'manifest.webmanifest', 'messi-reverse-fixed.jpg', 'photo-01.jpg', 'photo-02.jpg', 'photo-03.jpg', 'photo-04.jpg', 'photo-05.jpg', 'photo-08.webp', 'photo-09.png', 'photo-10.jpg', 'photo-11.jpg', 'photo-12.jpg', 'photo-13.jpg', 'photo-14.jpg', 'photo-15.jpg', 'photo-16.jpg', 'photo-17.jpg', 'photo-18.jpg', 'photo-19.jpg', 'photo-20.jpg', 'photo-21.jpg', 'photo-22.jpg', 'photo-23.jpg', 'photo-24.jpg', 'stadium-bg.jpg', 'tribute-cr7.webp', 'zu-qiu-kuang-mo.html'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(ASSETS.map((a) => c.add(a).catch(() => {})))).then(() => self.skipWaiting()));
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
