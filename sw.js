/*
  Service worker: makes the tool work offline after the first visit.
  It only stores the tool's own files (pages, scripts, wording). It never sees or stores
  what a patient types, and it never contacts any other site.
  Change CACHE when you publish a new version so old files are cleared.
*/
var CACHE = 'hth-0.3.0';
var CORE = [
  './', 'index.html', 'css/styles.css',
  'js/core.js', 'js/pdf.js', 'js/export.js', 'js/app.js',
  'content/languages.js',
  'content/en/ui.js', 'content/en/pathways.js', 'content/en/passport.js', 'content/en/checkin.js', 'content/en/sources.js',
  'content/en/ready.js', 'content/en/learning.js', 'content/en/money.js', 'content/en/living.js', 'content/en/team.js', 'content/en/transfer.js',
  'content/en/wellbeing.js', 'content/en/pro.js', 'assets/qr.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

/* Same-origin GET only. Network first so updates show up; cached copy when offline.
   Other languages are cached the first time they are loaded. */
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
    })
  );
});
