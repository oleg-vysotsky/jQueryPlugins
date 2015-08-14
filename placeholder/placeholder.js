(function($){
	$.fn.placeholder = function (User_Settings){           /* Функция jQuery */
		var Input = this;     /* Переменная Input по-умолчанию кнопка, по которой кликаем */

		var Default_Settings = {                      /* Настройки по-умолчанию */
			label_class:'Label-Placeholder',
			wrap_block:'<div class="Input-Wrapper"></div>',
			animate:'animate'
		};

		var Settings = $.extend(                     /* Соединеие настроек по-умолчанию и пользовательских, если они есть */
			Default_Settings,User_Settings
		);

		$.each(Input, function(){                 /* Формирование html блока для каждого input */
			$(this).wrap(Settings.wrap_block).after('<label class="' + Settings.label_class + '"' + ' for ="'+ $(this).attr('id') + '">' + $(this).attr('placeholder') + '</label>');
		});

		$(Input).removeAttr('placeholder');   /* удаление атрибута placeholder у input */

		$(Input).focus(function () {          /* Действие при нажатии на input */
			var Label = $('+.' + Settings.label_class, this);

			switch (Settings.animate){
				case 'fade':{ Label.fadeOut(200); break;}
				case 'animate': {Label.animate({left:'-100px'},200).fadeOut(10); break;}
				default :{ Label.css('display', 'none'); break;}
			}

		});

		$(Input).blur(function () {      /* Действие при нажатии не на input */
			if (!$(this).val().length) {

				var Label = $('+.' + Settings.label_class, this);

				switch (Settings.animate){
					case 'fade':{ Label.fadeIn(200); break;}
					case 'animate': {Label.fadeIn(10).animate({left:'3px'},200); break;}
					default :{ Label.css('display', 'block'); break;}
				}

			}
		});


	}

})(jQuery);



