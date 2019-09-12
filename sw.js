---
---
let cache_name = 'marco-andrade-cache-v1'

let urls = [
  // '/',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/dark.css',
  '/assets/js/clipboard.min.js',
  '/assets/js/scripts-min.js',
  '/assets/images/marco.jpg',
  '/assets/images/cc_medium.png',
  '/assets/images/favicon/favicon-16x16.png',
  '/assets/images/favicon/favicon-32x32.png',
  '/assets/images/menu/academic.svg',
  '/assets/images/menu/github.svg',
  '/assets/images/menu/home.svg',
  '/assets/images/menu/notification.svg',
  '/assets/images/menu/rss.svg',
  '/assets/images/menu/search.svg',
  '/assets/images/menu/theme.svg',
  '/assets/images/menu/topo.svg',
  'https://fonts.googleapis.com/css?family=Open+Sans|Roboto&display=swap',
  '/assets/images/favicon/android-chrome-192x192.png',
  '/assets/images/favicon/android-chrome-512x512.png',
{% for post in site.posts limit:10 %}
  '{{ post.url }}',
{% endfor %}
{% for page in site.html_pages %}
  '{{ page.url }}',
{% endfor %}
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cache_name)
      .then(cache => cache.addAll(urls))
  )
})

self.addEventListener('fetch', event => {
  // Let the browser do its default thing
  // for non-GET requests.
  if (event.request.method != 'GET') return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cache = await caches.open(cache_name);
    const cachedResponse = await cache.match(event.request);

    if (cachedResponse) {
      // If we found a match in the cache, return it, but also
      // update the entry in the cache in the background.
      event.waitUntil(cache.add(event.request));
      return cachedResponse;
    }

    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});

// self.addEventListener('fetch', event => {
//   let response
//   event.respondWith(caches.match(event.request))
//     // .then(r => {
//     //   response = r
//     //   if (!response) throw "Não tem no cache"
//     //   caches.open(cache_name)
//     //     .then(cache => cache.put(event.request, response))
//     //   return response.clone()
//     // })
//     // .catch(() => fetch(event.request)).then(res => res.clone().catch(() => caches.match('/')))
// })

// self.addEventListener('activate', event => {
//   // event.waitUntil(caches.delete(cache_name-v1)) => quando instalar a versão 2 por exemplo
// })
