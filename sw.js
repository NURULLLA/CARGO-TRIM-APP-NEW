const CACHE_NAME = 'cargo-trim-v2';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './icon.png',
    './lMC.png',
    'https://cdn.tailwindcss.com',
    'https://bernardo-castilho.github.io/DragDropTouch/DragDropTouch.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting();
});

// Clear old caches on activate
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
