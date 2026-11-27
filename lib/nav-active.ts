/**
 * Marks the current page in the server-rendered header. This tiny script runs inline, right after the header's HTML, so the
 * active item (blue text and underline) and the page-aware "Request a Quote" links are right from the first paint, without
 * waiting for any JavaScript framework. HeaderBehavior calls `window.__markNav` again after a client-side navigation.
 *
 * Each `[data-nav-item]` carries the paths that make it active in `data-match` (its own path and its children's); each
 * `[data-quote-link]` is the plain quote link, which gets ?service= or ?project= on a service or project page.
 */
export const markNavScript = `(function(){
function m(p){
p=p.replace(/\\/+$/,"")||"/";
var a=document.querySelectorAll("[data-nav-item]"),i,j;
for(i=0;i<a.length;i++){
var li=a[i],h=(li.getAttribute("data-match")||"").split(" "),on=false;
for(j=0;j<h.length;j++){var x=h[j];if(x&&(x==="/"?p==="/":p===x||p.indexOf(x+"/")===0))on=true}
if(on)li.setAttribute("data-active","true");else li.removeAttribute("data-active");
var l=li.querySelector("[data-nav-link]");
if(l){if(on)l.setAttribute("aria-current","page");else l.removeAttribute("aria-current")}
}
var s=p.match(/^\\/services\\/([^/]+)$/),r=p.match(/^\\/projects\\/([^/]+)$/),
q="/request-a-quote"+(s?"?service="+s[1]:r?"?project="+r[1]:""),
k=document.querySelectorAll("[data-quote-link]");
for(i=0;i<k.length;i++)k[i].setAttribute("href",q)
}
window.__markNav=m;m(location.pathname)
})();`;

declare global {
  interface Window {
    __markNav?: (pathname: string) => void;
  }
}
