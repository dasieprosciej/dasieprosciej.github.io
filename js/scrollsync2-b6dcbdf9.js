!function(){function e(){u=(o.scrollHeight-o.clientHeight)/(c.scrollHeight-c.clientHeight)}function n(e){for(var n=0;n<e.changedTouches.length;n++){var t=e.changedTouches[n];if(t===r){r=null;break}}}function t(){o.scrollTop=Math.round(c.scrollTop*u)}var c=document.getElementById("compare-1"),o=document.getElementById("compare-2"),r=null,l=0,a=0,u=0;c.addEventListener("touchstart",function(n){n.preventDefault();var t=n.changedTouches[0];null==r&&(r=t,l=t.screenY,a=c.scrollTop,e())}),c.addEventListener("touchend",n),c.addEventListener("touchcancel",n),c.addEventListener("touchmove",function(){for(var e=0;e<event.changedTouches.length;e++){var n=event.changedTouches[e];if(n===r){var o=n.screenY-l;c.scrollTop=a+(0-o),t();break}}});"ontouchstart"in document.documentElement;e(),c.addEventListener("scroll",t)}();