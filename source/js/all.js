//= require rimg-breakpoints
//= require rimg.min
//= require classie
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


(function() {
  var days = ['Niedzieli', 'Poniedziałku', 'Wtorku', 'Środy', 'Czwartku', 'Piątku', 'Soboty'];
  var dow = new Date().getDay();
  function msg(){
    if (dow==0 || dow==3 || dow==6) {
      return 'Miłej ' + days[dow] + '!'
    }
    else {
      return 'Miłego ' + days[dow] + '!';    
    }
  };
  var msg2 = msg();
  var day = document.getElementById('weekday');
  day.innerHTML = msg2;
})();

