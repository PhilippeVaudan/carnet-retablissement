/* Fonctionnement hors ligne : réseau d'abord, sinon la dernière copie. */
const CACHE='grea-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  e.respondWith(fetch(r).then(res=>{ if(res.ok){const c=res.clone(); caches.open(CACHE).then(x=>x.put(r,c));} return res; })
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('./'))));
});
