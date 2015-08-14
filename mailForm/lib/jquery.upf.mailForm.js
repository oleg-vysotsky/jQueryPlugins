/*!
 * jQuery.upf.form
 * Copyright (c) 2015 Oleg Vysotskyi - olegblud@gmail.com | http://olegblud.com/
 * Licensed under MIT
 * http://olegblud.com/blog/pagenav
 * @projectDescription Make navigation on one-page website.
 * @author Oleg Vysotskyi
 * @version 1.0
 */



/**
 * QUICK START
 *
 * add jquery <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
 * and download and add <script src="/js/jquery.form.js"></script> before closed tag </body>
 *
 * Set
 * add class Data-Form - to activate any tag like form, or change it in settings
 * data-form-mailto-admin='admin@yourserver.com'
 * data-form-subject='Letter Title' - to set letter title
 * data-form-message-to-client='true' - set to used element
 * data-field-title='Name Of Each Field' - If you don't set it - placeholder will used.
 *
 * Validation:
 * .Data-Form-Validate-Email - set class to validate email
 */

(function ($) {
    /*** Settings ***/
    var Settings = {
        /*** Main ***/
        Mail_To:       'olegblud@gmail.com', // Used if you don't use data-form-mailto-admin
        Rebind_Events: true, // If you want to use Life Event


        /*** Data Form ***/
        Data_Form:             '.Data-Form',
        Data_Form_Button:      '.Data-Form-Button',
        Data_Form_Client_Mail: '.Data-Form-Client-Mail',
        Data_Form_Subject:     'Сообщение',// Used if you don't set data-form-subject

        /*** Popup ***/
        Auto_Hide_Popup_Window:      false, // If you want to use Life Event
        Auto_Hide_Popup_Window_Time: 3000, // If you want to use Life Event
        Popup_Form:                  'Data-Form-Popup',
        Popup_Form_Content:          'Data-Form-Popup-Content',
        Popup_Form_Close:            'Data-Form-Popup-Close',

        /*** Validation ***/
        Message_Validation_Error: 'Ошибка валидации! Проверьте правильность введенных данных!',

        /*** Messages ***/
        Message_To_Client:        'Спасибо за заявку. В ближайшее время с Вами свяжутся!',
        Message_Error_Sending:    'Ошибка отправки формы. Повторите отправку или попробуйте позжже.',
        Data_Form_Validate_Email: '.Data-Form-Validate-Email',

        /*** Path ***/
        Mailer_Path: '/js/jquery.upf.form.php'
    };

    $(document).ready(function () {
        if (Settings.Rebind_Events == true) {
            $(document).bind("DOMSubtreeModified", Settings, Add_Form);
        } else {
            Add_Form(Settings);
        }


        //Add_Form(Settings);
        function Add_Form(Settings_Or_Event) {
            var Settings = Set_Settings(Settings_Or_Event);


            /*** Each Selected Form ***/
            $(Settings.Data_Form).each(function () {

                /*** Rebind Events ***/
                if (Settings.Rebind_Events == true) {
                    $(Settings.Data_Form_Button, this).unbind('click');
                }

                /*** Bind Events ***/
                $(Settings.Data_Form_Button, this).bind('click', Settings, function () {

					console.log(1);

                    var Settings = Set_Settings(Settings_Or_Event);
                    var This_Form = $(this).parents(Settings.Data_Form);

                    /*** Formation Message To Client ***/
                    Settings.Data_Form_Subject =
                        $(This_Form).attr('data-form-subject') ? $(This_Form).attr('data-form-subject') :
                            Settings.Data_Form_Subject;
                    var Message_To_Admin = '<html><head><title>' + Settings.Data_Form_Subject + '</title></head>';
                    $('input,textarea', This_Form).each(function () {
                        var Field_Title = $(this).attr('data-form-field-title') ?
                            $(this).attr('data-form-field-title') : $(this).attr('placeholder');
                        var Field_Value = $(this).val();
                        Message_To_Admin += '<p>' + Field_Title + ': ' + Field_Value + '</p>';
                    });

                    Message_To_Admin += '</html>';

                    /*** Formation POST Query ***/
                    var Query = {
                        mailto_admin:      $(This_Form).attr('data-form-mailto-admin') ?
                            $(This_Form).attr('data-form-mailto-admin') : Settings.Mail_To,
                        maillto_client:    $(Settings.Data_Form_Client_Mail, this).val() ?
                            $(Settings.Data_Form_Client_Mail, this).val() : false,
                        message_to_admin:  Message_To_Admin,
                        message_to_client: $(This_Form).attr('data-form-massage-to-client') ?
                            $(This_Form).attr('data-form-massage-to-client') : Settings.Message_To_Client,
                        subject:           Settings.Data_Form_Subject,
                    };

                    console.log(Query.mailto_admin);
                    /*** Validation ***/
                    var Valid = true;
                    var ValidateEmail =
                            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if ($(Settings.Data_Form_Validate_Email, This_Form).length > 0 &&
                        !ValidateEmail.test($(Settings.Data_Form_Validate_Email, This_Form).val())) {
                        Valid = false;
                    }
                    $('input,textarea', This_Form).each(function () {
                        if (!$(this).val()) {
                            Valid = false;
                        }
                    });

                    if (!Valid) {
                        Validation_Error();
                        return false;
                    }

                    /*** Ajax Message ***/
                    $.ajax({
                        url:      Settings.Mailer_Path,
                        type:     'POST',
                        data:     Query,
                        success:  function (Data) {
                            Popup_Window(Data);
                            Clear_Fields(This_Form);
                        }, error: function () {
                            Popup_Window(Settings.Message_Error_Sending);
                        }
                    });
                    return false;
                });
            });
        }

        /*** Helpers: Validation Error ***/
        function Validation_Error() {
            Popup_Window(Settings.Message_Validation_Error);
        }

        /*** Helpers: Set Variable Settings ***/
        function Set_Settings(Settings_Or_Event) {
            if (Settings_Or_Event.data) {
                return Settings_Or_Event.data;
            } else {
                return Settings_Or_Event;
            }
        }

        /*** Helpers: Popup Window ***/
        function Popup_Window(Message) {
            var Content = '<div class="' + Settings.Popup_Form + '"><div class="' + Settings.Popup_Form_Content +
                '">' + Message + '</div><div class="' + Settings.Popup_Form_Close + '">&times;</div></div>';
            $('body').append(Content);
            $('.' + Settings.Popup_Form_Close).click(function () {
                $('.' + Settings.Popup_Form).fadeOut(400);
            });
            if (Settings.Auto_Hide_Popup_Window == true) {
                $('.' +
                Settings.Popup_Form).delay(Settings.Auto_Hide_Popup_Window_Time).fadeOut(400).queue(function () {
                    $(this).remove();
                });
            }
        }

        /*** Clear Fields ***/
        function Clear_Fields(This_Form) {
            $('input[type=text],textarea', This_Form).val('');
        }

    });
})(jQuery);
