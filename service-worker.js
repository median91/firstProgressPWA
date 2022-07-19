const CACHE_NAME = 'firstpwa-v5';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/maskable_icon.png',
	'/mask_icon.png',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/pages/article.html',
	'/assets/JJ.jpg',
	'/css/styles.css',
	'/assets/1920px-Black_flag.png',
	'/assets/1.png',
	'/assets/2.gif',
	'/assets/3.jpg',
	'/assets/4.jpg',
	'/assets/Interstellar_film_poster.jpg',
	'/assets/star_trek_2009_poster.jpg',
	'/assets/TidalDisruptions_A_1440x810.gif',
	'/assets/getimage.aspx.jpg',
	'/assets/assets.newatlas.com.jpg',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/script.js',
	'/js/sw-register.js',
	'/manifest.json'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}

			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});
