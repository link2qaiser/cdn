//== Class definition
var Select2 = function() {
    //== Private functions
    var demos = function() {

        // multi select
        $('.m_select2_3, .m_select2_3_validate').select2({
            placeholder: "Select a value",
        });

        
        $('.placeholder_select').select2({
            placeholder: "Select One",
            allowClear: true
        });
        $('.select2_multiple').select2({
            placeholder: "Select One or Multiple",
            allowClear: true
        });
        $('.select_nogroup').select2({
            multiple: true,
            placeholder: "Select an option",
            closeOnSelect: false,
        });
        


    }
    return {
        init: function() {
            demos();
        }
    };
}();

//== Initialization
jQuery(document).ready(function() {
    Select2.init();
});