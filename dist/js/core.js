(function ($) {
	$('a[href*="#"]:not([href="#"]):not([href="#!"])').on('click', function (e) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash),
				$root = $('html, body');
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$root.animate({
					scrollTop: target.offset().top - 55
				}, 700);
				// return false;
			}
		}
		e.preventDefault();
	});
	$('a[href="#"]').on('click', function () {
		return false;
	});
	$.fn.prelodr = function (options) {
		// var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this),
				d = $elm.attr('data-delay') ? $elm.attr('data-delay') : 1000;
			$(window).on('load',function () {
				$elm.delay(d).slideUp(300);
			});
		});
	};
	$.fn.slideNav = function (options) {
		// var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this),
				$ol =  $('<div />', {class: 'nav-overlay'});
			function slideIn() {
				$($elm.attr('data-target')).addClass('open');
				$('body').addClass('no-scroll');
				$ol.insertAfter($elm.attr('data-target'));
				if ($($elm.attr('data-target')).hasClass('below-nav')) {
					$ol.addClass('below-nav');
				}
			}
			function slideOut() {
				$($elm.attr('data-target')).removeClass('open');
				$('body').removeClass('no-scroll');
				$('.nav-overlay').remove();
			}
			$elm.on('click', function (e) {
				e.stopPropagation();
				if ($($elm.attr('data-target')).hasClass('open')) {
					slideOut();
				} else {
					slideIn();
				}
			});
			$('body, html, a:not([class*="dropdown"])').on('click', function (e) {
				if (!$(e.target).is($elm)) {
					slideOut();
				}
			});
		});
	};
	$.fn.dropdown = function (options) {
		var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this);
			function togDrop() {
				$($elm.attr('data-target')).slideToggle(200);
				$elm.toggleClass('active');
			}
			function closeDrop() {
				$($elm.attr('data-target')).slideUp(200);
				$elm.removeClass('active');
			}
			$elm.on('click', function (e) {
				$('body, html, a, button').on('click', function (e) {
					$elm.each(function () {
						if (!$(e.target).is(this)) {
							closeDrop();
						}
					});
				});
				togDrop();
				e.stopPropagation();
			});
		});
	};
	$.fn.accordion = function (options) {
		var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this);
			function togAc() {
				$($elm.attr('data-target')).slideToggle(300);
				$elm.toggleClass('active');
			}
			function closeAc() {
				$($elm.attr('data-target')).slideUp(300);
				$elm.removeClass('active');
			}
			$elm.on('click', function (e) {
				$('a.accordion-toggle').on('click', function (e) {
					$elm.each(function () {
						if (!$(e.target).is(this)) {
							closeAc();
						}
					});
				});
				togAc();
				e.stopPropagation();
			});
		});
	};
	$.fn.parallax = function (options) {
		var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this),
				speed = $elm.attr('data-speed') ? $elm.attr('data-speed') : 1.5,
				scale = $elm.attr('data-scale') ? $elm.attr('data-scale') : 1;
			function updateParallax(initial) {
				var $img = $elm.children('img').first(),
					ch = $elm.height(),
					dt = $elm.offset().top,
					db = dt + ch,
					st = $(window).scrollTop(),
					wh = window.innerHeight,
					sp = speed,
					scl = scale,
					wb = st + wh;
				if (initial) {
					$img.css('display', 'block');
				}
				if (dt < wb) {
					var parallax = Math.round((st - dt) / sp + 28),
                        trans = 'translate3d(-50%,' + parallax + 'px, 0) scale(' + scl + ')';
				}
				$img.css({'transform': trans});
			}
			$elm.children('img').one('load', function () {
				updateParallax(true);
			}).each(function () {
				if (this.complete) {
					$(this).trigger('load');
                }
			});
			$(window).scroll(function () {
				updateParallax(false);
			});
		});
	};
	$.fn.dialog = function (options) {
		var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this);
			var swidth = (window.innerWidth - $(window).width()),
				nswidth = swidth * (-1);
			function showDialog() {
				$($elm.attr('data-target')).delay(200).show().css('overflow-y', 'scroll');
				$('body').css({'overflow': 'hidden', 'padding-right' : swidth });
				$('nav').css({'padding-left' : swidth, 'left' : nswidth });
			}
			function hideDialog() {
				$($elm.attr('data-target')).css('overflow-y', 'hidden').delay(200).hide();
				$('body').css({'overflow': '', 'padding-right' : 0 });
				$('nav').css({'padding-left' : 0, 'left' : 0 });
			}
			$elm.on('click', function (e) {
				e.preventDefault();
				showDialog();
				e.stopPropagation();
			});
			$('.dialog-close').on('click', function () {
				$elm.each(function (em) {
					hideDialog();
				});
			});
		});
	};
	$.fn.imgbox = function (options) {
		var settings = $.extend({}, options);
		return this.each(function () {
			var $elm = $(this);
			function showImg(img, cap) {
				var $img = img,
					$cap = cap,
					imgbox = $('<div />', {class: 'imgbox'});
				
				imgbox.appendTo('body');
				imgbox.append($img, $cap);

				$('body').css('overflow', 'hidden');
				imgbox.show();
			}

			function hideImg() {
				$('.imgbox').remove();
				$('body').css('overflow', '');
			}

			function removeold() {
				$('.imgbox').remove();
			}

			$elm.on('click', function (e) {
				var $isrc = $(this).attr('src'),
					alt = $(this).attr('alt'),
					image = $('<img/>', {src: $isrc}),
					cap = '';

				if (alt){
					cap = $('<span/>').html(alt);
				}
				removeold();
				showImg(image, cap);
			});
			$('body').click(function (e) {
				if ($(e.target).is($('.imgbox, .imgbox img'))) {
					hideImg();
				}
			});
		});
	};
	$.fn.snackbar = function (options) {
		var settings = $.extend({}, options);

		return this.each(function () {
			var $elm = $(this);
			
			function showsnackbar(msg, tout, actn, callfun, theme) {
				var snackbar = $('<div />', { class: 'snackbar hide'}),
					snackbarmsg = $('<span />');
				
				$(snackbar).appendTo('body').fadeIn().removeClass('hide').css('display', '');
				$(snackbarmsg).appendTo(snackbar).html(msg);
				
				if (theme) {
					$(snackbar).addClass(theme);
				}

				if (actn) {
					var snackbaractn = $('<button />', {class: 'btn-flat action'});

					$(snackbaractn).appendTo(snackbar).html(actn);
					
					if (callfun) {
						$(snackbaractn).attr('onclick', callfun);
					}
					
					$(snackbaractn).on('click', function () {
						$(this).parent().fadeOut(500, function () {
							$(this).remove();
						});
					});
				} else {
					$(snackbar).delay(tout).fadeOut(500, function () {
						$(this).remove();
					});
				}
			}

			function removeold() {
				$('.snackbar').remove();
			}

			$elm.on('click', function (e) {
				var msg = $(this).attr('data-message'),
					tout = $(this).attr('data-timeout') ? $elm.attr('data-timeout') : 3000,
					actn = $(this).attr('data-action'),
					callfun = $(this).attr('data-callback'),
					theme = $(this).attr('data-theme');
				
				removeold();
				showsnackbar(msg, tout, actn, callfun, theme);
			});
		});
	};

}(jQuery));

