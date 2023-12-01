
const CACHENAME =	'pane1_v1';
const assets =		[
	'/',
	'./pane1.module.mjs',
	'../index.css',
	'./pane1_crates.html',
];


globalThis.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHENAME).then((cache) => {
		return (cache.addAll(assets));
	}));
});


globalThis.addEventListener('activate', (event) => {
	// console.log('Inside the activate handler!');
	event.waitUntil(globalThis.registration?.navigationPreload.enable());
});


globalThis.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request).then(cachedResponse => {
			return (cachedResponse ? cachedResponse : fetch(event.request));
		})
	);
});

