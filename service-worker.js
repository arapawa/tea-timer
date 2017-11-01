var dataCacheName = 'teaTimerData-v1';
var cacheName = 'teaTimerCache';
var filesToCache = [
  '/',
  '/index.html',
  '/js/app.js',
  '/css/main.css',
  '/assets/icon-add-timer.svg',
  '/assets/icon-colorwheel.svg',
  '/assets/icon-cup-timer.svg',
  '/assets/icon-no-color.svg',
  '/assets/icon-play.svg',
  '/assets/icon-restart.svg',
  '/assets/icon-speaker-off.svg',
  '/assets/icon-speaker-on.svg',
  '/assets/icon-speaker.svg'
];

// install service worker
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

// activate service worker
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        // deletes old cache
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// serve the app shell from the cache if it's the current version
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  // TODO: get proper fetching and caching working
  var dataUrl = 'https://arapawastud.io/tea-timer';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});