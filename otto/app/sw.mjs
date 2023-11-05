

const CACHENAME =	'craterCache_v1';
const assets =		[
	'/currency',
	'/app/',
	'./manifest.json',
	'./main.min.mjs',
	'./main.mjs',
	'./index.html',
	'./index.css',
	'./bundle.mjs',
	'./index-01.css',
	'./responsive_sheet.css',
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


globalThis.addEventListener('install', (event) => {
	console.log('Inside the install handler:', event);
	event.waitUntil(caches.open(CACHENAME).then((cache) => {
		return (cache.addAll(assets));
	}));
});


globalThis.addEventListener('activate', (event) => {
	console.log('Inside the activate handler!');
	event.waitUntil(globalThis.registration?.navigationPreload.enable());
});


self.addEventListener('fetch', (event) => {
	console.log('Fetching DATA', event.request.url);
	event.respondWith(caches.match(event.request).then(cachedResponse => {
			return (cachedResponse ? cachedResponse : fetch(event.request));
		})
	);
});
