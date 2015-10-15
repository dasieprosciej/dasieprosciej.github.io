// (function($, window, document, undefined) {
(function(window) {

    'use strict';
    //pure js equivalents
    function extend(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }

    function data() {
        if (typeof key === 'string' && typeof value === 'undefined') {
            var element = this.nodeType ? this : this[0];
        }
        return this;
    }

    ////

    var plugin = 'orphan';  


    var getTextNodesIn = function(node, includeWhitespaceNodes) {
        var textNodes = [], onlyWhitespaces = /^\s*$/;
        var TEXT_NODE = 3;

        function getTextNodes(node) {
            if (node.nodeType == TEXT_NODE) {
                if (includeWhitespaceNodes || !onlyWhitespaces.test(node.nodeValue)) {
                    textNodes.push(node);
                }
            } else {
                for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }

        getTextNodes(node);
        return textNodes;
    };


    function Deorphanator(context, options) {
        this.context = context;
        this.options = extend({}, defaults, options);
        this.init();
    }

    Deorphanator.prototype.init = function() {
        compileRegex(this.options);
        this.execute();
    };

    Deorphanator.prototype.execute = function() {
        var orphanAtTheEnd = false;
        var textNodes = getTextNodesIn(this.context, false);
        var self = this;


         [].forEach.call(textNodes, function(e) { 

            var text = e.nodeValue;
            text = Deorphanator.deorphanize(text, e.options);

            if (orphanAtTheEnd) {
                text = text.replace(/^\s+/, Entities.nbsp);
                orphanAtTheEnd = false;
            }

            if (Deorphanator.orphanAtTheEndRegex.test(text)) {
                orphanAtTheEnd = true;
            }

            e.nodeValue = text;
        });
    };

    Deorphanator.deorphanize = function(text, options) {
        options = extend({}, defaults, options);
        if (!Deorphanator.findOrphanRegex) {
            compileRegex(options);
        }

        text = text.replace(Deorphanator.findOrphanRegex, function($0, $1, pos) {
            var preMatchChar = text.substring(pos - 1, pos);

            if (preMatchChar !== ' ' && preMatchChar !== '') {
                return $0;
            } else {
                return $1 + Entities.nbsp;
            }
        });

        return text;
    };

    function compileRegex(options) {
        var forbiddenAlt = options.forbidden.join('|');

        var findOrphanPattern = '(' + forbiddenAlt + ')(?:\\n|\\s)+';
        Deorphanator.findOrphanRegex = new RegExp(findOrphanPattern, 'gi');

        var orphanAtTheEndPattern = '\\s+(' + forbiddenAlt + ')$';
        Deorphanator.orphanAtTheEndRegex = new RegExp(orphanAtTheEndPattern, 'i');
    }

    // $.fn[plugin.fullName] = function(options) {
    Object.prototype[plugin] = function(options) {
            if (!data(this, plugin)) {
                data(this, plugin, new Deorphanator(this, options));
            }     
    };



    var entities = {
        nbsp: '\u00A0' // non-breaking space, &nbsp;
    };    

     var defaults = {
        forbidden: ['a', 'i', 'o', 'u', 'w', 'z', 'ale', 'od', 'do', 'na', 'nad', 'pod', 'przed', 'po', 'to', 'tej', 'we', 'za', 'ze', 'że', 'by', 'gdy', 'np.'],
        ignoreTags: ['pre', 'code'],
    };

    // $[plugin.fullName] = {
    //     deorphanize: Deorphanator.deorphanize
    // };

    var Entities = entities;

})(window);
// })(jQuery, window, document);