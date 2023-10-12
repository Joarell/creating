

const cacheName =	'craterCache_v1';

globalThis.addEventListener('install', (event) => {
	console.log('Inside the install handler:', event);
});


globalThis.addEventListener('activate', (event) => {
	console.log('Inside the activate handler:', event);
});


globalThis.addEventListener(fetch, (event) => {
	console.log('Inside the fetch handler:', event);
});


self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		}),
	);
});


// self.addEventListener('fetch', (event) => {
// 	event.respondWith(fetch(event.request).catch(() => {
// 			return caches.match(event.request);
// 		}),
// 	);
// });
//
