self.addEventListener("install", event => {
    // Avvia subito il service worker
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    // Prendi controllo immediato della pagina
    event.waitUntil(self.clients.claim());
});

// Cache base per rendere la pagina disponibile offline
const CACHE_NAME = "gps-cache-v1";
const ASSETS = [
    "/", 
    "/index.html",
    "/manifest.json"
];

// Installa e salva i file base
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

// Recupero risorse in cache quando offline
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Se il file è in cache → restituiscilo
            if (response) return response;
            // Altrimenti scarica normalmente
            return fetch(event.request);
        })
    );
});
