const CACHE_NAME = 'pyquest-cache-v1';
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(['/'])));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
self.addEventListener('push', (event) => {
    self.registration.showNotification('Python Quest', { body: 'Time to keep your streak!' });
});
