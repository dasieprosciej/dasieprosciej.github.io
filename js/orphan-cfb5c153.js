!function(){"use strict";function e(){for(var e=1;e<arguments.length;e++)for(var n in arguments[e])arguments[e].hasOwnProperty(n)&&(arguments[0][n]=arguments[e][n]);return arguments[0]}function n(){if("string"==typeof key&&"undefined"==typeof value){this.nodeType?this:this[0]}return this}function t(n,t){this.context=n,this.options=e({},a,t),this.init()}function o(e){var n=e.forbidden.join("|"),o="("+n+")(?:\\n|\\s)+";t.findOrphanRegex=new RegExp(o,"gi");var i="\\s+("+n+")$";t.orphanAtTheEndRegex=new RegExp(i,"i")}var i="orphan",r=function(e,n){function t(e){if(e.nodeType==r)(n||!i.test(e.nodeValue))&&o.push(e);else for(var s=0,a=e.childNodes.length;a>s;++s)t(e.childNodes[s])}var o=[],i=/^\s*$/,r=3;return t(e),o};t.prototype.init=function(){o(this.options),this.execute()},t.prototype.execute=function(){var e=!1,n=r(this.context,!1);[].forEach.call(n,function(n){var o=n.nodeValue;o=t.deorphanize(o,n.options),e&&(o=o.replace(/^\s+/,p.nbsp),e=!1),t.orphanAtTheEndRegex.test(o)&&(e=!0),n.nodeValue=o})},t.deorphanize=function(n,i){return i=e({},a,i),t.findOrphanRegex||o(i),n=n.replace(t.findOrphanRegex,function(e,t,o){var i=n.substring(o-1,o);return" "!==i&&""!==i?e:t+p.nbsp})},Object.prototype[i]=function(e){n(this,i)||n(this,i,new t(this,e))};var s={nbsp:"\xa0"},a={forbidden:["a","i","o","\\(o","u","w","z","ale","od","do","na","nad","pod","przed","po","to","tej","we","za","ze","\u017ce","by","gdy","np."],ignoreTags:["pre","code"]},p=s}();