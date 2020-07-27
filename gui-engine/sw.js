/* For license and copyright information please see LEGAL file in repository */

const staticCacheName = 'application'

self.addEventListener('install', event =>
    event.waitUntil(
        // Add home page to cache, So app work offline from app icon in devices!
        caches.open(staticCacheName).then(cache => cache.addAll(['/main.html','/main.js']))
    )
)

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate') event.respondWith(caches.match('/main.html'))

    event.respondWith(fetch(event.request)
        .then(liveResponse => {
            // Just cache app files in / folder!
            if (liveResponse.url.indexOf('/') > -1) {
                caches.open(staticCacheName).then(cache => cache.put(event.request, liveResponse))
            }
            return liveResponse.clone()
        }).catch(() => caches.match(event.request).then(cachedResponse => cachedResponse))
    )
})