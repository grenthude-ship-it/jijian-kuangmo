const CACHE = 'haomen-v56';
const ASSETS = ["zu-qiu-kuang-mo.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "logo.png", "messi-reverse-fixed.jpg", "photo-25.jpg", "photo-26.jpg", "photo-32.jpg", "tribute-cr7.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(u => c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(cc => cc.put(e.request, c)); return r; }).catch(()=>caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(nr => { const c = nr.clone(); caches.open(CACHE).then(cc => cc.put(e.request, c)); return nr; }).catch(()=>r)));
  }
});
