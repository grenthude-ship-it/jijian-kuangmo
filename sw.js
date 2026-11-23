const CACHE = 'haomen-v40';
const ASSETS = ["zu-qiu-kuang-mo.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "logo.png", "messi-reverse-fixed.jpg", "photo-08.webp", "photo-10.jpg", "photo-11.jpg", "photo-12.jpg", "photo-13.jpg", "photo-14.jpg", "photo-15.jpg", "photo-16.jpg", "photo-17.jpg", "photo-18.jpg", "photo-19.jpg", "photo-20.jpg", "photo-21.jpg", "photo-22.jpg", "photo-23.jpg", "photo-24.jpg", "photo-25.jpg", "photo-26.jpg", "photo-27.jpg", "photo-28.jpg", "photo-29.jpg", "photo-30.jpg", "photo-32.jpg", "photo-33.jpg", "photo-34.jpg", "photo-35.jpg", "photo-36.jpg", "photo-37.jpg", "photo-38.jpg", "photo-39.jpg", "photo-40.jpg", "photo-41.jpg", "photo-42.jpg", "photo-43.jpg", "photo-44.jpg", "photo-45.jpg", "photo-46.jpg", "photo-47.jpg", "photo-48.jpg", "photo-49.jpg", "photo-50.jpg", "photo-51.jpg", "photo-52.jpg", "photo-53.jpg", "photo-54.jpg", "photo-55.jpg", "photo-56.jpg", "photo-57.jpg", "photo-58.jpg", "photo-59.jpg", "photo-60.jpg", "photo-61.jpg", "photo-62.jpg", "photo-63.jpg", "photo-64.jpg", "photo-65.jpg", "photo-66.jpg", "photo-70.jpg", "photo-71.jpg", "photo-72.jpg", "photo-73.webp", "photo-74.webp", "photo-75.webp", "photo-76.webp", "tribute-cr7.webp"];
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
