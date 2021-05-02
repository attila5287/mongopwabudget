const FILES_TO_CACHE = [
	'/',
	'/index.html',
	'/favicon.ico',
	'/manifest.webmanifest',
	'/index.html',
	'/assets/css/style.css',
	'/dist/bundle.js',
	'/assets/images/icons/icon-32x32.png',
	'/assets/images/icons/icon-48x48.png',
	'/assets/images/icons/icon-64x64.png',
	'/assets/images/icons/icon-72x72.png',
	'/assets/images/icons/icon-96x96.png',
	'/assets/images/icons/icon-128x128.png',
	'/assets/images/icons/icon-256x256.png',
	'/assets/images/icons/icon-512x512.png',
	'/assets/images/dev/avatar.jpg',
	'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap',
	'/css/bootstrap.css',
	'/css/custom.css',
	'/css/dashboard.css',
	'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js',
	'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js',
	'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js',
	'/js/collapse/table_div.js',
	'/js/collapse/chart_div.js',
	'/js/render/chart.js',
	'/js/render/table.js',
	'/js/render/init.js',
	'/js/db/indexedDB.js',
	'/js/forms/new_item.js'
];



const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(PRECACHE)
			.then((cache) => cache.addAll(FILES_TO_CACHE))
			.then(self.skipWaiting())
	);
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
	const currentCaches = [PRECACHE, RUNTIME];
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter(
					(cacheName) => !currentCaches.includes(cacheName)
				);
			})
			.then((cachesToDelete) => {
				return Promise.all(
					cachesToDelete.map((cacheToDelete) => {
						return caches.delete(cacheToDelete);
					})
				);
			})
			.then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then((cache) => {
					return fetch(event.request).then((response) => {
						return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});

