/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */


( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );
// (function() {
// 	var bodyEl = $('body'),
// 		content = $('.content'),
// 		openbtn = $('.menu-link'),
// 		// closebtn = $('#close-button'),
// 		isOpen = false;

// 	function init() {
// 		initEvents();
// 	}

// 	function initEvents() {
// 		openbtn.on('click', function(e){
// 			e.preventDefault();
// 			toggleMenu();	
// 		});

// 		// if( closebtn ) {
// 		// 	closebtn.on('click', toggleMenu );
// 		// }

// 		// close the menu element if the target it´s not the menu element or one of its descendants..
// 		content.on('click', function(ev){
// 			var target = ev.target;
// 			if( isOpen && target !== openbtn ) {
// 				toggleMenu();
// 			}
// 		});
// 	}

// 	function toggleMenu() {
// 		if( isOpen ) {
// 			bodyEl.removeClass('show-menu');
// 		}
// 		else {
// 			bodyEl.addClass('show-menu');	
// 		}
// 		isOpen = !isOpen;
// 	}

// 	init();

// })();

(function() {

	var bodyEl = document.body,
		content = document.querySelector( 'section' ),
		openbtn = document.getElementById( 'menu-link' ),
		// closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		// if( closebtn ) {
		// 	closebtn.addEventListener( 'click', toggleMenu );
		// }



		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
		}
		else {
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();




function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}

var cta_link_1 = document.getElementById('cta-1');
var cta_link_2 = document.getElementById('cta-2');
if(cta_link_1) {   //if the element exists add the click event
	addListener(cta_link_1, 'click', function() {
	  ga('send', 'event', 'button', 'click', 'cta-buttons');
	});	
};

if(cta_link_2) {
	addListener(cta_link_2, 'click', function() {
	  ga('send', 'event', 'button', 'click', 'cta-buttons');
	});
};

