

const CACHENAME =	'craterCache_v1';
const assets =		[
	'/',
	'/app/',
	'./main.min.mjs',
	'./manifest.json',
	'./index.html',
	'./stylesheet.min.css',
	'./images/favicon.ico',
	'./images/notification.png',
	'./images/favicon-16x16.png',
	'./images/favicon-32x32.png',
	'./images/apple-touch-icon.png',
	'./images/android-chrome-192x192.png',
	'./images/maskable_icon_x48.png',
	'./images/maskable_icon_x64.png',
	'./images/maskable_icon_x72.png',
	'./images/maskable_icon_x96.png',
	'./images/maskable_icon_x128.png',
	'./images/maskable_icon_x192.png',
	'./images/maskable_icon_x256.png',
	'./images/maskable_icon_x384.png',
	'./images/maskable_icon_x512.png',
	'./images/maskable_icon_x1024.png',
	'./images/maskable_icon.png',
];


globalThis.addEventListener('install', event => {
	event.waitUntil(caches.open(CACHENAME).then(async (cache) => {
		return (cache.addAll(assets));
	}));
});


globalThis.addEventListener('activate', event => {
	event.waitUntil(async () => {
		globalThis.registration.navigationPreload ?
		await globalThis.registration.navigationPreload.enable() : 0;
	});
});


// // NOTE:Cache strategy: Network falling back to cache;
// globalThis.addEventListener('fetch', event => {
// 	event.respondWith(fetch(event.request).catch(() => {
// 		return (cache.match(event.request));
// 	}))
// });


// NOTE:Cache strategy: Stale-while-revalidate;
globalThis.addEventListener('fetch', event => {
	event.respondWith(caches.open(CACHENAME).then((cache) => {
		return(cache.match(event.request).then((response) => {
			const fetchPromise = fetch(event.request).then(networkResponse => {
				cache.put(event.request, networkResponse.clone());
				return(networkResponse);
			});
			return (response || fetchPromise);
		}))
	}))
});
