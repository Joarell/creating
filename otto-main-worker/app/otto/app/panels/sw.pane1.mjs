
const CACHENAME =	'pane1_v1';
const assets =		[
	'/',
	'./pane1.module.mjs',
	'../stylesheet.min.css',
	'./pane1_crates.html',
];


globalThis.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHENAME).then((cache) => {
		caches.delete(CACHENAME);
		return (cache.addAll(assets));
	}));
});


globalThis.addEventListener('activate', (event) => {
	event.waitUntil(async () => {
		globalThis.registration.navigationPreload ?
		await globalThis.registration.navigationPreload.enable() : 0;
	});
});


globalThis.addEventListener('fetch', (event) => {
	event.respondWith(caches.match(event.request).then(cachedResponse => {
			return (cachedResponse ? cachedResponse : fetch(event.request));
		})
	);
});

