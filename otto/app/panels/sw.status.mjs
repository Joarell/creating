

const CACHENAME =	'status_V1';
const assets =		[
	'./status_panel.html',
	'../index.css',
	'./status.panel.mjs',
];


globalThis.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHENAME).then((cache) => {
		return (cache.addAll(assets));
	}));
});


globalThis.addEventListener('activate', () => {
	console.log('Inside the activate handler!');
});


self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			return (cachedResponse ? cachedResponse : fetch(event.request));
		})
	);
});

