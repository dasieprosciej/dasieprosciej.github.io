window.smoothScroll=function(){if(void 0!==document.querySelectorAll&&void 0!==window.pageYOffset&&void 0!==history.pushState){var n=function(n){return"HTML"===n.nodeName?-window.pageYOffset:n.getBoundingClientRect().top+window.pageYOffset},e=function(n){return.5>n?4*n*n*n:(n-1)*(2*n-2)*(2*n-2)+1},t=function(n,t,o,i){return o>i?t:n+(t-n)*e(o/i)},o=function(e,o,i){o=o||500;var a=window.pageYOffset;if("number"==typeof e)var r=parseInt(e);else var r=n(e);var u=Date.now(),d=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(n){window.setTimeout(n,15)},f=function(){var n=Date.now()-u;window.scroll(0,t(a,r,n,o)),n>o?"function"==typeof i&&i(e):d(f)};f()},i=function(n){n.preventDefault(),location.hash!==this.hash&&window.history.pushState(null,null,this.hash),o(document.getElementById(this.hash.substring(1)),500,function(n){location.replace("#"+n.id)})},a=function(){for(var n,e=document.querySelectorAll('a[href^="#"]:not([href="#"])'),t=e.length;n=e[--t];)n.addEventListener("click",i,!1)};return document.addEventListener("DOMContentLoaded",function(){a()}),document.addEventListener("page:load",function(){a()}),o}}();