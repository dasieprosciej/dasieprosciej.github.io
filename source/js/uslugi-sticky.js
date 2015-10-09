(function(){



  var sticky = document.getElementById('sticky'),
      bodyRect = document.body.getBoundingClientRect(),
      section = document.querySelector('.uslugi-block-4');              
              

  if (sticky && section) {
    var section_height = section.offsetHeight,
        elemRect = section.getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;
    function dupa() {
        if (window.pageYOffset > offset && window.pageYOffset < (offset + section_height - 350)) {
         classie.add( sticky, 'is-fixed' ) 
        }
        else {
         classie.remove( sticky, 'is-fixed' ) 
        }
    }
    if(window.matchMedia) {
      var mq_uslugi = window.matchMedia("(min-width: 1020px)");
      mq_uslugi.addListener(change);
      change(mq_uslugi);  
    }


    function change(mq) {
      if(mq_uslugi.matches) {  
        window.addEventListener('scroll', dupa, false);    
        window.addEventListener('resize', dupa, false);    
      }
      else {
        window.removeEventListener('scroll', dupa, false);    
        window.removeEventListener('resize', dupa, false);
        if(classie.has( sticky, 'is-fixed')) {
          classie.remove( sticky, 'is-fixed' ) ; 
        }     
      }
    }
    // window.addEventListener('scroll', dupa, false);
    
  }


})();