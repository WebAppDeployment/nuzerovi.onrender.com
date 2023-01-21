

/* Custom javascript file
======================================================================== */


$(document).ready(function() {

	/* Responsive Navigation
	======================================================================== */

	var $main_nav   = $("#main-nav"),
		$nav_toggle = $("#nav-toggle");

	/* Always show the navigation when the 'menu' button is hidden */
	$(window).on('resize', function () {
		if ($nav_toggle.is(":hidden")) {
			if ($main_nav.is(":hidden")) {
				$main_nav.css('display', 'block');
			}
		}
	});

	/* Disable CSS Transitions by default (it prevents errors with 3rd party libraries) */
	$.toggleDisabledByDefault();

	$("#nav-toggle").click(function () {
		$('#main-nav').animate({height: "toggle", avoidCSSTransitions:false, leaveTransforms:false }, 700);
		return false;
	});



	/* Content Slider - FlexSlider
	======================================================================== */

	var content_slider = $('.flexslider').flexslider({
		controlsContainer: ".content-slider", //Selector: Declare which container the navigation elements should be appended too. Default container is the flexSlider element. Example use would be ".flexslider-container", "#container", etc. If the given element is not found, the default action will be taken.
		animation: "slide",              //String: Select your animation type, "fade" or "slide"
		slideDirection: "horizontal",   //String: Select the sliding direction, "horizontal" or "vertical"
		slideshow: true,                //Boolean: Animate slider automatically
		slideshowSpeed: 4000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationDuration: 300,         //Integer: Set the speed of animations, in milliseconds
		directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
		controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
		keyboardNav: false,              //Boolean: Allow slider navigating via keyboard left/right keys
		mousewheel: false,              //Boolean: Allow slider navigating via mousewheel
		prevText: "Previous",           //String: Set the text for the "previous" directionNav item
		nextText: "Next",               //String: Set the text for the "next" directionNav item
		pausePlay: false,               //Boolean: Create pause/play dynamic element
		pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
		playText: 'Play',               //String: Set the text for the "play" pausePlay item
		randomize: false,               //Boolean: Randomize slide order
		slideToStart: 0,                //Integer: The slide that the slider should start on. Array notation (0 = first slide)
		animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
		pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
		pauseOnHover: true,            	//Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
		manualControls: "",             //Selector: Declare custom control navigation. Example would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
		start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
		before: function(slider){		//Callback: function(slider) - Fires asynchronously with each slider animation
			// Performance fix
			$('.flexslider img').css('image-rendering', 'optimizeSpeed')
				.css('-ms-interpolation-mode', 'nearest-neighbor');
		},
		after: function(slider){		//Callback: function(slider) - Fires after each slider animation completes
			// Reset Performance fix
			$('.flexslider img').css('image-rendering', 'optimizeQuality')
				.css('-ms-interpolation-mode', 'bicubic');
		},
		end: function(){}               //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
	});

	// Show/Hide the Content Slider arrows on mouse-over/mouse-out
	$('.content-slider').hover(
		function() {
			$(this).children('.flex-direction-nav').stop(false, false).fadeTo('slow', 1);
		},
		function () {
			$(this).children('.flex-direction-nav').stop(false, false).fadeTo('slow', 0);
		});

	// Hide the arrows by default
	$('#slider .flex-direction-nav').hide();



	/* Content Viewer / Lightbox
	======================================================================== */

	$("a[data-rel^='gallery']").prettyPhoto({hook:'data-rel', theme:'pp_andante', deeplinking:false, overlay_gallery:false, social_tools:false});



	/* Fit embedded videos
	======================================================================== */

	function fitVideos(e) {
		$('.object iframe, .object object, .object embed').each(function(){
			var $this = $(this),
				width = $this.parent().width(),
				ratio = $this.width() / $this.height();
			$this.width(width);
			$this.height(width / ratio);
		});
	}

	$(window).on('resize', fitVideos);
	fitVideos(null);



	/* Accordion
	======================================================================== */

	var $accordion_trigger = $('.accordion-trigger'),
		$accordion_content = $('.accordion-content');

	$accordion_trigger.click(function() {
		$accordion_trigger.removeClass('active');
		if($(this).next().is(':hidden') == true) {
			$accordion_content.each(function(index) {
				$(this).slideUp(300); });
			$(this).addClass('active');
			$(this).next().slideDown(300);
		} else{
			$(this).next().slideUp(300);
		}
		return false;
	});

	$accordion_content.hide();
	$('.default-content').trigger('click');



	/* Tabs
	======================================================================== */

	function switch_tabs(obj) {
		$('.tabs a').removeClass("active");
		var $current_tab = $(obj.attr('href'));
		$current_tab.siblings().hide();
		$current_tab.show();
		obj.addClass("active");
	}

	$('.tabs a').click(function(){
		switch_tabs($(this));
		return false;
	});

	switch_tabs($('.default-tab'));



	/* Filterable content
	======================================================================== */

	/* Allows to filter the content by tags in the portfolio pages */
	$('.filter a').click(function() {
		$('.filter .active').removeClass('active');
		$(this).parent().addClass('active');

		var filterVal = $(this).attr('href').replace(' ',' .').replace('#',' .');

		$('.filterable > div').stop().css('opacity', 0).addClass('hidden');

		if(filterVal == " .all") {
			$('.filterable .hidden').animate({opacity:1, avoidCSSTransitions:false, leaveTransforms:false}, 500).removeClass('hidden');
		} else {
			$('.filterable > div').each(function() {
				if ($(this).is(filterVal)) {
					$(this).animate({opacity:1, avoidCSSTransitions:false, leaveTransforms:false}, 500).removeClass('hidden');
				}
			});
		}

		$(window).trigger('resize').trigger('resize');

		return false;
	});



	/* Sticky Footer
	======================================================================== */

	$("#main-footer").stickyFooter();



	/* Thumbnails hover
	======================================================================== */

	/* To set the hover add the parameter data-hover with the CSS class to apply.
	   Example: <a href="#" data-hover="icon-zoom">Link</a> */
	$("a[data-hover]").hover(
		function() {
			var $this = $(this),
				hover_class = $(this).attr('data-hover');

			$this.prepend('<i class="'+hover_class+'" style="display:none"></i>');
			var $icon = $('.'+hover_class, $this);

			var xpos = Math.round(($this.width() / 2) - ($icon.width() / 2)),
				ypos = Math.round(($this.height() / 2) - ($icon.height() / 2));

			$this.css('position', 'relative');

			$icon.css({position:'absolute', top:ypos, left:xpos}).fadeIn(300);
			$('img', $this).stop(false, false).animate({opacity:0.5, avoidCSSTransitions:false, leaveTransforms:false}, 300);
		},
		function() {
			var $this = $(this),
				hover_class = $this.attr('data-hover');
			$('.'+hover_class, $this).remove();
			$('img', $this).stop(false, false).animate({opacity:1, avoidCSSTransitions:false, leaveTransforms:false}, 300);
		}
	);



	/* Ajax contact form
	======================================================================== */

	$("#contact-form").on('click', 'button', function(e) {
		var str = $("#contact-form").serialize(),
			$button = $(this);

		$.ajax({
			type: "POST",
			dataType: 'json',
			url: "php/contact.php",
			data: str,
			beforeSend: function() {
				$('.icon-preload', $button).remove();
				$('<i class="icon-preload" style="margin:-3px 0 -1px 14px;padding:0;"></i>').appendTo($button);
			},
			success: function(response) {
				$('.icon-preload', $button).remove();
				$("#info").ajaxComplete(function(event, request, settings){
					if(response['success'] == true) {
						result = '<div class="success">Thank you for contacting us!</div>';
						// $("#fields").fadeOut(500);
						$("#fields").animate({opacity:0, avoidCSSTransitions:false, leaveTransforms:false}, 500);
					} else {
						result = '<div class="error"><ul>';
						$.each(response['errors'], function(key, val) {
							result += '<li>' + val + '</li>';
							// $('#'+key).addClass('error-field');
						});
						result += '</ul></div>';
					}

					$(this).hide();
					// $(this).html(result).fadeIn(500);
					$(this).html(result).animate({opacity:1, avoidCSSTransitions:false, leaveTransforms:false}, 500);
					$button.css('background-image', 'none')
				});
			}
		});

		e.preventDefault();
	});



	/* Flickr widget
	======================================================================== */

	// Our very special jQuery JSON fucntion call to Flickr, gets details of the most recent 20 images			
	// Replace '24662369@N07' with your Flickr ID.
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?id=24662369@N07&lang=en-us&format=json&jsoncallback=?", displayImages);

	function displayImages(data) {
		// Randomly choose where to start. A random number between 0 and the number of photos we grabbed (20) minus 9 (we are displaying 9 photos).
		var iStart = Math.floor(Math.random()*(11));
		// Reset our counter to 0
		var iCount = 0;
		// Start putting together the HTML string
		var htmlString = "";
		// Now start cycling through our array of Flickr photo details
		$.each(data.items, function(i,item) {
			// Let's only display 9 photos (a 3x3 grid), starting from a random point in the feed					
			if (iCount > iStart && iCount < (iStart + 10)) {
				// I only want the ickle square thumbnails
				var sourceSquare = (item.media.m).replace("_m.jpg", "_s.jpg");
				// Here's where we piece together the HTML
				htmlString += '<a href="' + item.link + '" target="_blank">';
				htmlString += '<img src="' + sourceSquare + '" alt="' + item.title + '" title="' + item.title + '"/>';
				htmlString += '</a>';
			}
			// Increase our counter by 1
			iCount++;
		});
		// Pop our HTML in the #images DIV	
		$('#flickr-feed').html(htmlString + "</ul>");
	}

});