

const CACHENAME =	'pane2_v1';
const assets =		[
	'./pane2.module.mjs',
	'../index.css',
	'./pane2_crates_open.html',
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

