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
		// openbtn.addEventListener( 'click', toggleMenu, false );
		openbtn.addEventListener( 'click', function(evt){
			evt.preventDefault();
			toggleMenu();
		} );
		// if( closebtn ) {
		// 	closebtn.addEventListener( 'click', toggleMenu );
		// }



		// close the menu element if the target it´s not the menu element or one of its descendants..
		if (content) {
			content.addEventListener( 'click', function(ev) {
				var target = ev.target;
				if( isOpen && target !== openbtn ) {
					toggleMenu();
				}
			} );
		}
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