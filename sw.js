/* Pauta — service worker: guarda la app en el celular para que abra sin internet. */
const VERSION = "pauta-v1.1.0";
const ASSETS = [
  "./",
  "./index.html",
  "./app.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./maskable-192.png",
  "./maskable-512.png",
  "./apple-touch-icon.png",
  "./favicon-64.png",
  "./barlow-latin-400-normal.woff2",
  "./barlow-latin-500-normal.woff2",
  "./barlow-latin-600-normal.woff2",
  "./barlow-latin-700-normal.woff2",
  "./barlow-semi-condensed-latin-600-normal.woff2",
  "./barlow-semi-condensed-latin-700-normal.woff2",
  "./barlow-semi-condensed-latin-800-normal.woff2"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // la API de Anthropic y otros sitios pasan directo

  if (req.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then((cached) =>
        cached || fetch(req).catch(() => caches.match("./"))
      )
    );
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) =>
      cached || fetch(req).then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
    )
  );
});
