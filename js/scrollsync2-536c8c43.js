!function(){function e(){d=(o.scrollHeight-o.clientHeight)/(c.scrollHeight-c.clientHeight)}function n(e){for(var n=0;n<e.changedTouches.length;n++){var t=e.changedTouches[n];if(t===r){r=null;break}}}function t(){o.scrollTop=Math.round(c.scrollTop*d)}var c=document.getElementById("compare-1"),o=document.getElementById("compare-2"),r=null,l=0,u=0,d=0;document.addEventListener("touchstart",function(n){n.preventDefault();var t=n.changedTouches[0];null==r&&(r=t,l=t.screenY,u=c.scrollTop,e())}),document.addEventListener("touchend",n),document.addEventListener("touchcancel",n),document.addEventListener("touchmove",function(){for(var e=0;e<event.changedTouches.length;e++){var n=event.changedTouches[e];if(n===r){var o=n.screenY-l;c.scrollTop=u+(0-o),t();break}}});"ontouchstart"in document.documentElement;e(),c.addEventListener("scroll",t)}();