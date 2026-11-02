const V="tnct-v3",F=["./","./index.html","./manifest.webmanifest","./icons/192.png","./icons/512.png","./icons/192-maskable.png","./icons/512-maskable.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!="GET")return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(c=>{const n=fetch(e.request).then(r=>{if(r&&r.ok)caches.open(V).then(x=>x.put(e.request,r.clone()));return r}).catch(()=>c||caches.match("./index.html"));return c||n}))});
