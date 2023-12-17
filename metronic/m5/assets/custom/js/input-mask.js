//== Class definition

var Inputmask = function () {
    
    //== Private functions
    var demos = function () {
        $(".integer_mask,.mask_number_2").inputmask({
            "mask": "9",
            "repeat": 10,
            "greedy": false
        }); // ~ mask "9" or mask "99" or ... mask "9999999999"
        $(".taxmap_mask").inputmask('9999-999.99-99.99-999.999', {
            
        }); //123456  =>  € ___.__1.234,56
        $(".mask_phone").inputmask("mask", {
            "mask": "+1 (999) 999-9999"
        });
        $(".mask_phone_with_ext").inputmask("mask", {
            "mask": "999-9999"
        });
        $(".mask_phone_ext").inputmask("mask", {
            "mask": "(999)"
        });
        $(".mask_ext_six").inputmask("mask", {
            "mask": "(999999)"
        });
        $(".mask_phone_ext_com").inputmask("mask", {
            "mask": "999999"
        });
        $(".percent_mask").inputmask('decimal', {
            rightAlignNumerics: false
        }); 

        $(".zipcode_mask").inputmask("mask", {
            "mask": "99999"
        });
        /*$(".year_mask").inputmask("mask", {
            "mask": "9999",
            'min': '1500',
            'max': '40'
            //range [1500,2028]
        });*/
        $(".year_mask").inputmask({
              'alias': 'numeric',
              'min':1500,
              'max':2028
        });
        $(".zipcode_mask_4").inputmask("mask", {
            "mask": "9999"
        });
        $('.price_mask').inputmask("numeric", {
                radixPoint: ".",
                groupSeparator: ",",
                digits: 2,
                autoGroup: true,
                prefix: '$ ', //Space after $, this will not truncate the first character.
                rightAlign: false,
                oncleared: function () { self.Value(''); }
        });
        $(".decimal_mask").inputmask('decimal', {
            rightAlignNumerics: false
        }); 
        $("#m_inputmask_1").inputmask("mm/dd/yyyy", {
            autoUnmask: true
        });


        // custom placeholder        
        $("#m_inputmask_2").inputmask("mm/dd/yyyy", {
            "placeholder": "*"
        });
        
        // phone number format
        
        // empty placeholder
        $("#m_inputmask_4").inputmask({
            "mask": "99-9999999",
            placeholder: "" // remove underscores from the input mask
        });

        // repeating mask
        $("#m_inputmask_5").inputmask({
            "mask": "9",
            "repeat": 10,
            "greedy": false
        }); // ~ mask "9" or mask "99" or ... mask "9999999999"
        // repeating mask
        
        /*Price masking*/

        
        
        // currency format
        
        // currency format
        $("#m_inputmask_7").inputmask('€ 999.999.999,99', {
            numericInput: true
        }); //123456  =>  € ___.__1.234,56

        //ip address
        $("#m_inputmask_8").inputmask({
            "mask": "999.999.999.999"
        });  

        //email address
        $("#m_inputmask_9").inputmask({
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
                pastedValue = pastedValue.toLowerCase();
                return pastedValue.replace("mailto:", "");
            },
            definitions: {
                '*': {
                    validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                    cardinality: 1,
                    casing: "lower"
                }
            }
        });    
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    Inputmask.init();
});