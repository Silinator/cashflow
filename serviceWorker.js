/*
  Documentation:
  https://developers.google.com/web/fundamentals/primers/service-workers
  https://www.youtube.com/watch?v=7jsg1Mb7PB4
  https://www.youtube.com/watch?v=VEjRhRArVR4 ( make sure it's in the root directory 3:24 )
*/

const cacheName = "app-cashflow-cache-v1";
const filesToCache = [
  /* css */
  'css/material-font.css',
  'css/roboto-font.css',
  'css/style.css',
  /* fonts */
  'font/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  /* javascript */
  'js/app.js',
  'js/vue.js',
  'js/components/expenses.js',
  'js/components/financial-assets.js',
  'js/components/income.js',
  'js/components/main-header.js',
  'js/components/obligations.js',
  /* html */
  '/cashflow/',
  'index.html',
  /* manifest */
  'manifest.json',
  /* images */
  'img/logo.jpg',
  'img/icons/favicon.ico',
  'img/icons/favicon.gif',
  'img/icons/favicon.png',
  'img/icons/apple-touch-icon.png',
  'img/icons/apple-touch-icon-57x57.png',
  'img/icons/apple-touch-icon-60x60.png',
  'img/icons/apple-touch-icon-72x72.png',
  'img/icons/apple-touch-icon-76x76.png',
  'img/icons/apple-touch-icon-114x114.png',
  'img/icons/apple-touch-icon-120x120.png',
  'img/icons/apple-touch-icon-128x128.png',
  'img/icons/apple-touch-icon-144x144.png',
  'img/icons/apple-touch-icon-152x152.png',
  'img/icons/apple-touch-icon-180x180.png',
  'img/icons/apple-touch-icon-precomposed.png',
  'img/icons/favicon-16x16.png',
  'img/icons/favicon-32x32.png',
  'img/icons/favicon-96x96.png',
  'img/icons/favicon-160x160.png',
  'img/icons/favicon-192x192.png',
  'img/icons/favicon-196x196.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then( function(cache) {
      return cache.addAll(filesToCache);
    }).then( function(cache) {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all( keyList.map(key => {
        if( key !== cacheName ) {
          return caches.delete(key);
        }
      }));
    }));
  return self.clients.claim();
});

self.addEventListener( 'fetch', function(event) {
  console.log( 'fetch' );

  event.respondWith(
    caches.match(event.request).then( function(response) {
      return response || fetch(event.request);
    })
  );
});