jQuery(document).ready(function($){
	$('.preloadback').prelodr();
	$('.collapse-button').slideNav();
	$('.dropdown').dropdown();
	$('.accordion-toggle').accordion();
	$('.parallax').parallax();
	$('.dialog-view').dialog();
	$('.img-view').imgbox();
	$('.show-snackbar').snackbar();
});


function alertME (msg) {
	event.preventDefault();

	$('#alrt-dialog').remove();
	
	var alert = $('<div/>', { class: 'dialog', id: 'alrt-dialog', role: 'dialog', tabindex: '-1' });
	var alertDialog = $('<div/>', { class: 'dialog-box alert-box', role: 'document' });
	var alertContent = $('<div/>', { class: 'dialog-content' });
	var alertTitle = $('<h4 />', {class: 'dialog-title'});
	var alertBody = $('<p/>', { class: 'modal-body' });

	var alertFooter = $('<div/>', { class: 'dialog-action right-align' });
	var alertActn = $('<input/>', { class: 'btn btn-flat ripples dialog-close', type: 'button', value: 'Close' });

	alertTitle.html('Alert!');
	alertBody.html(msg);

	alert.appendTo('body');
	alertDialog.appendTo(alert);
	alertContent.appendTo(alertDialog);
	alertTitle.appendTo(alertContent);
	alertBody.appendTo(alertContent);
	alertFooter.appendTo(alertDialog);
	alertActn.appendTo(alertFooter);

	alert.show();

	$(alert.find('.dialog-close')).on('click', function () {
		$('#alrt-dialog').remove();
	});
};