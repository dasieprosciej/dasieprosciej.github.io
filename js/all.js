/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
function addListener(n,t,e){n.addEventListener?n.addEventListener(t,e):n.attachEvent&&n.attachEvent("on"+t,e)}!function(n){"use strict";function t(n){return new RegExp("(^|\\s+)"+n+"(\\s+|$)")}function e(n,t){var e=c(n,t)?s:a;e(n,t)}var c,a,s;"classList"in document.documentElement?(c=function(n,t){return n.classList.contains(t)},a=function(n,t){n.classList.add(t)},s=function(n,t){n.classList.remove(t)}):(c=function(n,e){return t(e).test(n.className)},a=function(n,t){c(n,t)||(n.className=n.className+" "+t)},s=function(n,e){n.className=n.className.replace(t(e)," ")});var i={hasClass:c,addClass:a,removeClass:s,toggleClass:e,has:c,add:a,remove:s,toggle:e};"function"==typeof define&&define.amd?define(i):n.classie=i}(window),function(){function n(){t()}function t(){s.addEventListener("click",function(n){n.preventDefault(),e()}),a.addEventListener("click",function(n){var t=n.target;i&&t!==s&&e()})}function e(){i?classie.remove(c,"show-menu"):classie.add(c,"show-menu"),i=!i}var c=document.body,a=document.querySelector("section"),s=document.getElementById("menu-link"),i=!1;n()}();var cta_link_1=document.getElementById("cta-1"),cta_link_2=document.getElementById("cta-2");cta_link_1&&addListener(cta_link_1,"click",function(){ga("send","event","button","click","cta-buttons")}),cta_link_2&&addListener(cta_link_2,"click",function(){ga("send","event","button","click","cta-buttons")});