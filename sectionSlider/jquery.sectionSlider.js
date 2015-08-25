(function ($) {
	$.fn.sectionSlider = function (User_Settings) {

		// Set Settings
		var Slider = this;
		var Default_Settings = {
			'Height':   'window', // window, auto
			'Effect':   'fade', // none, fade, slide, vertical_slide, corner_slide
			'Duration': 444
		};
		var Settings = $.extend(Default_Settings, User_Settings);

		// Set Height
		function SetSectionHeight() {
			$(Slider).css('height', $('.Section-Slider-Item.Active', Slider).actual('outerHeight') + 'px');
		}

		// Set Window
		function SetWindowHeight() {
			$(Slider).css('height', $(window).height() + 'px');
		}

		if (Settings.Height == 'auto') {
			SetSectionHeight();
			$(window).resize(function () {
				SetSectionHeight();
			});
		} else if (Settings.Height == 'window') {
			SetWindowHeight();
			$(window).resize(function () {
				SetWindowHeight();
			});
		}

		// Activate
		$('.Section-Slider-Item', Slider).css('display', 'none');
		$('.Section-Slider-Item.Active', Slider).css('display', 'block');

		// Change Slide
		var Count_Slides = $('.Section-Slider-Item', Slider).length;


		// Next Slide
		$('.Section-Slider-Next', Slider).click(function () {
			var Current_Slide = $('.Section-Slider-Item.Active', Slider).index();
			if (Current_Slide < Count_Slides - 1) {
				Current_Slide++;
			} else {
				Current_Slide = 0;
			}
			Slide_Effect(Current_Slide, 'right');
		});


		// Prev Slide
		$('.Section-Slider-Previous', Slider).click(function () {
			var Current_Slide = $('.Section-Slider-Item.Active', Slider).index();
			if (Current_Slide == 0) {
				Current_Slide = Count_Slides - 1;
			} else {
				Current_Slide--;
			}
			Slide_Effect(Current_Slide, 'left');
		});

		// Button Slide
		$('.Section-Slider-Button', Slider).click(function () {
			var Current_Slide = $(this).index();
			Slide_Effect(Current_Slide);
		});


		// Slide Effect
		function Slide_Effect(Current_Slide, Direction) {
			var Items = $('.Section-Slider-Item', Slider);
			var Buttons = $('.Section-Slider-Button', Slider);

			// Change Active
			$(Buttons.removeClass('Active')[Current_Slide]).addClass('Active');


			$(Items.removeClass('Active')[Current_Slide]).addClass('Active');

			Items.removeClass('Active');
			$(Items.removeClass('Active')[Current_Slide]).addClass('Active');

			// Effect
			if (Settings.Effect == 'fade') {
				Items.fadeOut(Settings.Duration);
				$(Items[Current_Slide]).fadeIn(Settings.Duration);
			} else if (Settings.Effect == 'slide') {
				if (Direction == 'right') {
					Items.not(Items[Current_Slide]).animate({'left': $(window).width() + 'px'}, Settings.Duration);
					$(Items[Current_Slide]).css({
						'left': '-' + $(window).width() + 'px', 'display': 'block'
					}).animate({'left': 0}, Settings.Duration);
				} else {
					Items.not(Items[Current_Slide]).animate({
						'left': '-' + $(window).width() + 'px'
					}, Settings.Duration);
					$(Items[Current_Slide]).css({
						'left': $(window).width() + 'px', 'display': 'block'
					}).animate({'left': 0}, Settings.Duration);
				}
			} else if (Settings.Effect == 'corner_slide') {

				if (Direction == 'right') {
					Items.not(Items[Current_Slide]).animate({
						'left': $(window).width() + 'px', 'top': $(window).height()
					}, Settings.Duration);
					$(Items[Current_Slide]).css({
						'left':    '-' + $(window).width() + 'px', 'top': '-' + $(window).height() + 'px',
						'display': 'block'
					}).animate({'left': 0, 'top': '0'}, Settings.Duration);
				} else {
					Items.not(Items[Current_Slide]).animate({
						'left': '-' + $(window).width() + 'px', 'top': '-' + $(window).height() + 'px'
					}, Settings.Duration);
					$(Items[Current_Slide]).css({
						'left': $(window).width() + 'px', 'top': $(window).height() + 'px', 'display': 'block'
					}).animate({'left': 0, 'top': '0'}, Settings.Duration);
				}

			} else if (Settings.Effect == 'vertical_slide') {
				Items.not(Items[Current_Slide]).slideUp(Settings.Duration);
				$(Items[Current_Slide]).slideDown(Settings.Duration);
			} else {
				Items.css('display', 'none');
				$(Items[Current_Slide]).css('display', 'block');
			}

		}


	}
})(jQuery);



