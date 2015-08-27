(function($){
	$.fn.drobDownMenu = function(User_Settings){

		var Button = this;



		var Default_Settings = {                      /* Настройки по-умолчанию */
			menu_block:'<div class="Menu"></div>',
			height_menu:4,
			border_width:1,
			border_style:'solid',
			border_color:'black'

		};

		var Settings = $.extend(                     /* Соединеие настроек по-умолчанию и пользовательских, если они есть */
			Default_Settings,User_Settings
		);

		$.each(Button, function(){                 /* Формирование html блока для каждого input */
			Button.append(Settings.menu_block);


			$.each(User_Settings.items,function(){

				Button.find('.Menu').append('<li>' + this + '</li>');

			});



			var Height_Button = Button.outerHeight();
			Button.find('.Menu').css('top',Height_Button - 1);


		});


		Button.click(function(){

			var Height_Li = Button.find('li').outerHeight();
			console.log(Height_Li);
			if(Button.find('.Menu').css('height') == '0px'){


				Button.find('.Menu').css({'height':(Height_Li * Settings.height_menu) + 'px',
				'border-width':Settings.border_width + 'px','border-top-width':'0px',
				'border-style':Settings.border_style, 'border-color':Settings.border_color});
			}else{
				Button.find('.Menu').css({'height':'0px', 'border-width':'0px'});
			}

			return false;

		});




		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  Room Options
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//function Room_Options() {
		//	var Room_Option = $('.Room-Option');
		//	var Room_Button = $('.Option-1');
		//	var One_Room_Option = $('.Room-Option ul li');
		//	Room_Button.click(function () {
		//		if ($(Room_Option, this).css('height') == '0px') {
		//			$(this).css({'border-bottom-left-radius': '0px', 'border-bottom-right-radius': '0px'});
		//
		//			var Num_Li_Room = $(this).find('.Room-Option ul li').size();
		//			var Height_Li_Room = $(this).find('.Room-Option ul li').outerHeight();
		//
		//			if(Num_Li_Room == 1){
		//				Room_Option.css({
		//					'height':     (Height_Li_Room + 'px'), 'border': '1px', 'border-style': 'solid', 'border-color': '#e9e9e9',
		//					'border-top': '0px'
		//				});
		//			}
		//			if(Num_Li_Room == 2){
		//				Room_Option.css({
		//					'height':     ((Height_Li_Room*2) + 'px'), 'border': '1px', 'border-style': 'solid', 'border-color': '#e9e9e9',
		//					'border-top': '0px'
		//				});
		//			}
		//			if(Num_Li_Room >= 3){
		//				Room_Option.css({
		//					'height':     ((Height_Li_Room*3) + 'px'), 'border': '1px', 'border-style': 'solid', 'border-color': '#e9e9e9',
		//					'border-top': '0px'
		//				});
		//			}
		//
		//
		//			if($('.Food-Option').css('height') > '0px' || $('.Number-rooms').css('height') > '0px'){
		//				$('.Food-Option, .Number-rooms').css({'height':'0px','border-bottom': '0px','border-bottom-left-radius': '', 'border-bottom-right-radius': ''});
		//
		//			}
		//
		//
		//
		//		} else {
		//			$(Room_Option, this).css({'height': '0px', 'border-bottom': '0px'});
		//			$(this).css({'border-bottom-left-radius': '', 'border-bottom-right-radius': ''});
		//
		//		}
		//		return false;
		//	});
		//
		//
		//
		//	One_Room_Option.click(function () {
		//
		//		$(this).parents('.Option-1').find('span').text($(this).text());
		//		$(this).parents('.Room-Option').find('input[name=room_option]').val($(this).text());
		//		$(this).parents('.Room-Option').find('input[name=room_option]').attr('data-val', $(this).index());
		//
		//
		//		One_Room_Option.removeClass('Selected-Room-Option');
		//		$(this).addClass('Selected-Room-Option');
		//
		//
		//		Room_Option.css({'height': '0px', 'border-bottom': '0px'});
		//		$('.Option-1').addClass('Data-Filled');
		//
		//		Count_Total_Price();
		//		return false;
		//	});
		//
		//	$('body,html').click(function () {
		//		if (Room_Option.css('height') > '0px') {
		//			Room_Option.css({'height': '0px', 'border-bottom': '0px'});
		//		}
		//	});
		//}



	}

})(jQuery);
