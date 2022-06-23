/*==================== SHOW MENU MOBILE ====================*/
(function () {
	$('.hamburger-menu').on('click', function() {
		$('.bar').toggleClass('animate');
    var blacklogo= document.getElementById('mainlogoblack');
    var mobileNav = $('.mobile-nav');
    mobileNav.toggleClass('hide show');
    blacklogo.classList.toggle('hidden');
    
    document.body.classList.toggle('no-scroll')
	})
})();
/*==================== close menu mobile when click ====================*/

(function () {
	$('.mobile-nav-link').on('click', function() {
    $('.bar').toggleClass('animate');
    var mobileNav = $('.mobile-nav');
    mobileNav.toggleClass('hide show');
console.log("mobile menu opebned");
    document.body.classList.remove('no-scroll')

	})
})();
/*==================== mint button click mobile ====================*/
(function () {
	$('.mintbuttonmobile').on('click', function() {
    $('.bar').toggleClass('animate');
    var mobileNav = $('.mobile-nav');
    mobileNav.toggleClass('hide show');

    document.body.classList.remove('no-scroll')

	})
})();

/*==================== hide mint section ====================*/
/*
function onPageLoad(){
  $("#mint").hide();
};*/
/*==================== mint section ====================*/
/*
(function(){
  $('.mintbutton').on('click', function(){
    $("#mint").removeClass("hidden");
    $("#mint").addClass("visible");
    $("main").hide(1000);
    
    //$('#mint').show(500);
    
    $(".mintbutton").hide(500);
    $(".logoheader").addClass('is--visible');
        //MetamaskConnection();
  })
  })();

  (function(){
    $('ul').on('click', function() {
    if ($('#mint').hasClass("visible"))
        {
          $("main").show(700);
          $("#mint").addClass("hidden");
          $(".mintbutton").show(500);

        };
    
      })
    })();


*/

/*
  $("header").click(function(){
    $("main").show(500);
    $('#mint').hide(500);
  });  
*/











/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  distance: "20px",
  duration: 2000,
  reset: false
});

sr.reveal(
  `.reveal`,
  {
    //desde arriba
    origin: "top",
    interval: 100
  }
);

sr.reveal(`.revealleft`, {
  //desde izq
  origin: "left"
});

sr.reveal(`.revealright`, {
  //desde derecha
  origin: "right"
});




/*==================== FAQ ====================*/
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach(item => item.addEventListener('click', toggleAccordion));




/*==================== SCROLL CIRCLE PROGRESS ====================*/


/*
$(function() {
	
	$(window).scroll(function() {
		var scroll = ($(window).scrollTop() / $(window).innerHeight()) * 100;
		if ( scroll >= 10 ) {
			$('.scroll-top-button, .header-scroll').css({'opacity': '1', 'pointer-events': 'auto'});
		} else {
			$('.scroll-top-button, .header-scroll').stop(true,true).css({'opacity': '0', 'pointer-events': 'none'});
		}
		// scroll percentage
		var s = $(window).scrollTop(),
				d = $(document).height(),
				win = $(window).height();
		var scrollPercent = (s / (d - win)) * 100;
		console.log('scroll perc: ', scrollPercent);
		var val = parseInt(scrollPercent);
		var $circle = $('.go circle');
		if (isNaN(val)) {
			val = 100;
		} else {
			var r = $circle.attr('r');
			var win = Math.PI*(r*2);
			if (val < 0) { val = 0; }
			if (val > 100) { val = 100; }
			var pct = ((100-val)/100)*win;
			$circle.css('stroke-dashoffset', pct);
			// console.log( pct );
			$('.header-scroll').css('right', pct + '%');
		}
	});
  
	$(document).on('click', '.scroll-top-button', function () {
		$("html, body").animate({scrollTop: 0}, 500);
	});
	
});
*/






/*==================== connectwallet menu ====================*/


const $menu = $('.dropdown');
$(document).mouseup(e => {
   if (!$menu.is(e.target) // if the target of the click isn't the container...
   && $menu.has(e.target).length === 0) // ... nor a descendant of the container
   {
     $menu.removeClass('is-active');
  }
 });

$('.togglemenu').on('click', () => {
  $menu.toggleClass('is-active');
  
});




