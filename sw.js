/* Mon carnet rétablissement – fonctionnement hors ligne.
   À chaque mise à jour du carnet, augmente le numéro de VERSION ci-dessous. */
const VERSION = 'v12';
const CORE = 'carnet-core-' + VERSION;
const FILES = 'carnet-fichiers';
const CORE_FILES = [
  './', 'index.html', 'manifest.webmanifest',
  'icons/apple-touch-icon.png', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png',
  'vendor/pdf.min.js', 'vendor/pdf.worker.min.js', 'vendor/jspdf.umd.min.js',
  'vendor/jspdf.plugin.autotable.min.js', 'vendor/qrcode.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CORE).then(c => c.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('carnet-core-') && k !== CORE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('/index.html');
  if (isPage) {
    // Page : réseau d'abord (pour recevoir les mises à jour), sinon la copie hors ligne
    e.respondWith(
      fetch(req, { cache: 'no-cache' }).then(r => { const copy = r.clone(); caches.open(CORE).then(c => c.put('index.html', copy)); return r; })
        .catch(() => caches.match('index.html', { ignoreSearch: true }))
    );
    return;
  }
  // Autres fichiers : copie locale d'abord ; les PDF sont gardés après la première ouverture
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(FILES).then(c => c.put(req, copy)); }
      return r;
    }))
  );
});
