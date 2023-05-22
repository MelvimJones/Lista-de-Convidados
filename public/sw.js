const CACHE_NAME = "my-app"
const urlToCache = [
    '/',
    '/src/components/Todo-list.vue',
    '/main'
]

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlToCache)
            })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
    event.respondWidth(
        caches.match(event.request).then(response=>{
            return response || fetch(event.request)
        })
    )
})