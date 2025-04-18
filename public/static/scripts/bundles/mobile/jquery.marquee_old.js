/**
 * jQuery.marquee - scrolling text horizontally
 * Date: 11/01/2013
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://www.aamirafridi.com
 * @version 1.0
 */

/**
 * Forked by Ignacio El Kadre - imefisto(at)gmail(dot)com
 * Added: stop method for pause/resume
 * Changed structure to match with the proposed at http://docs.jquery.com/Plugins/Authoring 
 */

;(function($) {
	var methods = {
		init: function(options){
			return this.each(function(){
				var $this = $(this),
				$marqueeWrapper,
				elWidth;

				var settings = $this.data('marquee');
				if(typeof settings == 'undefined'){
					var defaults = {
						//speed in milliseconds of the marquee
						speed: 10000,
						//gap in pixels between the tickers
						gap: 20,
						//gap in pixels between the tickers
						delayBeforeStart: 1000,
						//'left' or 'right'
						direction: 'left',
            // pause in milliseconds before restart
            postAnimationPause: 0
					};
					// Extend the options if any provided
					settings = $.extend({},defaults, options);
					$this.data('marquee',settings);
				}else{
					// Extend the options if any provided
					settings = $.extend({},settings,options);
				}

				//wrap inner content into a div
				$this.wrapInner('<div class="js-marquee"></div>');

				//Make copy of the element
				$this.find('.js-marquee').css({
					'margin-right': settings.gap, 
					'float':'left'
				}).clone().appendTo($this);

				//wrap both inner elements into one div
				$this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');
				elWidth = $this.find('.js-marquee:first').width() + settings.gap,
				settings.elWidth = elWidth;

				$this.data('marquee',settings);

				setTimeout(function(){
				$this.marquee('zero');
				$this.marquee('start');},settings.delayBeforeStart);
			});

		},
		get: function(options){
			return $(this).find('.js-marquee-wrapper');
		},
		destroy: function(options){
			return $(this).each(function(){
				$(this).removeData('marquee');
			});
		},
		start: function(options){
			$this = $(this);
			var settings = $this.data('marquee');

			//Save the reference of the wrapper
			$el = $this.marquee('get');
			//$el = $this.find('.js-marquee-wrapper');
			animateMarquee($el,settings);
		},
		stop: function(options){
			var $el = $(this).find('.js-marquee-wrapper');
			$el.clearQueue();
			$el.stop();
		},
		reset: function(options){
			$this = $(this);
			$this.marquee('stop');
			$this.marquee('zero');
			$this.marquee('start');
		},
		revert: function(options){
			$this = $(this);
			var settings = $this.data('marquee');
			settings.direction = settings.direction == 'left' ? 'right' : 'left';
			$this.marquee('stop');
			$this.marquee('start');
		},
		zero: function(options){
			//Move to zero possition
			$this = $(this);
			var $el = $this.marquee('get'),
			settings = $this.data('marquee');
			$el.css('margin-left', settings.direction == 'left' ? 0 : '-' + settings.elWidth + 'px');
		}
	}
	//Animate recursive method
	var animateMarquee = function($elem,settings) {
		//Save the width of the each element so we can use it in animation
		var elWidth = settings.elWidth ? settings.elWidth : $this.find('.js-marquee:first').width() + settings.gap,
		despl = settings.direction == 'left' ? elWidth + parseInt($elem.css('margin-left')) : -1*parseInt($elem.css('margin-left')),
		diff_perc = despl / elWidth;
		diff_perc = diff_perc > 0 ? diff_perc : 1;

		//Start animating 
		$elem.animate({
			'margin-left': settings.direction == 'left' ? '-' + elWidth + 'px' : 0
		},
		(settings.speed*diff_perc), 
		'linear',
		function(){
			//Move to zero possition
      $elem.css('margin-left', settings.direction == 'left' ? 0 : '-' + elWidth + 'px');

      setTimeout(function() {
        animateMarquee($elem,settings)
      }, settings.postAnimationPause);
		});
	};

	$.fn.marquee = function(method){
		// Method calling logic
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.marquee');
		}
	};

})(jQuery);
