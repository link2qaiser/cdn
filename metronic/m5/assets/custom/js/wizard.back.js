//== Class definition
var WizardDemo = function () {
    //== Base elements
    var wizardEl = $('#m_wizard');
    var formEl = $('#m_form_wiz');
    var validator;
    var wizard;
    
    //== Private functions
    var initWizard = function () {
        //== Initialize form wizard
        wizard = wizardEl.mWizard({
            startStep: 1
        });

        //== Validation before going to next page
        wizard.on('beforeNext', function(wizard) {
            
            
            
            if(
                ($("#listing_type").val() == "" ||
                $("#property_type").val() == "" || 
                $("#ListingAgreement").val() == "" ) &&
                wizard.currentStep == 1)
            {

                $("#createListingAlert").show().find('span').html(' All fields are required');
                return false;
            }

            if(listing.validateCreateListingForm("#m_form") == false && wizard.currentStep == 2){
                return false;
            }
            id = $("#__id").val();
            console.log(id);
            if(wizard.currentStep == 2 && id == '0') {
                console.log("not saved");
                $("#createListingAlert").show().find('span').html('You must save draft before upload photos');
                return false;
            }
           
            /*if (validator.form() !== true) {
                return false;  // don't go to the next step
            }*/
        })

        //== Change event
        wizard.on('change', function(wizard) {
            if(wizard.currentStep > 1) 
                $("#clSaveDraft").show();
            else 
                $("#clSaveDraft").hide();
            $("#createListingAlert").hide();
            mApp.scrollTop();
            if(wizard.currentStep == 5) {
                html = '<table>';
               
                html += '<tr><td>Taxmap :</td>'+'<td>'+$("#ParcelNumber").val()+'</td></tr>';
                html += '<tr><td>Street Number :</td>'+'<td>'+$("#StreetNumberNumeric").val()+'</td></tr>';
                html += '<tr><td>Street Name :</td>'+'<td>'+$("#StreetName").val()+'</td></tr>';
                html += '<tr><td>City :</td>'+'<td>'+$("#City").val()+'</td></tr>';
                html += '<tr><td>State Or Province :</td>'+'<td>'+$("#StateOrProvince").val()+'</td></tr>';
                
                
             
                html += '</table>';
                $("#m_wizard_form_step_5 .m-portlet__body .m-portlet__body").html(html);
                console.log('test');
            }
        });
    }

    var initValidation = function() {
        validator = formEl.validate({
            //== Validate only visible fields
            ignore: ":hidden",

            //== Validation rules
            rules: {
                /*//=== Client Information(step 1)
                //== Client details
                name: {
                    required: true 
                },
                email: {
                    required: true,
                    email: true 
                },       
                phone: {
                    required: true,
                    phoneUS: true 
                },     

                //== Mailing address
                address1: {
                    required: true 
                },
                city: {
                    required: true 
                },
                state: {
                    required: true 
                },
                city: {
                    required: true 
                },
                country: {
                    required: true 
                },

                //=== Client Information(step 2)
                //== Account Details
                account_url: {
                    required: true,
                    url: true
                },
                account_username: {
                    required: true,
                    minlength: 4
                },
                account_password: {
                    required: true,
                    minlength: 6
                },                

                //== Client Settings
                account_group: {
                     required: true
                },                
                'account_communication[]': {
                    required: true
                },

                //=== Client Information(step 3)
                //== Billing Information
                billing_card_name: {
                    required: true
                },
                billing_card_number: {
                    required: true,
                    creditcard: true
                },
                billing_card_exp_month: {
                    required: true
                },
                billing_card_exp_year: {
                    required: true
                },
                billing_card_cvv: {
                    required: true,
                    minlength: 2,
                    maxlength: 3
                },

                //== Billing Address
                billing_address_1: {
                    required: true
                },
                billing_address_2: {
                    
                },
                billing_city: {
                    required: true
                },
                billing_state: {
                    required: true
                },
                billing_zip: {
                    required: true,
                    number: true
                },

                //=== Confirmation(step 4)
                accept: {
                    required: true
                }*/
            },

            //== Validation messages
            messages: {
                'account_communication[]': {
                    required: 'You must select at least one communication option'
                },
                accept: {
                    required: "You must accept the Terms and Conditions agreement!"
                } 
            },
            
            //== Display error  
            invalidHandler: function(event, validator) {     
                mApp.scrollTop();

                swal({
                    "title": "", 
                    "text": "Pleaes fill the required fields before go to next step.", 
                    "type": "error",
                    "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
                });
            },

            //== Submit valid form
            submitHandler: function (form) {
                
            }
        });   
    }

    var initSubmit = function() {
        var btn = formEl.find('[data-wizard-action="submit"]');

        btn.on('click', function(e) {
            e.preventDefault();

            if (validator.form()) {
                //== See: src\js\framework\base\app.js
                mApp.progress(btn);
                //mApp.block(formEl); 

                //== See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    success: function() {
                        mApp.unprogress(btn);
                        //mApp.unblock(formEl);

                        swal({
                            "title": "", 
                            "text": "The application has been successfully submitted!", 
                            "type": "success",
                            "confirmButtonClass": "btn btn-secondary m-btn m-btn--wide"
                        });
                    }
                });
            }
        });
    }

    return {
        // public functions
        init: function() {
            wizardEl = $('#m_wizard');
            formEl = $('#m_form');

            initWizard(); 
            initValidation();
            initSubmit();
        }
    };
}();

jQuery(document).ready(function() {    
    WizardDemo.init();
});