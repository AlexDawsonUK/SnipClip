// Pre-fetch on Install
var cacheName = "snipclip-cache";
self.addEventListener("install", function(evt) {
	evt.waitUntil(precache());
});
function precache() {
	return caches.open(cacheName).then(function (cache) {
		// list all your assets in the array
		return cache.addAll([
			"/index.html",
			"/error.html",
			"/humans.txt",
		//	"/robots.txt",
			"/.well-known/security.txt",
			"/change.log",
			"/site.webmanifest",
			"/browserconfig.xml",
		//	"/sitemap.xml",
			"/cache/style.css",
			"/cache/script.js",
			"/cache/fonts/Martel-Bold.woff",
			"/cache/fonts/Martel-Bold.woff2",
			"/cache/fonts/Martel-Regular.woff",
			"/cache/fonts/Martel-Regular.woff2",
			"/apple-touch-icon.png",
			"/images/about.png",
			"/images/activate.png",
			"/images/advanced.png",
			"/images/banner.png",
			"/images/icon.svg",
			"/images/droidx192.png",
			"/images/dropzone.avif",
			"/images/dropzone.png",
			"/images/email.png",
			"/images/folder.png",
			"/images/folderwiz.png",
			"/images/general.png",
			"/images/droidx512.png",
			"/images/ms-tile.png",
			"/images/snippet.png",
			"/images/snippetwiz.png",
			"/images/systray.avif",
			"/images/systray.png",
			"/favicon.ico",
			"/sw.js",
		]);
	});
}
// Return from cache, Background refresh
self.addEventListener("fetch", function(evt) {
	evt.respondWith(fromCache(evt.request));
	evt.waitUntil(update(evt.request));
});
function fromCache(request) {
	return caches.open(cacheName).then(function (cache) {
		return cache.match(request).then(function (matching) {
			return matching || Promise.reject("no-match");
		});
	});
}
function update(request) {
	return caches.open(cacheName).then(function (cache) {
		return fetch(request).then(function (response) {
			return cache.put(request, response);
		});
	});
}