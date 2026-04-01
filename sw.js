const CACHE_NAME = 'cargo-trim-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn-icons-png.flaticon.com/512/3122/3122410.png',
    'https://cdn.tailwindcss.com',
    'https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
