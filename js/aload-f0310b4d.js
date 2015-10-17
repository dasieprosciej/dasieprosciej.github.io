/**
 * aload - v1.2.1
 *
 * Copyright (c) 2015, @pazguille <guille87paz@gmail.com>
 * Released under the MIT license.
 */
function aload(t){"use strict";t=t||window.document.querySelectorAll("[data-aload]"),void 0===t.length&&(t=[t]);var a,e=0,r=t.length;for(e;r>e;e+=1)a=t[e],a["LINK"!==a.tagName?"src":"href"]=a.getAttribute("data-aload"),a.removeAttribute("data-aload");return t}