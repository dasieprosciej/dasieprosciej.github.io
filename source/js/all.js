//= require rAF
//= require layzr
//= require rimg-breakpoints
//= require rimg.min
//= require turbolinks
//= require synchdivscroll
//= require classie
//= require debounce
//= require scrollTop
//= require menu_j
//= require orphan

//aload
// window.onload = function () {
//   aload();
// };
// document.addEventListener("page:load", function () {
//     aload();
// });



// orphan
var single = document.querySelectorAll('p, li');
[].forEach.call(single, function(el){
  el.orphan();
});

//turbolinks
Turbolinks.enableProgressBar();

//layzr
var layzr = new Layzr(
{
  threshold: 20
}
);

//analytics
function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}

function addListenerMulti(el, s, fn) {
  var evts = s.split(' ');
  for (var i=0, iLen=evts.length; i<iLen; i++) {
    addListener(el, evts[i], fn);
  }
}


var cta_link_1 = document.getElementById('cta-1');
// var cta_link_2 = document.getElementById('cta-2');
if(cta_link_1) {   //if the element exists add the click event
	addListener(cta_link_1, 'click', function() {
	  ga('send', 'event', 'button', 'click', 'cta-1');
	});	
};


//usun shade na mobilnych przy dotyku touch
// (function(){
//   var mockups = document.querySelectorAll('.mockup-shade');
//   if(mockups) {
//     [].forEach.call(mockups, function(mockup) {
//       addListener(mockup, 'touchstart', function(){
//         this.style.display = "none";
//       })
//     });
//   }
// })();


//milego dnia tygodnia
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

//matchmedia dla synchscroll
(function(){
  var comp_1 = document.getElementById('compare-1');
  var comp_2 = document.getElementById('compare-2');  
  if(window.matchMedia) {
    var mq = window.matchMedia("(min-width: 700px)");
    mq.addListener(WidthChange);
    WidthChange(mq);  
  }
  function WidthChange(mq) {
    if(mq.matches && comp_1 && comp_2) {  
      new SynchDivScroll('compare-1', 'compare-2'); //synchscroll init
    }
  }
})();

//add hover on mockup
(function(){

  var mockups = document.querySelectorAll('.mockup');
  var mockups_shade = document.querySelectorAll('.mockup-shade');
  var comp_1 = document.getElementById('compare-1');
  var comp_2 = document.getElementById('compare-2');

  
  if(mockups_shade) {
    [].forEach.call(mockups, function(mockup) {
      addListener(mockup, 'mouseover', function(){
        classie.add( this, 'is-hovered' );
      });
      addListener(mockup, 'mouseout', function(){
        classie.remove( this, 'is-hovered' );
      });
      addListener(mockup, 'touchstart', function(){
        classie.add( this, 'is-hidden' );
      });
    });
  }
  if(comp_1 && comp_2)  {
    var compare_1 = comp_1.parentNode;
    var compare_2 = comp_2.parentNode;

    addListenerMulti(compare_1, 'mouseover touchstart', function(){
      classie.add( compare_2, 'is-hovered' );
    });
    addListener(compare_1, 'mouseout', function(){
      classie.remove( compare_2, 'is-hovered' );
    });

    addListenerMulti(compare_2, 'mouseover touchstart', function(){
      classie.add( compare_1, 'is-hovered' );
    });
    addListener(compare_2, 'mouseout', function(){
      classie.remove( compare_1, 'is-hovered' );
    });

  }

})();


//vivus
// odpowiada = new Vivus('odpowiada', {type: 'delayed', duration: 150});
// wzmacnia = new Vivus('wzmacnia', {type: 'delayed', duration: 150});
// buduje = new Vivus('buduje', {type: 'delayed', duration: 150});
// czyni = new Vivus('czyni', {type: 'delayed', duration: 150});