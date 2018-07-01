if ('serviceWorker' in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register('sw.js').then((registration)=> {
    console.log('Service worker registration succeeded');

    // At this point, you can optionally do something 
    // with registration. See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
  }).catch((error)=> {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}

self.addEventListener('install', (event)=>{
  let myCache = [
    '/-Currency-Converter/',
    '/-Currency-Converter/index.html',
    '/-Currency-Converter/css/main.css',
    '/-Currency-Converter/js/main.js',
    '/-Currency-Converter/js/converter.js',
    '/-Currency-Converter/sw.js',
    'https://free.currencyconverterapi.com/api/v5/currencies'
  ]
  event.waitUntil(
    caches.open('converter-v1').then((cache)=>{
      cache.addAll(myCache);
    })
  );
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
      caches.match(event.request).then((response)=>{
        if (response) return response;
        return fetch(event.request)
    }).catch(()=>{
      new Response('Sorry bro Networks down!!');
    })
  );
})
