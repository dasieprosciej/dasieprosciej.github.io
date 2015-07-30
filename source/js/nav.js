$(function() {
	var headerHeight = $('.header').outerHeight();
	var heroHeight = $('.hero').outerHeight();
	// var heroHeight = '500';
	if($(window).scrollTop() > heroHeight) {
		$('.header').addClass('is-hidden');
	}
	$(window).on('scroll',
		{
	        previousTop: 0
	    }, 
	    function () {
		    var currentTop = $(window).scrollTop();
		    //check if user is scrolling up
		    // if (currentTop > heroHeight) {
		    // 	$('.header').addClass('is-hidden');
		    // }

		    if (currentTop < this.previousTop ) {
		    	//if scrolling up...
		    	if (currentTop > 0 && $('.header').hasClass('is-fixed')) {
		    		$('.header').addClass('is-visible').removeClass('is-hidden');
		    	} else {
		    		// $('.header').removeClass('is-visible is-fixed');
		    		$('.header').removeClass('is-fixed is-hidden');
		    	}
		    } 

		    else {
		    	//if scrolling down...
		    	$('.header').removeClass('is-visible');
		    	if( currentTop > headerHeight ) {
		    		$('.header').addClass('is-hidden');	
		    	};
		    	if( currentTop > heroHeight && !$('.header').hasClass('is-fixed')) {
		    		// $('.header').addClass('is-fixed');	
		    		$('.header').addClass('is-hidden');
		    		setTimeout(function(){
		    			$('.header').addClass('is-fixed');
		    		},300);	
		    	} 
		    	 
		    	

		    }
		    this.previousTop = currentTop;
		});






});