//= require rAF
//= require aload
//= require rimg-breakpoints
//= require rimg.min
//= require turbolinks
//= require classie
//= require debounce
//= require scrollTop
//= require menu_j
//= require orphan
//= require shoestring
//= require scrollsync



//turbolinks
Turbolinks.enableProgressBar();

//turbolinks counter
document.addEventListener('page:load', function(){
   Turbolinks.counter = Turbolinks.counter || 0;
    Turbolinks.counter++;
    if (Turbolinks.counter > 50) {
         console.log('Clense thy browser from your memory leak sins!');
         document.body.setAttribute('data-no-turbolink', true);
    }
  });



//aload
window.onload = function () {
  aload();
};
document.addEventListener("page:load", function () {
    aload();
});

//layzr on init
//   var layzr = new Layzr({
//     threshold: 20
//   });  
// //for turbolinks  
// document.addEventListener('page:load', function(){
//       var layzr = new Layzr({
//         threshold: 20
//       });  
// });

// orphan
addListenerMulti(document, 'DOMContentLoaded page:load', function(){ //tylko tutaj tego uzylem bo jakbym chcial dodac async do js to wtedy nie dziala i trzeba tak jak w ponizszych funkcjach
    var single = document.querySelectorAll('p, li');
  [].forEach.call(single, function(el){
    el.orphan();
  });
});




//scroll top
  //initial
  scroll_top();
  //turbolinks
  document.addEventListener('page:load', function(){
    scroll_top();
  });

//menu mobile
  //initial
  menu_mobile();
  //turbolinks
  document.addEventListener('page:load', function(){
    menu_mobile();
  });



// var single = document.querySelectorAll('p, li');
// [].forEach.call(single, function(el){
//   el.orphan();
// });









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
var have_nice_day = function() {
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
}

//on init
have_nice_day();
//turbo
document.addEventListener('page:load', function(){
  have_nice_day();
});


// (function() {
//   var days = ['Niedzieli', 'Poniedziałku', 'Wtorku', 'Środy', 'Czwartku', 'Piątku', 'Soboty'];
//   var dow = new Date().getDay();
//   function msg(){
//     if (dow==0 || dow==3 || dow==6) {
//       return 'Miłej ' + days[dow] + '!'
//     }
//     else {
//       return 'Miłego ' + days[dow] + '!';    
//     }
//   };
//   var msg2 = msg();
//   var day = document.getElementById('weekday');
//   day.innerHTML = msg2;
// })();

//matchmedia dla synchscroll
var func_scroll = function(){
  var comp_1 = document.getElementById('compare-1');
  var comp_2 = document.getElementById('compare-2');  
  if(window.matchMedia) {
    var mq = window.matchMedia("(min-width: 700px)");
    mq.addListener(WidthChange);
    WidthChange(mq);  
  }
  function WidthChange(mq) {
    if(mq.matches && comp_1 && comp_2) {  
      syncscroll('compare-1', 'compare-2'); //sync function 
    }
  }
}

//on init
func_scroll();
//fot turbolinks
document.addEventListener('page:load', function(){
  func_scroll();
});



//add hover on mockup
var mockup_hover = function(){
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
}

//on init
mockup_hover();
//fot turbolinks
document.addEventListener('page:load', function(){
  mockup_hover();
});






