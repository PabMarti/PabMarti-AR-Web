const CACHE_NAME = 'ar-web-v1.0.0';
const urlsToCache = [
  './',
  './index.html',
  './css/styles.css',
  './js/script.js',
  './manifest.json',
  './assets/images/ar_icon.png',
  './assets/images/ar_hand_prompt.png',
  './assets/images/favicon.ico',
  './assets/models/genshin_impact_-_furina.glb',
  './assets/models/RobotExpressive.glb',
  'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Error durante la instalación:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activando...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptación de peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la respuesta está en cache, la devolvemos
        if (response) {
          return response;
        }

        // Si no está en cache, hacemos la petición a la red
        return fetch(event.request)
          .then(response => {
            // Verificamos que la respuesta sea válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clonamos la respuesta para poder usarla en cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Solo cacheamos peticiones GET
                if (event.request.method === 'GET') {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch(() => {
            // Si falla la petición a la red, intentamos devolver una página offline
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// Manejo de mensajes
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Manejo de errores
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

// Manejo de rechazos de promesas no manejados
self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled rejection:', event.reason);
});
