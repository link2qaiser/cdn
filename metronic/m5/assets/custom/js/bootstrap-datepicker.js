// //== Class definition

// var BootstrapDatepicker = function () {
    
//     //== Private functions

//     var demos = function () {
//         $('.year_picker').datetimepicker({
//             minViewMode: 1,
//             autoclose: true,
//             format: 'yyyy'
//         });


//         // minimum setup
//         $('#m_datepicker_1, #m_datepicker_1_validate').datepicker({
//             todayHighlight: true,
//             orientation: "bottom left",
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // minimum setup for modal demo
//         $('#m_datepicker_1_modal').datepicker({
//             todayHighlight: true,
//             orientation: "bottom left",
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // input group layout 
//         $('#m_datepicker_2, #m_datepicker_2_validate').datepicker({
//             todayHighlight: true,
//             orientation: "bottom left",
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // input group layout for modal demo
//         $('#m_datepicker_2_modal').datepicker({
//             todayHighlight: true,
//             orientation: "bottom left",
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // enable clear button 
//         $('#m_datepicker_3, #m_datepicker_3_validate').datepicker({
//             todayBtn: "linked",
//             clearBtn: true,
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // enable clear button for modal demo
//         $('#m_datepicker_3_modal').datepicker({
//             todayBtn: "linked",
//             clearBtn: true,
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // orientation 
//         $('#m_datepicker_4_1').datepicker({
//             orientation: "top left",
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         $('#m_datepicker_4_2').datepicker({
//             orientation: "top right",
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         $('#m_datepicker_4_3').datepicker({
//             orientation: "bottom left",
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         $('#m_datepicker_4_4').datepicker({
//             orientation: "bottom right",
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // range picker
//         $('#m_datepicker_5').datepicker({
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//          // inline picker
//         $('.m_datepicker_6').datepicker({
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });

//         // Custom Date Picker
//         $('.date_picker_only').datetimepicker({
//             format: "mm/dd/yyyy",
//             todayHighlight: true,
//             autoclose: true,
//             startView: 2,
//             minView: 2,
//             forceParse: 0,
//             pickerPosition: 'bottom-left'
//         });

        

//       /*  $('.date_range_picker').datepicker({
//             todayHighlight: true,
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });*/



//         $('.date_picker, #m_datepicker_1_validate').datepicker({
//             todayHighlight: true,
//             orientation: "bottom left",
//             templates: {
//                 leftArrow: '<i class="la la-angle-left"></i>',
//                 rightArrow: '<i class="la la-angle-right"></i>'
//             }
//         });
//     }

//     return {
//         // public functions
//         init: function() {
//             demos(); 
//         }
//     };
// }();

// jQuery(document).ready(function() {    
//     BootstrapDatepicker.init();
// });


var BootstrapDatepicker = function() {
    var t;
    t = mUtil.isRTL() ? {
        leftArrow: '<i class="la la-angle-right"></i>',
        rightArrow: '<i class="la la-angle-left"></i>'
    } : {
        leftArrow: '<i class="la la-angle-left"></i>',
        rightArrow: '<i class="la la-angle-right"></i>'
    };
    return {
        init: function() {
            $("#m_datepicker_1, #m_datepicker_1_validate").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                orientation: "bottom left",
                templates: t
            }), $("#m_datepicker_1_modal").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                orientation: "bottom left",
                templates: t
            }), $(".date_picker_only").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                orientation: "bottom left",
                templates: t
            }), $("#m_datepicker_2_modal").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                orientation: "bottom left",
                templates: t
            }), $("#m_datepicker_3, #m_datepicker_3_validate").datepicker({
                rtl: mUtil.isRTL(),
                todayBtn: "linked",
                clearBtn: !0,
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_3_modal").datepicker({
                rtl: mUtil.isRTL(),
                todayBtn: "linked",
                clearBtn: !0,
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_4_1").datepicker({
                rtl: mUtil.isRTL(),
                orientation: "top left",
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_4_2").datepicker({
                rtl: mUtil.isRTL(),
                orientation: "top right",
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_4_3").datepicker({
                rtl: mUtil.isRTL(),
                orientation: "bottom left",
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_4_4").datepicker({
                rtl: mUtil.isRTL(),
                orientation: "bottom right",
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_5").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                templates: t
            }), $("#m_datepicker_6").datepicker({
                rtl: mUtil.isRTL(),
                todayHighlight: !0,
                templates: t
            })
        }
    }
}();
jQuery(document).ready(function() {
    BootstrapDatepicker.init()
});