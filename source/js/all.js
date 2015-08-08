
//= require classie
//= require menu_j
//= require smoothscroll






function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}

var cta_link_1 = document.getElementById('cta-1');
var cta_link_2 = document.getElementById('cta-2');
if(cta_link_1) {   //if the element exists add the click event
	addListener(cta_link_1, 'click', function() {
	  ga('send', 'event', 'button', 'click', 'cta-1');
	});	
};

if(cta_link_2) {
	addListener(cta_link_2, 'click', function() {
	  ga('send', 'event', 'button', 'click', 'cta-2');
	});
};

