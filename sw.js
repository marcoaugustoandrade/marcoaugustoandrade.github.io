---
---
let urlsToCache = []
let CACHE_NAME = 'marco-andrade-cache-v1'

{% for post in site.posts limit:10 %}
urlsToCache.push("{{ post.url }}")
{% endfor %}
{% for page in site.html_pages %}
urlsToCache.push("{{ page.url }}")
{% endfor %}

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
