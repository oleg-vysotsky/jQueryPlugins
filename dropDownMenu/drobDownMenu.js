(function($){
	$.fn.drobDownMenu = function(User_Settings){

		var Button = this;



		var Default_Settings = {                      /* Настройки по-умолчанию */
			menu_block:'<div class="Menu"></div>',
			height_menu:4                              /* Высотка выпадающего меню соответственно по количеству пунктов */


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

			Button.find('.Menu').css('border-width','0px');

		});


		Button.click(function(){

			var Height_Li = Button.find('li').outerHeight();

			if(Button.find('.Menu').css('height') == '0px'){


				Button.find('.Menu').css({'height':(Height_Li * Settings.height_menu) + 'px',
				'border-width':'','border-top-width':'0px'});
			}else{
				Button.find('.Menu').css({'height':'0px', 'border-width':'0px'});
			}

			return false;

		});


		Button.find('.Menu li').click(function () {

			Button.find('span, p, h').text($(this).text());


		});

		$('body, html').click(function(){


			if(Button.find('.Menu').css('height') > '0px'){
				Button.find('.Menu').css({'height':'0px','border-width':'0px' });

				return false;
			}


		});


	}

})(jQuery);
