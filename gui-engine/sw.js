/* For license and copyright information please see LEGAL file in repository */

const staticCacheName = 'application'

self.addEventListener('install', event =>
    event.waitUntil(
        // Add home page to cache, So app work offline from app icon in devices!
        caches.open(staticCacheName)
            .then(cache => cache.addAll(['/main.html', '/main.js']))
    )
)

self.addEventListener('fetch', event => {
    // Let the browser do its default thing for non-GET requests.
    if (event.request.method != 'GET') return

    event.respondWith(responseByCacheFirst(event))
})

async function responseByCacheFirst(event) {
    // Try to get the response from a cache.
    const cache = await caches.open(staticCacheName)

    let res

    if (event.request.mode === 'navigate') {
        res = await cache.match('/main.html')
        // If browser cache delete and service worker still get fetch must return 
        if (!res) return fetch(event.request)
        return res
    }

    res = await cache.match(event.request)
    if (res) {
        // If we found a match in the cache, return it, but also
        // update the entry in the cache in the background.
        cache.add(event.request)
        return res
    }

    try {
        // No cache entry found!
        res = await fetch(event.request)

        switch (res.status) {
            case 200:
                cache.put(event.request, res.clone())
                return res
            default: // 400, 404, 500
                return res
        }
    } catch (err) {
        // Handle no network error situation
    }
}
