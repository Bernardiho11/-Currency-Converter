if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('sw.js').then((registration)=> {
    console.log('Service worker registration succeeded');

    // At this point, you can optionally do something
  }).catch((error)=> {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

self.addEventListener('install', (event)=>{
  let cacheName = 'currency-converter-v1';
  let myCache = [
    '/-Currency-Converter/',
    '/-Currency-Converter/index.html',
    '/-Currency-Converter/css/main.css',
    '/-Currency-Converter/js/main.js',
    'https://free.currencyconverterapi.com/api/v5/currencies'
  ];
  event.waitUntil(
    caches.open(cacheName).then((cache)=>{
      return cache.addAll(myCache);
    })
  );
});

self.addEventListener('fetch', (event)=> {
  event.respondWith(
      caches.match(event.request).then((response)=>{
        if (response) return response;
        return fetch(event.request);
    }).catch(()=>{
      new Response('Sorry bro Networks down!!');
    })
  );
});
