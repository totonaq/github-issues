"use strict";var precacheConfig=[["/github-issues/index.html","8511e29504b21cd0c348477a2c38403d"],["/github-issues/static/css/main.67847385.css","77d00f4b0a32bb6fa20deb977e589624"],["/github-issues/static/js/main.b493f8ee.js","5c1246f45ca536dc44e7ded1c419a067"],["/github-issues/static/media/exclamation-white.8fe5d706.svg","8fe5d7068cbc59e2dac03ed3e63dcd1e"],["/github-issues/static/media/exclamation.9831b307.svg","9831b30730c5ab34acb55ebdb0ce574b"],["/github-issues/static/media/loading.bf45aef3.gif","bf45aef3bb294091342979befbfc1742"],["/github-issues/static/media/not_found.fc04aad2.png","fc04aad205030206af3b9f3bd57f946b"],["/github-issues/static/media/organization.51f66de3.svg","51f66de307769d9f259b6ce21b3b6a05"],["/github-issues/static/media/placeholder.a585f805.svg","a585f80504649a224fa87b77abd1d0b6"],["/github-issues/static/media/search.be2b973f.svg","be2b973fa6112e56373d409455ce5671"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,s){var a=new URL(e);return s&&a.pathname.match(s)||(a.search+=(a.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),a.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],s=new URL(t,self.location),a=createCacheKey(s,hashParamName,n,/\.\w{8}\./);return[s.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(s){return setOfCachedUrls(s).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return s.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),s="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,s),e=urlsToCacheKeys.has(n));var a="/github-issues/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(a,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});