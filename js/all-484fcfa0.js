/**
 * aload - v1.2.1
 *
 * Copyright (c) 2015, @pazguille <guille87paz@gmail.com>
 * Released under the MIT license.
 */
function aload(t){"use strict";t=t||window.document.querySelectorAll("[data-aload]"),void 0===t.length&&(t=[t]);var e,n=0,i=t.length;for(n;i>n;n+=1)e=t[n],e["LINK"!==e.tagName?"src":"href"]=e.getAttribute("data-aload"),e.removeAttribute("data-aload");return t}function debounce(t,e){var n=null;return function(){var i=this,o=arguments;clearTimeout(n),n=setTimeout(function(){t.apply(i,o)},e)}}function syncscroll(t,e){var n,i,o,r=t,a=e,s=function(){this.getAttribute("id")==a&&(n=r,i=a,r=a,a=n),$("#"+a).unbind("scroll");var t=this.scrollTop/(this.scrollHeight-this.offsetHeight),e=t*($("#"+a)[0].scrollHeight-$("#"+a)[0].offsetHeight);document.getElementById(a).scrollTop=e,"undefined"!=typeof o&&clearTimeout(o),o=setTimeout(function(){$("#"+a).on("scroll",s)},200)};$("#"+r+", #"+a).on("scroll",s)}function addListener(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent&&t.attachEvent("on"+e,n)}function addListenerMulti(t,e,n){for(var i=e.split(" "),o=0,r=i.length;r>o;o++)addListener(t,i[o],n)}!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var i=(new Date).getTime(),o=Math.max(0,16-(i-t)),r=window.setTimeout(function(){e(i+o)},o);return t=i+o,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}();var RimgOptions={breakpoint:"-s 300w 1x, -l 800w 1x, -xl 1400w 1x"};!function(){console||(console={log:function(){},error:function(){}}),Object.create||(Object.create=function(){function t(){}return function(e){if(1!=arguments.length)throw new Error("Object.create implementation only accepts one parameter.");return t.prototype=e,new t}}()),Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,o.prototype=new i,o});var t=function(){function t(t){var e=this.pixelRatio.length;if(0===e)return h.status="error",console.error("Rimg: missing a pixelRatio definition, check the documentation."),"";if(1===e)return this.src[0];if(2===e)return 1>=t?this.src[0]:this.src[1];for(var n=0,i=this.pixelRatio.length;i>n;){if(t===this.pixelRatio[n]||Math.round(t)===this.pixelRatio[n])return this.src[n];n++}return this.src[e-1]}function e(e){if("string"==typeof e){var n=e.split(",");if(0===n.length)return h.status="error",console.error("Rimg: your breakpoint-definition "+e+" is invalid, check the documentation."),null;for(var i=[],o=0,r=n.length;r>o;){for(var a=n[o],s={src:[],width:-1,pixelRatio:[],getSrc:t},u=a.split(" "),c=0,l=u.length;l>c;){var d=u[c];""===d.replace(" ","")||(null!==d.match(/^[0-9]{0,4}w/gi)?s.width=Number(d.substr(0,d.length-1)):null!==d.match(/[0-9]{1}x$/gi)?s.pixelRatio.push(Number(d.substr(0,d.length-1))):s.src.push(d)),c++}for(var f=0,p=i.length,m=!1;p>f;){var g=i[f];if(g.width===s.width&&-1!==g.width){g.pixelRatio.push(s.pixelRatio[0]),g.src.push(s.src[0]),m=!0;break}f++}m||i.push(s),o++}return i.length>0?i:(h.status="error",console.error("Rimg: your breakpoint-definition misses valid breakpoints, check the documentation."),null)}return h.status="error",console.error("Rimg: your breakpoint-definition is not a String, check the documentation."),null}function n(t,e,n){var i,o="";o="img"===e?"data-src":"data-background-image",i=n.getAttribute(o),null===i?t.ignore=!0:(void 0!==t.path&&t.path!==i||void 0===t.path)&&(t.path=i,t.background="data-background-image"===o?!0:!1,t.extension=u(i)),"gif"===t.extension||"svg"===t.extension?t.ignore=!0:void 0===t.ignore&&(t.ignore=!1)}function i(t){for(var e=0,n=h.images.length,i=!1;n>e;){if(h.images[e].target===t){i=!0;break}e++}return i?h.images[e]:null}function o(t){for(var e,o,a,s=document.querySelectorAll("img"),u=0,c=s.length;c>u;)e=s[u],a=i(e),null===a?(o={target:e,enabled:!h.disableIntrospection},n(o,"img",e),h.images.push(o),a=o):n(a,"img",e),t&&a.target===t&&h.disableIntrospection&&(a.enabled=!0),u++;for(s=document.querySelectorAll("[data-background-image]"),u=0,c=s.length;c>u;)e=s[u],a=i(e),null===a?(o={target:e,enabled:!h.disableIntrospection},n(o,"background",e),h.images.push(o),a=o):n(a,"background",e),t&&a.target===t&&h.disableIntrospection&&(a.enabled=!0),u++;r()}function r(){for(var t,e=0,n=h.images.length,i=window.devicePixelRatio||1;n>e;){var o=h.images[e];if(!o.ignore&&o.enabled){if(t=!0,!h.disableLazyLoading){var r=o.target.getBoundingClientRect();t=!(r.top+r.height<-h.offset.y||r.top>-h.offset.y+h.resizeDimensions.height+h.offset.y||r.left+r.width<-h.offset.x||r.left>-h.offset.x+h.resizeDimensions.width+h.offset.x)}var u;if(u=o.target.getAttribute(o.background?"data-background-image":"data-src"),null!==u&&""!==u&&t){var c,l=u.substr(0,u.lastIndexOf(".")),d=o.extension,f={x:o.target.width};(0===o.target.width||void 0===o.target.width)&&(c=o.background?"width":"maxWidth",f.x=window.getComputedStyle(o.target,null)[c],f.x=f.x.replace("px",""),f.x=Number(f.x));for(var p=0,m=h.breakpoints.length,g=void 0;m>p;){var v=h.breakpoints[p],w=f.x;if(w>v.width)g=v;else{if(w==v.width){g=v;break}if(w<v.width)break}p++}void 0===g&&(g=h.breakpoints[0]);var y=!1,b=l+g.getSrc(i)+"."+d;o.background||o.target.getAttribute("src")===b?o.background&&-1===o.target.style.backgroundImage.indexOf(b)&&(o.target.style.backgroundImage="url("+b+")",y=!0):(o.target.setAttribute("src",b),y=!0),y&&(h.imageEvents.changed++,s("add","load",a,o.target),s("add","error",a,o.target))}}else if(o.ignore&&("svg"===o.extension||"gif"===o.extension))if(o.background){var E=o.target.getAttribute("style");if(E){var k=E.indexOf("background-image");if(-1===E.indexOf(o.path)){if(E&&-1===k)E="background-image: url("+o.path+");"+E;else if(E&&-1!==k){var L=E.substr(k),x=L.indexOf(";");void 0===x&&(x=L.length),E=E.substr(0,k)+"background-image: url("+o.path+");"+E.substr(x+1)}o.target.setAttribute("style",E)}}else E="background-image: url("+o.path+");",o.target.setAttribute("style",E)}else o.target.getAttribute("src")!==o.path&&o.target.setAttribute("src",o.path);e++}}function a(t){h.imageEvents.changed--,"error"===t.type&&h.imageEvents.errors++,0===h.imageEvents.changed&&h.imagesLoaded&&h.imagesLoaded(h.imageEvents.errors>0?!0:!1),t.path&&t.path.length>0&&(s("remove","load",a,t.path[0]),s("remove","error",a,t.path[0]))}function s(t,e,n,i){void 0===i&&(i=document),"resize"===e&&(i=window),h.isIE8?("DOMContentLoaded"===e&&(e="onreadystatechange"),"resize"===e&&(e="onresize"),"add"===t?i.attachEvent(e,n):i.detachEvent(e,n)):"add"===t?i.addEventListener(e,n,!1):i.removeEventListener(e,n,!1)}function u(t){return t?t.substr(t.lastIndexOf(".")+1).toLowerCase():null}function c(){var t,e;h.isIE8?(t=document.body.clientWidth,e=document.body.clientHeight):(t=window.innerWidth,e=window.innerHeight);var n=!1;return(h.resizeDimensions.width!==t||h.resizeDimensions.height!==e)&&(h.resizeDimensions.width=t,h.resizeDimensions.height=e,n=!0),n}function l(){clearTimeout(h.resizeInfo.wait),c()&&r(),h.resizeInfo.time=(new Date).getTime()}function d(t){this.execute(t.target)}var h={status:"init",observer:null,breakpoints:[],images:[],imageEvents:{changed:0,errors:0},imagesLoaded:null,offset:{x:100,y:100},resizeInfo:{wait:null,time:null},resizeDimensions:{width:0,height:0},disableIntrospection:!1,disableLazyLoading:!1,isIE8:!1};if(void 0===window.addEventListener&&(h.isIE8=!0),"undefined"!=typeof window.RimgOptions){var f=e(window.RimgOptions.breakpoint);null!==f&&(h.breakpoints=f),window.RimgOptions.disableIntrospection===!0&&(h.disableIntrospection=!0),window.RimgOptions.disableLazyLoading===!0&&(h.disableLazyLoading=!0),null!=window.RimgOptions.offset&&"number"==typeof window.RimgOptions.offset.x&&"number"==typeof window.RimgOptions.offset.y&&(h.offset.x=window.RimgOptions.offset.x,h.offset.y=window.RimgOptions.offset.y),null!==window.RimgOptions.complete&&"function"==typeof window.RimgOptions.complete&&(h.imagesLoaded=window.RimgOptions.complete),window.RimgOptions=void 0}else console.error("(remark) Rimg: no breakpoints defined (yet), check the documentation or manually adjust it.");return{version:"2.0.2",execute:function(t){return"error"===h.status?void console.error("Rimg.execute(): error-status so no actions can be executed, check your code."):void 0===t?void console.error("Rimg.execute(): undefined value, check your code to add a valid DOM element to this function."):0===h.breakpoints.length?void console.log("(remark) Rimg.execute(): no breakpoints defined (yet), probably because of manual control."):void o(t)},configure:function(t){if(!(t instanceof Object))return void console.error("Rimg: your definition is not an object, check the documentation.");if(t.breakpoint){var n=e(t.breakpoint);null!==n&&(h.breakpoints=n)}t.disableIntrospection===!0&&(h.disableIntrospection=!0),t.disableLazyLoading===!0&&(h.disableLazyLoading=!0),void 0!==t.offset&&"number"==typeof t.offset.x&&"number"==typeof t.offset.y&&(h.offset.x=t.offset.x,h.offset.y=t.offset.y),"ready"!==h.status||h.disableIntrospection||(c(),this.execute(document))},resized:function(){"ready"===h.status&&(null!==h.resizeInfo.wait&&clearTimeout(h.resizeInfo.wait),null===h.resizeInfo.time||(new Date).getTime()-h.resizeInfo.time>1e3?l.bind(this)():h.resizeInfo.wait=setTimeout(l.bind(this),100))},scrolled:function(){h.disableLazyLoading||r()},loaded:function(){"progress"===h.status&&(h.isIE8&&"complete"!=document.readyState||(s("remove","DOMContentLoaded",this.loaded),c(),h.disableIntrospection||(null!==h.observer&&h.observer.observe(document.body,{attributes:!0,childList:!0,characterData:!1,subtree:!0,attributeFilter:["data-src"]}),this.execute(document),s("add","resize",this.resized.bind(this))),h.disableLazyLoading||s("add","scroll",this.scrolled.bind(this)),h.status="ready"))},disableLazyLoading:function(){h.disableLazyLoading=!0},disableIntrospection:function(){h.disableIntrospection=!0,h.observer?h.observer.disconnect():s("remove","DOMNodeInserted",d)},initialize:function(){if("init"!==h.status)return void("error"!==h.status&&console.error("Rimg.initialize(): Already initialized. No forced initialization supported, check your code."));var t=this,e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;void 0===e||h.isIE8?(s("add","DOMAttrModified",function(){o()}),s("add","DOMNodeInserted",d.bind(t))):(h.observer=new e(function(){o()}),h.observer.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),h.status="progress","interactive"!==document.readyState&&"complete"!==document.readyState||!document.body?s("add","DOMContentLoaded",this.loaded.bind(this)):this.loaded.bind(this)()}}};window.Rimg=Object.create(t()),window.Rimg.initialize()}(),function(){var t,e,n,i,o,r,a,s,u,c,l,d,h,f,p,m,g,v,w,y,b,E,k,L,x,_,T,A,O,R,S,D,I,C,N,z,M,H,q,F,P,j,B,X,$,G,U,V,K,Q,W,Y,J,Z,tt,et,nt=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},it=function(t,e){function n(){this.constructor=t}for(var i in e)ot.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},ot={}.hasOwnProperty,rt=[].slice,at=function(t,e){return function(){return t.apply(e,arguments)}};C={},h=10,Y=!1,q=null,w=null,D=null,j=null,et=null,i={BEFORE_CHANGE:"page:before-change",FETCH:"page:fetch",RECEIVE:"page:receive",CHANGE:"page:change",UPDATE:"page:update",LOAD:"page:load",RESTORE:"page:restore",BEFORE_UNLOAD:"page:before-unload",EXPIRE:"page:expire"},L=function(t){var e;return t=new n(t),U(),d(),null!=q&&q.start(),Y&&(e=J(t.absolute))?(x(e),_(t,null,!1)):_(t,Q)},J=function(t){var e;return e=C[t],e&&!e.transitionCacheDisabled?e:void 0},b=function(t){return null==t&&(t=!0),Y=t},y=function(t){return null==t&&(t=!0),c?t?null!=q?q:q=new r("html"):(null!=q&&q.uninstall(),q=null):void 0},_=function(t,e,n){return null==n&&(n=!0),Z(i.FETCH,{url:t.absolute}),null!=et&&et.abort(),et=new XMLHttpRequest,et.open("GET",t.withoutHashForIE10compatibility(),!0),et.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),et.setRequestHeader("X-XHR-Referer",j),et.onload=function(){var n;return Z(i.RECEIVE,{url:t.absolute}),(n=H())?(B(t),X(),f.apply(null,k(n)),I(),"function"==typeof e&&e(),Z(i.LOAD)):document.location.href=v()||t.absolute},q&&n&&(et.onprogress=function(t){return function(t){var e;return e=t.lengthComputable?t.loaded/t.total*100:q.value+(100-q.value)/10,q.advanceTo(e)}}(this)),et.onloadend=function(){return et=null},et.onerror=function(){return document.location.href=t.absolute},et.send()},x=function(t){return null!=et&&et.abort(),f(t.title,t.body),F(t),Z(i.RESTORE)},d=function(){var t;return t=new n(w.url),C[t.absolute]={url:t.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},m(h)},z=function(t){return null==t&&(t=h),/^[\d]+$/.test(t)?h=parseInt(t):void 0},m=function(t){var e,n,o,r,a,s;for(a=Object.keys(C),e=a.map(function(t){return C[t].cachedAt}).sort(function(t,e){return e-t}),s=[],n=0,r=a.length;r>n;n++)o=a[n],C[o].cachedAt<=e[t]&&(Z(i.EXPIRE,C[o]),s.push(delete C[o]));return s},f=function(e,n,o,r){return Z(i.BEFORE_UNLOAD),document.title=e,document.documentElement.replaceChild(n,document.body),null!=o&&t.update(o),W(),r&&E(),w=window.history.state,null!=q&&q.done(),Z(i.CHANGE),Z(i.UPDATE)},E=function(){var t,e,n,i,o,r,a,s,u,c,l,d;for(d=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),n=0,o=d.length;o>n;n++)if(l=d[n],""===(u=l.type)||"text/javascript"===u){for(e=document.createElement("script"),c=l.attributes,i=0,r=c.length;r>i;i++)t=c[i],e.setAttribute(t.name,t.value);l.hasAttribute("async")||(e.async=!1),e.appendChild(document.createTextNode(l.innerHTML)),s=l.parentNode,a=l.nextSibling,s.removeChild(l),s.insertBefore(e,a)}},V=function(t){return t.innerHTML=t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),t},W=function(){var t,e;return t=(e=document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length-1],t&&document.activeElement!==t?t.focus():void 0},B=function(t){return(t=new n(t)).absolute!==j?window.history.pushState({turbolinks:!0,url:t.absolute},"",t.absolute):void 0},X=function(){var t,e;return(t=et.getResponseHeader("X-XHR-Redirected-To"))?(t=new n(t),e=t.hasNoHash()?document.location.hash:"",window.history.replaceState(window.history.state,"",t.href+e)):void 0},v=function(){var t;return null!=(t=et.getResponseHeader("Location"))&&new n(t).crossOrigin()?t:void 0},U=function(){return j=document.location.href},G=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},$=function(){return w=window.history.state},I=function(){var t;return navigator.userAgent.match(/Firefox/)&&!(t=new n).hasNoHash()?(window.history.replaceState(w,"",t.withoutHash()),document.location.hash=t.hash):void 0},F=function(t){return window.scrollTo(t.positionX,t.positionY)},Q=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},p=function(t){var e,n,i;if(null==t||"object"!=typeof t)return t;e=new t.constructor;for(n in t)i=t[n],e[n]=p(i);return e},M=function(t){var e,n;return n=(null!=(e=document.cookie.match(new RegExp(t+"=(\\w+)")))?e[1].toUpperCase():void 0)||"",document.cookie=t+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",n},Z=function(t,e){var n;return"undefined"!=typeof Prototype&&Event.fire(document,t,e,!0),n=document.createEvent("Events"),e&&(n.data=e),n.initEvent(t,!0,!0),document.dispatchEvent(n)},N=function(t){return!Z(i.BEFORE_CHANGE,{url:t})},H=function(){var t,e,n,i,o,r;return e=function(){var t;return 400<=(t=et.status)&&600>t},r=function(){var t;return null!=(t=et.getResponseHeader("Content-Type"))&&t.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},i=function(t){var e,n,i,o,r;for(o=t.querySelector("head").childNodes,r=[],e=0,n=o.length;n>e;e++)i=o[e],null!=("function"==typeof i.getAttribute?i.getAttribute("data-turbolinks-track"):void 0)&&r.push(i.getAttribute("src")||i.getAttribute("href"));return r},t=function(t){var e;return D||(D=i(document)),e=i(t),e.length!==D.length||o(e,D).length!==D.length},o=function(t,e){var n,i,o,r,a;for(t.length>e.length&&(o=[e,t],t=o[0],e=o[1]),r=[],n=0,i=t.length;i>n;n++)a=t[n],nt.call(e,a)>=0&&r.push(a);return r},!e()&&r()&&(n=g(et.responseText),n&&!t(n))?n:void 0},k=function(e){var n;return n=e.querySelector("title"),[null!=n?n.textContent:void 0,V(e.querySelector("body")),t.get(e).token,"runScripts"]},t={get:function(t){var e;return null==t&&(t=document),{node:e=t.querySelector('meta[name="csrf-token"]'),token:null!=e&&"function"==typeof e.getAttribute?e.getAttribute("content"):void 0}},update:function(t){var e;return e=this.get(),null!=e.token&&null!=t&&e.token!==t?e.node.setAttribute("content",t):void 0}},g=function(t){var e;return e=document.documentElement.cloneNode(),e.innerHTML=t,e.head=e.querySelector("head"),e.body=e.querySelector("body"),e},n=function(){function t(e){return this.original=null!=e?e:document.location.href,this.original.constructor===t?this.original:void this._parse()}return t.prototype.withoutHash=function(){return this.href.replace(this.hash,"").replace("#","")},t.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},t.prototype.hasNoHash=function(){return 0===this.hash.length},t.prototype.crossOrigin=function(){return this.origin!==(new t).origin},t.prototype._parse=function(){var t;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,t=this.link,this.href=t.href,this.protocol=t.protocol,this.host=t.host,this.hostname=t.hostname,this.port=t.port,this.pathname=t.pathname,this.search=t.search,this.hash=t.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},t}(),o=function(t){function e(t){return this.link=t,this.link.constructor===e?this.link:(this.original=this.link.href,this.originalElement=this.link,this.link=this.link.cloneNode(!1),void e.__super__.constructor.apply(this,arguments))}return it(e,t),e.HTML_EXTENSIONS=["html"],e.allowExtensions=function(){var t,n,i,o;for(n=1<=arguments.length?rt.call(arguments,0):[],i=0,o=n.length;o>i;i++)t=n[i],e.HTML_EXTENSIONS.push(t);return e.HTML_EXTENSIONS},e.prototype.shouldIgnore=function(){return this.crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},e.prototype._anchored=function(){return(this.hash.length>0||"#"===this.href.charAt(this.href.length-1))&&this.withoutHash()===(new n).withoutHash()},e.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+e.HTML_EXTENSIONS.join("|")+")?$","g"))},e.prototype._optOut=function(){var t,e;for(e=this.originalElement;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},e.prototype._target=function(){return 0!==this.link.target.length},e}(n),e=function(){function t(t){this.event=t,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&(N(this.link.absolute)||tt(this.link.href),this.event.preventDefault()))}return t.installHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",t.handle,!1),document.addEventListener("click",t.handle,!1))},t.handle=function(e){return new t(e)},t.prototype._extractLink=function(){var t;for(t=this.event.target;t.parentNode&&"A"!==t.nodeName;)t=t.parentNode;return"A"===t.nodeName&&0!==t.href.length?this.link=new o(t):void 0},t.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},t.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},t}(),r=function(){function t(t){this.elementSelector=t,this._trickle=at(this._trickle,this),this.value=0,this.content="",this.speed=300,this.opacity=.99,this.install()}var e;return e="turbolinks-progress-bar",t.prototype.install=function(){return this.element=document.querySelector(this.elementSelector),this.element.classList.add(e),this.styleElement=document.createElement("style"),document.head.appendChild(this.styleElement),this._updateStyle()},t.prototype.uninstall=function(){return this.element.classList.remove(e),document.head.removeChild(this.styleElement)},t.prototype.start=function(){return this.advanceTo(5)},t.prototype.advanceTo=function(t){var e;if(t>(e=this.value)&&100>=e){if(this.value=t,this._updateStyle(),100===this.value)return this._stopTrickle();if(this.value>0)return this._startTrickle()}},t.prototype.done=function(){return this.value>0?(this.advanceTo(100),this._reset()):void 0},t.prototype._reset=function(){var t;return t=this.opacity,setTimeout(function(t){return function(){return t.opacity=0,t._updateStyle()}}(this),this.speed/2),setTimeout(function(e){return function(){return e.value=0,e.opacity=t,e._withSpeed(0,function(){return e._updateStyle(!0)})}}(this),this.speed)},t.prototype._startTrickle=function(){return this.trickling?void 0:(this.trickling=!0,setTimeout(this._trickle,this.speed))},t.prototype._stopTrickle=function(){return delete this.trickling},t.prototype._trickle=function(){return this.trickling?(this.advanceTo(this.value+Math.random()/2),setTimeout(this._trickle,this.speed)):void 0},t.prototype._withSpeed=function(t,e){var n,i;return n=this.speed,this.speed=t,i=e(),this.speed=n,i},t.prototype._updateStyle=function(t){return null==t&&(t=!1),t&&this._changeContentToForceRepaint(),this.styleElement.textContent=this._createCSSRule()},t.prototype._changeContentToForceRepaint=function(){return this.content=""===this.content?" ":""},t.prototype._createCSSRule=function(){return this.elementSelector+"."+e+"::before {\n  content: '"+this.content+"';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: "+this.opacity+";\n  width: "+this.value+"%;\n  transition: width "+this.speed+"ms ease-out, opacity "+this.speed/2+"ms ease-in;\n  transform: translate3d(0,0,0);\n}"},t}(),l=function(t){return setTimeout(t,500)},O=function(){return document.addEventListener("DOMContentLoaded",function(){return Z(i.CHANGE),Z(i.UPDATE)},!0)},S=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(t,e,n){return jQuery.trim(e.responseText)?Z(i.UPDATE):void 0}):void 0},R=function(t){var e,i;return(null!=(i=t.state)?i.turbolinks:void 0)?(e=C[new n(t.state.url).absolute])?(d(),x(e)):tt(t.target.location.href):void 0},A=function(){return G(),$(),document.addEventListener("click",e.installHandlerLast,!0),window.addEventListener("hashchange",function(t){return G(),$()},!1),l(function(){return window.addEventListener("popstate",R,!1)})},T=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),u=window.history&&window.history.pushState&&window.history.replaceState&&T,a=!navigator.userAgent.match(/CriOS\//),K="GET"===(P=M("request_method"))||""===P,c=u&&a&&K,s=document.addEventListener&&document.createEvent,s&&(O(),S()),c?(tt=L,A()):tt=function(t){return document.location.href=t},this.Turbolinks={visit:tt,pagesCached:z,enableTransitionCache:b,enableProgressBar:y,allowLinkExtensions:o.allowExtensions,supported:c,EVENTS:p(i)}}.call(this),/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
function(t){"use strict";function e(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function n(t,e){var n=i(t,e)?r:o;n(t,e)}var i,o,r;"classList"in document.documentElement?(i=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(i=function(t,n){return e(n).test(t.className)},o=function(t,e){i(t,e)||(t.className=t.className+" "+e)},r=function(t,n){t.className=t.className.replace(e(n)," ")});var a={hasClass:i,addClass:o,removeClass:r,toggleClass:n,has:i,add:o,remove:r,toggle:n};"function"==typeof define&&define.amd?define(a):t.classie=a}(window);var scroll_top=function(){function t(t,e,n){function i(){r+=1/60;var e=r/a,u=s[n](e);1>e?(requestAnimFrame(i),window.scrollTo(0,o+(t-o)*u)):(console.log("scroll done"),window.scrollTo(0,t))}var o=window.pageYOffset,t=t||0,e=e||2e3,n=n||"easeOutSine",r=0;if("ontouchstart"in window||"onmsgesturechange"in window)var a=0;else var a=Math.max(.1,Math.min(Math.abs(o-t)/e,.8));var s=(Math.PI/2,{easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)}});i()}window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();var e=1500,n=document.getElementById("back-to-top");n&&(window.onscroll=debounce(function(){window.pageYOffset>e?classie.add(n,"is-visible"):classie.remove(n,"is-visible")},200)),addListener(n,"click",function(){t(0,1500,"easeInOutQuint")})},menu_mobile=function(){function t(){e()}function e(){o.addEventListener("click",function(t){t.preventDefault(),n()})}function n(){r?classie.remove(i,"show-menu"):classie.add(i,"show-menu"),r=!r}var i=document.body,o=(document.querySelector("section"),document.getElementById("menu-link")),r=!1;t()};!function(){"use strict";function t(){for(var t=1;t<arguments.length;t++)for(var e in arguments[t])arguments[t].hasOwnProperty(e)&&(arguments[0][e]=arguments[t][e]);return arguments[0]}function e(){if("string"==typeof key&&"undefined"==typeof value){this.nodeType?this:this[0]}return this}function n(e,n){this.context=e,this.options=t({},s,n),this.init()}function i(t){var e=t.forbidden.join("|"),i="("+e+")(?:\\n|\\s)+";n.findOrphanRegex=new RegExp(i,"gi");var o="\\s+("+e+")$";n.orphanAtTheEndRegex=new RegExp(o,"i")}var o="orphan",r=function(t,e){function n(t){if(t.nodeType==r)(e||!o.test(t.nodeValue))&&i.push(t);else for(var a=0,s=t.childNodes.length;s>a;++a)n(t.childNodes[a])}var i=[],o=/^\s*$/,r=3;return n(t),i};n.prototype.init=function(){i(this.options),this.execute()},n.prototype.execute=function(){var t=!1,e=r(this.context,!1);[].forEach.call(e,function(e){var i=e.nodeValue;i=n.deorphanize(i,e.options),t&&(i=i.replace(/^\s+/,u.nbsp),t=!1),n.orphanAtTheEndRegex.test(i)&&(t=!0),e.nodeValue=i})},n.deorphanize=function(e,o){return o=t({},s,o),n.findOrphanRegex||i(o),e=e.replace(n.findOrphanRegex,function(t,n,i){var o=e.substring(i-1,i);return" "!==o&&""!==o?t:n+u.nbsp})},Object.prototype[o]=function(t){e(this,o)||e(this,o,new n(this,t))};var a={nbsp:"\xa0"},s={forbidden:["a","i","o","u","w","z","ale","od","do","na","nad","pod","przed","po","to","tej","we","za","ze","\u017ce","by","gdy","np."],ignoreTags:["pre","code"]},u=a}(),function(t,e){function n(t,e){var i,o=typeof t,r=[];if(!t)return new c(r);if(t.call)return n.ready(t);if(t.constructor===c&&!e)return t;if("string"===o&&0===t.indexOf("<")){var a=document.createElement("div");return a.innerHTML=t,n(a).children().each(function(){a.removeChild(this)})}return"string"===o?e?n(e).find(t):(i=document.querySelectorAll(t),new c(i,t)):"[object Array]"===Object.prototype.toString.call(o)||window.NodeList&&t instanceof window.NodeList?new c(t,t):t.constructor===Array?new c(t,t):new c([t],t)}function i(t,e){var n=!1;return t.each(function(){for(var t=0;t<e.length;)this===e[t]&&(n=!0),t++}),n}function o(t,e){t.shoestringData||(t.shoestringData={}),t.shoestringData.events||(t.shoestringData.events={}),t.shoestringData.loop||(t.shoestringData.loop={}),t.shoestringData.events[e]||(t.shoestringData.events[e]=[])}function r(t,e,n){var i={};i.isCustomEvent=n.isCustomEvent,i.callback=n.callfunc,i.originalCallback=n.originalCallback,i.namespace=n.namespace,t.shoestringData.events[e].push(i),n.customEventLoop&&(t.shoestringData.loop[e]=n.customEventLoop)}function a(t,e){if(!t.addEventListener&&t.shoestringData&&t.shoestringData.events)for(var n=t.shoestringData.events[e]||[],i=n.length-1;i>=0;i--)n[i].isCustomEvent||(t.detachEvent("on"+e,n[i].callback),t.attachEvent("on"+e,n[i].callback))}function s(t,n,i){var o=this.shoestringData.events[t];if(o&&o.length){var r,a,s=[];for(r=0,a=o.length;a>r;r++)n&&n!==o[r].namespace||(i===e||i===o[r].originalCallback)&&("removeEventListener"in window?this.removeEventListener(t,o[r].callback,!1):this.detachEvent&&(this.detachEvent("on"+t,o[r].callback),1===o.length&&this.shoestringData.loop&&this.shoestringData.loop[t]&&document.documentElement.detachEvent("onpropertychange",this.shoestringData.loop[t])),s.push(r));for(r=0,a=s.length;a>r;r++)this.shoestringData.events[t].splice(r,1)}}function u(t,e){for(var n in this.shoestringData.events)s.call(this,n,t,e)}var c=function(t,e){this.length=0,this.selector=e,n.merge(this,t)};c.prototype.reverse=[].reverse,n.fn=c.prototype,n.Shoestring=c,n.extend=function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t},n.merge=function(t,e){var n,i,o;for(n=+e.length,i=0,o=t.length;n>i;i++)t[o++]=e[i];return t.length=o,t},window.shoestring=n,window.$=n,n.fn.each=function(t){return n.each(this,t)},n.each=function(t,e){for(var n,i=0,o=t.length;o>i&&(n=e.call(t[i],i,t[i]),n!==!1);i++);return t},n.inArray=function(t,e){for(var n=-1,i=0,o=e.length;o>i;i++)e.hasOwnProperty(i)&&e[i]===t&&(n=i);return n},n.ready=function(t){return l&&t?t.call(document):t?d.push(t):h(),[document]},n.fn.ready=function(t){return n.ready(t),this};var l=!1,d=[],h=function(){if(!l){for(;d.length;)d.shift().call(document);l=!0}};window.addEventListener||(window.addEventListener=function(t,e){return window.attachEvent("on"+t,e)}),(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?h():(document.addEventListener?(document.addEventListener("DOMContentLoaded",h,!1),document.addEventListener("readystatechange",h,!1)):(document.attachEvent("DOMContentLoaded",h),document.attachEvent("onreadystatechange",h)),window.addEventListener("load",h,!1)),n.fn.is=function(t){var e,o,r=!1,a=this;return"string"!=typeof t?(o=t.length&&t[0]?t:[t],i(this,o)):(e=this.parent(),e.length||(e=n(document)),e.each(function(e,n){var o;o=n.querySelectorAll(t),r=i(a,o)}),r)},n.fn.closest=function(t){var e=[];return t?(this.each(function(){var i,o=n(i=this);if(o.is(t))return void e.push(this);for(;i.parentElement;){if(n(i.parentElement).is(t)){e.push(i.parentElement);break}i=i.parentElement}}),n(e)):n(e)},n.fn.bind=function(t,i,s){function u(t,e,n){var o;if(!t._namespace||t._namespace===e){t.data=i,t.namespace=t._namespace;var r=function(){return!0};t.isDefaultPrevented=function(){return!1};var a=t.preventDefault,u=function(){return a?function(){t.isDefaultPrevented=r,a.call(t)}:function(){t.isDefaultPrevented=r,t.returnValue=!1}};return t.target=n||t.target||t.srcElement,t.preventDefault=u(),t.stopPropagation=t.stopPropagation||function(){t.cancelBubble=!0},o=s.apply(this,[t].concat(t._args)),o===!1&&(t.preventDefault(),t.stopPropagation()),o}}function c(t,i,o){var r=document.documentElement[t.propertyName],a=r.el,s=i;i===document&&a!==document&&(s=document.documentElement),a!==e&&n(a).closest(s).length&&(t._namespace=r._namespace,t._args=r._args,u.call(i,t,o,a))}"function"==typeof i&&(s=i,i=null);var l=t.split(" "),d=document.documentElement;return this.each(function(){for(var t,n,i,h=this,f=0,p=l.length;p>f;f++){var m=l[f].split("."),g=m[0],v=m.length>0?m[1]:null;t=function(t){return h.ssEventTrigger&&(t._namespace=h.ssEventTrigger._namespace,t._args=h.ssEventTrigger._args,h.ssEventTrigger=null),u.call(h,t,v)},n=null,i=null,o(this,g),"addEventListener"in this?this.addEventListener(g,t,!1):this.attachEvent&&(this["on"+g]!==e?this.attachEvent("on"+g,t):(n=function(){var t=g;return function(e){e.propertyName===t&&c(e,h,v)}}(),0===this.shoestringData.events[g].length&&(i=function(){var t=g;return function(e){if(h.shoestringData&&h.shoestringData.events){var n=h.shoestringData.events[t];if(n)for(var i=0,o=n.length;o>i;i++)n[i].callback(e)}}}(),d.attachEvent("onpropertychange",i)))),r(this,g,{callfunc:n||t,isCustomEvent:!!n,customEventLoop:i,originalCallback:s,namespace:v}),n||a(h,g)}})},n.fn.on=n.fn.bind,n.fn.unbind=function(t,e){var n=t?t.split(" "):[];return this.each(function(){if(this.shoestringData&&this.shoestringData.events)if(n.length)for(var t,i,o,r=0,a=n.length;a>r;r++)t=n[r].split("."),i=t[0],o=t.length>0?t[1]:null,i?s.call(this,i,o,e):u.call(this,o,e);else u.call(this)})},n.fn.off=n.fn.unbind}(this),window.onload=function(){aload()},document.addEventListener("page:load",function(){aload()}),addListenerMulti(document,"DOMContentLoaded page:load",function(){var t=document.querySelectorAll("p, li");[].forEach.call(t,function(t){t.orphan()})}),scroll_top(),document.addEventListener("page:load",function(){scroll_top()}),menu_mobile(),document.addEventListener("page:load",function(){menu_mobile()}),Turbolinks.enableProgressBar();var cta_link_1=document.getElementById("cta-1");cta_link_1&&addListener(cta_link_1,"click",function(){ga("send","event","button","click","cta-1")});var have_nice_day=function(){function t(){return 0==n||3==n||6==n?"Mi\u0142ej "+e[n]+"!":"Mi\u0142ego "+e[n]+"!"}var e=["Niedzieli","Poniedzia\u0142ku","Wtorku","\u015arody","Czwartku","Pi\u0105tku","Soboty"],n=(new Date).getDay(),i=t(),o=document.getElementById("weekday");o.innerHTML=i};have_nice_day(),document.addEventListener("page:load",function(){have_nice_day()});var func_scroll=function(){function t(t){t.matches&&e&&n&&syncscroll("compare-1","compare-2")}var e=document.getElementById("compare-1"),n=document.getElementById("compare-2");if(window.matchMedia){var i=window.matchMedia("(min-width: 700px)");i.addListener(t),t(i)}};func_scroll(),document.addEventListener("page:load",function(){func_scroll()});var mockup_hover=function(){var t=document.querySelectorAll(".mockup"),e=document.querySelectorAll(".mockup-shade"),n=document.getElementById("compare-1"),i=document.getElementById("compare-2");if(e&&[].forEach.call(t,function(t){addListener(t,"mouseover",function(){classie.add(this,"is-hovered")}),addListener(t,"mouseout",function(){classie.remove(this,"is-hovered")}),addListener(t,"touchstart",function(){classie.add(this,"is-hidden")})}),n&&i){var o=n.parentNode,r=i.parentNode;addListenerMulti(o,"mouseover touchstart",function(){classie.add(r,"is-hovered")}),addListener(o,"mouseout",function(){classie.remove(r,"is-hovered")}),addListenerMulti(r,"mouseover touchstart",function(){classie.add(o,"is-hovered")}),addListener(r,"mouseout",function(){classie.remove(o,"is-hovered")})}};mockup_hover(),document.addEventListener("page:load",function(){mockup_hover()});