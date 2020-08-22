/* For license and copyright information please see LEGAL file in repository */

const staticCacheName = 'app'

self.addEventListener('install', event => {
    caches.delete(staticCacheName)
    caches.open(staticCacheName).then(cache => cache.add('/main.html'))
    self.skipWaiting()
})

self.addEventListener("activate", event => {
    self.clients.claim()
})

self.addEventListener('fetch', event => {
    // Let the browser do its default thing for non-GET requests.
    if (event.request.method != 'GET') return

    if (event.request.mode === 'navigate') event.respondWith(responseNavigate(event))
})

async function responseNavigate(event) {
    const res = await caches.match('/main.html')
    // If browser cache delete and service worker still get fetch must return 
    if (!res) return fetch('/main.html')
    return res
}
