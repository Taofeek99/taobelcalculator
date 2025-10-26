self.addEventListener('install', e => {
  e.waitUntil(caches.open('taobel-v2').then(cache => {
    return cache.addAll(['./', './index.html', './manifest.json']);
  }));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
