//== Class Definition
var SnippetLogin = function() {

    var login = $('#m_login');

    var showErrorMsg = function(form, type, msg) {
        var alert = $('<div class="m-alert m-alert--outline alert alert-' + type + ' alert-dismissible" role="alert">\
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>\
            <span></span>\
        </div>');

        form.find('.alert').remove();
        alert.prependTo(form);
        //alert.animateClass('fadeIn animated');
        alert.find('span').html(msg);
    }

    //== Private Functions

    var displaySignUpForm = function() {
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signin');

        login.addClass('m-login--signup');
        login.find('.m-login__signup').animateClass('flipInX animated');
    }

    var displaySignInForm = function() {
        login.removeClass('m-login--forget-password');
        login.removeClass('m-login--signup');

        login.addClass('m-login--signin');
        login.find('.m-login__signin').animateClass('flipInX animated');
    }

    var displayForgetPasswordForm = function() {
        login.removeClass('m-login--signin');
        login.removeClass('m-login--signup');

        login.addClass('m-login--forget-password');
        login.find('.m-login__forget-password').animateClass('flipInX animated');
    }

    var handleFormSwitch = function() {
        $('#m_login_forget_password').click(function(e) {
            e.preventDefault();
            displayForgetPasswordForm();
        });

        $('#m_login_forget_password_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });

        $('#m_login_signup').click(function(e) {
            e.preventDefault();
            displaySignUpForm();
        });

        $('#m_login_signup_cancel').click(function(e) {
            e.preventDefault();
            displaySignInForm();
        });
    }

    var handleSignInFormSubmit = function() {
        $('#m_login_signin_submit').click(function(e) {
            e.preventDefault();
            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }
            var fdata = form.serialize();
            //console.log(fdata);
            //console.log(); return;
            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);
            $.ajax({
                type: "POST",
                cache: false,
                url:form.attr("action"),
                dataType: "json",
                data: fdata,
                headers    :    {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                success:function(res){
                    //console.log(res);
                    if(res.flag == true){
                        window.location.href=site_url+'/dashboard';
                    }else {
                        btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                        showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');

                    }
                  
                }
            });
            /*form.ajaxSubmit({
                url: site_url+'/user/dologin',

                success: function(response, status, xhr, $form) {
                    // similate 2s delay
                    console.log(response);
                    setTimeout(function() {
                        btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                        showErrorMsg(form, 'danger', 'Incorrect username or password. Please try again.');
                    }, 2000);
                }
            });*/
        });
    }

    var handleSignUpFormSubmit = function() {
        $('#m_login_signup_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    first_name: {
                        required: true
                    },
                    last_name: {
                        required: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 10
                    },
                    rpassword: {
                        required: true,
                        equalTo: '#spassword'
                    },
                    agree: {
                        required: true
                    }
                }
            });

            if (!form.valid()) {
                return;
            }

            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            form.ajaxSubmit({
                url: $(form).attr("action"),
                dataType: "json",
                success: function(res, status, xhr, $form) {
                    // similate 2s delay
                    setTimeout(function() {
                        btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                        console.log(res);
                        if(res.flag == true){
                            window.location.href=res.redirect ;
                        }else {
                            btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false);
                            showErrorMsg(form, 'danger', res.msg);
                        }

                        
                    }, 2000);
                }
            });
        });
    }

    var handleForgetPasswordFormSubmit = function() {
        $('#m_login_forget_password_submit').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    email: {
                        required: true,
                        email: true
                    }
                }
            });


            if (!form.valid()) {
                return;
            }
            

            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);

            form.ajaxSubmit({
                url: site_url+"/user/send-token",
                headers    :    {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(res, status, xhr, $form) {
                    if(res.flag == true){
                        
                        form.clearForm(); // clear form
                        form.validate().resetForm(); // reset validation states
                        $(".email-exist").show();
                        //$(".m-login__forget-password").hide();
                    }else {
                        form.clearForm(); // clear form
                        form.validate().resetForm(); // reset validation states
                        $(".email-exist").show();
                        //$('#forgot_token_error').show();
                        //$('#forgot_token_error span').text(res.msg);
                    }
                    btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false); // remove 
                    
                }
            });
            return false;
        });
        $('#m_login_token_validate').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            form.validate({
                rules: {
                    token: {
                        required: true
                    }
                }
            });


            if (!form.valid()) {
                return;
            }
            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);
            
            form.ajaxSubmit({
                url: $(form).attr("action"),
                headers    :    {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                success: function(response, status, xhr, $form) {
                    res = JSON.parse(response);
                    if(res.flag == true){
                        form.clearForm(); // clear form
                        form.validate().resetForm(); // reset validation states
                        $(".forget_token").hide();
                        $(".reset_password").show();
                    }else {
                        $('.error_row_2').show();
                        $('.error_row_2 span').text(res.msg);
                    }
                    btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false); // remove 
                    
                }
            });
            return false;
        });
        $('#m_login_reset_password').click(function(e) {
            e.preventDefault();

            var btn = $(this);
            var form = $(this).closest('form');

            if($(".reset-paassword #password2").val() == "" || $(".reset-paassword #password1").val() == "") {
                $(".reset-paassword #error").html("<span>Both fields are required.</span>");
                $(".reset-paassword #error").show();
                return;
            }

            
            if($(".reset-paassword #password2").val() != $(".reset-paassword #password1").val()) {
                $(".reset-paassword #error").html("<span>Password and Re-Type Password did not match</span>");
                $(".reset-paassword #error").show();
                return;
            }
            $(".reset-paassword #error").hide();
            form.validate({
                rules: {
                    token: {
                        required: true
                    },
                    password1: {
                        required: true
                    },
                    password2: {
                        required: true
                    }
                }
            });


            if (!form.valid()) {
                return;
            }
            btn.addClass('m-loader m-loader--right m-loader--light').attr('disabled', true);
            var fdata = form.serialize();
            form.ajaxSubmit({
                url:form.attr("action"),
                dataType: "json",
                data: fdata,
                cache: false,
                type: "POST",
                headers    :    {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                success: function(response, status, xhr, $form) {
                    //res = JSON.parse(response);
                    res = response;
                    if(res.flag == true){
                        form.clearForm(); // clear form
                        form.validate().resetForm(); // reset validation states
                        window.location.href = res.redirect;
                    }else {
                        $('.error_row_3').show();
                        $('.error_row_3 span').text(res.msg);
                    }
                    btn.removeClass('m-loader m-loader--right m-loader--light').attr('disabled', false); // remove 
                    
                }
            });
            return false;
        });
        //
    }

    //== Public Functions
    return {
        // public functions
        init: function() {
            handleFormSwitch();
            handleSignInFormSubmit();
            handleSignUpFormSubmit();
            handleForgetPasswordFormSubmit();
        }
    };
}();

//== Class Initialization
jQuery(document).ready(function() {
    SnippetLogin.init();
});