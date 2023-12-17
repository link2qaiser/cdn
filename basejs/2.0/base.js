/*
 *
 * CREATED AT 28 AUGUST 2018
 * AUTHER : QAISER
 * TWITTER: @LINK2QAISER
 *
 */
 
 /*
 Content
 1. Global Funtion
    a) getRandomString()
    b) extractExtension()
    c) converToSEO()
    d) addWait()
    e) removeWait()
    f) addWaitWithoutText()
    g) removeWaitWithoutText()
    h) ImportaddWaitWithoutText()
    i) afterAajaxCall()
    
 */
var site_url = "";
var current_url = "";
var paging_url = "";
var sort_by = "";
var order_by = "";
var es = false;

/* 
--------------------START- Global Funtion ---------------------------------------
*/

//GENERATE RANDOM STRING FOR FILE NAME

function getRandomString(){
  var charset = 'abcdefghijknopqrstuvwxyzACDEFGHJKLMNPQRSTUVWXYZ12345679';

      output = [];
      for(var i = 0; i < 4; i++){
        var arr = charset.charAt(Math.floor(Math.random() * charset.length+1));
        output.push(arr);
      }
      return output.join("")+new Date().getTime();
}

//EXTRACT FILE EXTENSION
function extractExtension(fileName) {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
}

// SEO URL method
function converToSEO(txt_src){
 var output = txt_src.replace(/[^a-zA-Z0-9]/g,' ').replace(/\s+/g,"-").toLowerCase();
 /* remove first dash */
 if(output.charAt(0) == '-') output = output.substring(1);
 /* remove last dash */
 var last = output.length-1;
 if(output.charAt(last) == '-') output = output.substring(0, last);
 
 return output;
}


// Add wait before ajax
function addWait(dom, lable) {
  $(dom).attr("disabled", "disabled");
  string = '<i class="fa fa-spinner fa-spin"></i> ' + lable;
  $(dom).html(string);
}

//Remove wait after ajax
function removeWait(dom, lable) {
  $(dom).removeAttr("disabled");
  $(dom).html(lable);
}

//Add wait without Text
function addWaitWithoutText(dom) {
  $(dom).attr("disabled", "disabled");
  string = '<i class="m-loader"></i>';
  $(dom).html(string);
}

//Remove wait after text
function removeWaitWithoutText(dom, lable) {
  $(dom).removeAttr("disabled");
  $(dom).html(lable);
}

//Import wait without text
function ImportaddWaitWithoutText(dom) {
  $(dom).attr("disabled", "disabled");
  string = '<i class="m-loader">Importing</i>';
  $(dom).html(string);
}

// AFTER AJAX CALL
function afterAajaxCall(status, res) {
  if(status == 'success')  {
    if (res.flag == true) {
      try { 
        toastr["success"](res.msg, "Completed!");
      } catch(e) {}
      
    }
    if (res.flag == false) {
      try { 
        toastr["error"](res.msg, "Alert!");
      } catch(e) {}
      
    }
    if (res.action == "close") {
      $("#data_modal").modal("hide");
    } else if (res.action == "reload") {
      window.location.reload();
    } else if (res.action == "redirect") {
      window.location.href = res.url;
    } else {
      $("." + remvove).remove();
    }
  }
  else if(status == 'error')  {
  
    try { 
        toastr["error"](res.msg, "Alert!");
      } catch(e) {}
  }
}

$(document).ready(function () {
  site_url = $("#site_url").html();
  current_url = $("#current_url").html();

  /*
  SEO URL
  */
  $(document).on("keyup", ".seo-url", function (event) {
    let val = $(this).val();
    let target = $(this).attr("data-target");
    $(target).val(converToSEO(val));
  });

  /*
  NO SPACE
  */
  $(document).on("keypress", ".nospace", function (event) {
    if (event.keyCode == 32) {
        return false;
    }
  });

  /*
  UPDAT TEXT OF ONE FILED WHEN TEXT OF SECOND FILED UPDATED
  */
  $(document).on("keyup", ".keysyn", function (event) {
    target = $(this).attr("data-change");
    $(target).val($(this).val());
  });

  /* 
    Full Secreen image viewer 
  */
  $(document).on("click", ".image-viewer", function (event) {
    var viewer = ImageViewer();
    viewer.show($(this).attr("src"));
  });
  /* 
    Full Secreen image viewer 
  */
  $(document).on("click", ".simple-request", function (event) {
    var that = $(this);
    var preHtml = that.html();
    var postHtml = that.attr("data-post-html");

    var state = that.attr("data-state");

    that.html("working...");
    $.ajax({
      type: "GET",
      cache: false,
      url: that.attr("data-url"),
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        var attr = $(this).attr('name');
        if (typeof postHtml !== 'undefined') {
          that.html(postHtml);
        }else {
          that.html(preHtml);
        }
        
        if(state == 'true') 
          that.attr("data-state","false");
        else
          that.attr("data-state","true");
      },
    });

  });
  

  
  
  /* 
  Delete Function 
  */
  $(document).on("click", ".list .delete", function (event) {
    var remvove = $(this).attr("data-remove");
    var attr = $(this).attr("data-action");
    //confirm("Do you want to delete");
    //addWaitWithoutText(this);
    $.ajax({
      type: "GET",
      cache: false,
      url: $(this).attr("data-url"),
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        if (res.flag == true) {
          toastr["success"](res.msg, "Completed!");
          if (res.action == "reload") {
            window.location.reload();
          } else {
            $("." + remvove).remove();
          }
        }
      },
    });
  });

  /*
  DELETE FROM MODAL
  */
  $(document).on("click", ".data-model .delete", function (event) {
    addWaitWithoutText(this);
    $.ajax({
      type: "GET",
      cache: false,
      url: $(this).attr("data-url"),
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        if (res.flag == true) {
          location.reload();
        } else {
          toastr["warning"](res.msg, "Oops!");
        }
      },
    });
  });
  

  /* 
  Make form submit ajax call
  */
  $(document).on("submit", "form.make_ajax", function (event) {

    var form = $(this).serialize();

    var btn = $(this).find("button[type=submit]");
    var btntxt = $(btn).html();
    res = validateForm("form.make_ajax");
    if (res.flag == false) {
      res.dom.focus().scrollTop();
      return false;
    }
    addWait(btn, "working...");

    $.ajax({
      type: $(this).attr("method"),
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: $(this).attr("action"),
      data: new FormData(this),
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        removeWait(btn, btntxt);
        afterAajaxCall('success',res);
        return false;
      },
      error: function (err) {
        console.log(err.responseJSON);
        toastr["error"](err.responseJSON.message, "Alert!");
        removeWait(btn, btntxt);
        return false;
      },
    });
    return false;
  });

  /*
  Make Ajax call with files
  */
  $(document).on("submit", "form.make_file_ajax", function (event) {
    event.preventDefault();
    var btn = $(this).find("button[type=submit]");
    var btntxt = $(btn).html();
    res = validateForm("form.make_file_ajax");
    if (res.flag == false) {
      res.dom.focus().scrollTop();
      return false;
    }
    addWait(btn, "working");
    $.ajax({
      type: $(this).attr("method"),
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: $(this).attr("action"),
      data: new FormData(this),
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        removeWait(btn, btntxt);
        if (res.flag) toastr["success"](res.msg, "Completed!");
        else toastr["warning"](res.msg, "Oops!");
        if (res.action == "reload") {
          window.location.reload();
        } else if (res.action == "redirect") {
          window.location.href = res.url;
        } else {
          $("." + remvove).remove();
        }
      },
      error: function () {
        removeWait(btn, btntxt);
        toastr["error"]("Something went wrong", "Opps!");
      },
    });
    return false;
  });
  $(document).on("submit", "form.make_ajax_model", function (event) {
    var form = $(this).serialize();
    var btn = "form.make_ajax_model button[type=submit]";
    var btntxt = $(btn).html();
    
    $.ajax({
      type: $(this).attr("method"),
      cache: false,
      url: $(this).attr("action") + "?" + form,
      dataType: "json",
      headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
      success: function (res) {
        removeWait(btn, btntxt);
        if (res.flag) {
          $(".make_ajax_model select").val(null).trigger("change");
          $(".make_ajax_model").trigger("reset");
          if (JSON.parse(res.attached) == true) {
            key_number = JSON.parse(res.key_number);
            office_id = JSON.parse(res.office_id);
            listing_id = JSON.parse(res.list_ids);
            loadModal(
              "key-override",
              listing_id +
                "&office_id=" +
                office_id +
                "&key_number=" +
                key_number +
                "&seperate= "
            );
          } else {
            location.reload();
          }
        } else {
          toastr["warning"](res.msg, "Oops!");
        }
      },
    });
    return false;
  });

  /* 
  FORM VALIDATION CODE 
  */
  $(document).on("submit", "form.validate", function (event) {
    event.preventDefault();
    res = validateForm("form.validate");
    if (res.flag == false) {
      res.dom.focus().scrollTop();
    }
    return res.flag; //SUBMIT FUNCTION OR NO
  });

  $(".scrolto").click(function () {
    target = $(this).attr("data-target");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - 186,
      },
      500
    );
  });
  /*
    DATE RANGE PICKER
  */
  $(".date_range_picker").each(function () {
    var dateRangeThis = this;
    var future = $(dateRangeThis).attr("data-future") == "false" ? false : true;
    var start_date = $(dateRangeThis).find("#start_date").val();
    var end_date = $(dateRangeThis).find("#end_date").val();

    $(this).daterangepicker(
      {
        opens: App.isRTL() ? "left" : "right",
        // startDate: moment().subtract('days', 29),
        maxDate: future ? false : moment(),
        startDate: start_date,
        endDate: end_date,
        //minDate: '01/01/2012',
        //maxDate: '12/31/2014',
        dateLimit: {
          days: 60,
        },
        showDropdowns: true,
        showWeekNumbers: true,
        timePicker: false,
        timePickerIncrement: 1,
        timePicker12Hour: true,
        ranges: future
          ? {
              Today: [moment(), moment()],
              Yesterday: [
                moment().subtract("days", 1),
                moment().subtract("days", 1),
              ],
              "Last 7 Days": [moment().subtract("days", 6), moment()],
              "Last 30 Days": [moment().subtract("days", 29), moment()],
              "This Month": [
                moment().startOf("month"),
                moment().endOf("month"),
              ],
              "Last Month": [
                moment().subtract("month", 1).startOf("month"),
                moment().subtract("month", 1).endOf("month"),
              ],
            }
          : {
              Today: [moment(), moment()],
              Yesterday: [
                moment().subtract("days", 1),
                moment().subtract("days", 1),
              ],
              "Last 7 Days": [moment().subtract("days", 6), moment()],
              "Last 30 Days": [moment().subtract("days", 29), moment()],
              "This Month": [moment().startOf("month"), moment()],
              "Last Month": [
                moment().subtract("month", 1).startOf("month"),
                moment().subtract("month", 1).endOf("month"),
              ],
            },
        buttonClasses: ["btn"],
        applyClass: "green",
        cancelClass: "default",
        format: "MM/DD/YYYY",
        separator: " to ",
        locale: {
          applyLabel: "Apply",
          fromLabel: "From",
          toLabel: "To",
          customRangeLabel: "Custom Range",
          daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          monthNames: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          firstDay: 1,
        },
      },
      function (start, end) {
        $(dateRangeThis)
          .find("span")
          .html(
            start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
          );
        $(dateRangeThis).find("#start_date").val(start.format("MM/DD/YYYY"));
        $(dateRangeThis).find("#end_date").val(end.format("MM/DD/YYYY"));
      }
    );
    $(dateRangeThis)
      .find("span")
      .html(
        moment(start_date).format("MMMM D, YYYY") +
          " - " +
          moment(end_date).format("MMMM D, YYYY")
      );
  });
});
/*
DASHBOARD DATE RANGE PICKER FORM SUBMIT
*/
initDashboardDaterange = function() {
    if (!jQuery().daterangepicker) {
        return;
    }
    //qaiser here
    $('#header-date-range').daterangepicker({
        "ranges": {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
            'Last 7 Days': [moment().subtract('days', 6), moment()],
            'Last 30 Days': [moment().subtract('days', 29), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
        },
        maxDate: new Date(),
        startDate: $("#daterangeform #start_date").val(),
        endDate: $("#daterangeform #end_date").val(),
        "locale": {
            "format": "YYYY-MM-DD",
            "separator": " - ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "customRangeLabel": "Custom",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "firstDay": 1
        },
        //"startDate": "11/08/2015",
        //"endDate": "11/14/2015",
        opens: (App.isRTL() ? 'right' : 'left'),
    }, function(start, end, label) {
        if ($('#header-date-range').attr('data-display-range') != '0') {
            $('#header-date-range span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
        $("#daterangeform #start_date").val(start.format("YYYY-MM-DD",));
        $("#daterangeform #end_date").val(end.format("YYYY-MM-DD",));
        
        $("#daterangeform").submit();
    });

     if ($('#header-date-range').attr('data-display-range') != '0') {
        start_date = moment($("#daterangeform #start_date").val()).format('MMMM D, YYYY');
        end_date = moment($("#daterangeform #end_date").val()).format('MMMM D, YYYY');

        $('#header-date-range span').html(start_date + ' - ' + end_date);
    }
    $('#header-date-range').show();
}
/*
FUNCTION REMOVE PARAMTER FROM QUERY STRING
*/
function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + "=";
    var pars = urlparts[1].split(/[&;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    url = urlparts[0] + "?" + pars.join("&");
    return url;
  } else {
    return url;
  }
}
/*
FORM VALIDATION (still incomplete)
*/
function validateForm(dom) {
  var inputs = $(
    dom +
      " input[type=text]," +
      dom +
      " textarea," +
      dom +
      " select," +
      dom +
      " input[type=password]"
  );
  var res = {};
  res.flag = true;

  inputs.each(function () {
    val = $(this).val();
    req = $(this).attr("required");

    if (val == "" && req != undefined) {
      if (res.flag == true) res.dom = $(this);
      res.flag = false;

      $(this).parent().addClass("has-danger");
      $(this).addClass("border-danger");
      var attr = $(this).attr("data-targeterror");
      if (typeof attr !== typeof undefined && attr !== false) {
        $(attr).addClass("has-danger");
      }
    } else {
      type = $(this).attr("data-type");
      req = $(this).attr("required");
      if (typeof type != "undefined" && req != undefined) {
        if (form.validate(type, val) == false) {
          if (res.flag == true) res.dom = $(this);
          res.flag = false;

          $(this).parent().addClass("has-danger");
          var attr = $(this).attr("data-targeterror");
          if (typeof attr !== typeof undefined && attr !== false) {
            $(attr).addClass("has-danger");
          }
        } else {
          $(this).parent().removeClass("has-danger");
          var attr = $(this).attr("data-targeterror");
          if (typeof attr !== typeof undefined && attr !== false) {
            $(attr).removeClass("has-danger");
          }
        }
      } else {
        $(this).parent().removeClass("has-danger");
        $(this).removeClass("border-danger");
        var attr = $(this).attr("data-targeterror");
        if (typeof attr !== typeof undefined && attr !== false) {
          $(attr).removeClass("has-danger");
        }
      }
    }
  });
  return res;
}

var form = {
  val: "",
  type: "",
  validate: function (type, val) {
    this.val = val;
    this.type = type;
    switch (this.type) {
      case "email":
        return this.isEmail();
        break;
      case "integer":
        return this.isInteger();
        break;
      case "url":
        return this.isUrl();
        break;
    }
  },
  isEmail: function () {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.val);
  },
  isInteger: function () {
    return /^\d+$/.test(this.val);
  },
  isUrl: function () {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(this.val);
  },
};

function loadModal(url, param, param2, param3) {
  $("#data_modal .modal-content").html(
    '<p style="text-align: center;"><br/> <i class="fa fa-spinner fa-spin"></i>  Please wait loading...</p>'
  );

  if (typeof param === "undefined") param = null;
  if (typeof param2 === "undefined") param2 = null;
  if (typeof param3 === "undefined") param3 = null;
  url =
    site_url + url +
    "?param=" +
    param +
    "&param2=" +
    param2 +
    "&param3=" +
    param3;
  console.log(site_url);
  $.ajax({
    type: "GET",
    cache: false,
    url: url,
    //dataType: "json",
    success: function (result) {
      $(".all-modals .modal-content").html(result);
      try {
        FormInputMask.init();
        ComponentsDateTimePickers.init();
      }
      catch(e) {
        console.log("Unable to load Forminput | Timepickers");
      }
      
      /*BootstrapDatepicker.init();
            Select2.init();
            FormRepeater.init();*/
    },
  });
}
try {
  toastr.options = {
    closeButton: true,
    debug: false,
    positionClass: "toast-top-right",
    onclick: null,
    showDuration: "1000",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
}
catch(e) {
    console.log('toastr is not defined');
}


function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $(".view_upload_image").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

var getDaysFromDates = function (firstDate, secondDate) {
  oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  firstDate = new Date(firstDate);
  secondDate = new Date(secondDate);
  return Math.round(
    Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay)
  );
};

var addDays = function (date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

var formatDate = function (date, spilter) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join(spilter);
};

$(".upload-image").change(function () {
  readURL(this);
});

/*
SELECT2
*/
try {
  $(".select2box").select2({
    placeholder: "Select One",
    enableFiltering: true,
    allowClear: true,
  });
}catch(err) {console.log("selct 2 is not deined")}

function initiateSelect2() {
  $(".select2").select2({
    placeholder: " ",
    allowClear: true,
    dropdownParent: $("#data_modal"),
    theme: "bootstrap",
  });
}

/*
EDIT THE NOTE / DESCRIPTION  / All fields
*/
$(document).ready(function(){
  //Append edit button
  var selector =  "#editable";
  var preValue = "";
  
  $(selector + " [data-id]").append(' <a href="#" class="edit-button" >edit</a>');

  $(document).on('click',selector+" .edit-button",function(e) {

    let text = $(this).parent().clone().children().remove().end().text();
    //console.log(text);
    let input = $(this).parent().attr("data-input");
    let field = $(this).parent().attr("data-field");
    let dataId = $(this).parent().attr("data-id");

    console.log(text);

    preValue = text;

    if(input == "text") {
      $(this).parent().html('<input type="text" name="'+field+'" value="'+text+'" data-id="'+dataId+'" class="form-control" /> <a class="update-button" href="javascript:void(0)"> update </a>| <a href="javascript:void(0)" class="cancel-button"> cancel </a>');
    }
    if(input == "textarea") {
      $(this).parent().html('<textarea class="form-control" name="'+field+'" data-id="'+dataId+'" >'+text+'</textarea> <a class="update-button" href="javascript:void(0)"> update </a>| <a href="javascript:void(0)" class="cancel-button"> cancel </a>');
    }
    
  });
  $(document).on('click',selector+" .cancel-button",function(e) {
    $(this).parent().html(preValue+' <a href="#" class="edit-button" >edit<a/>');
  });

  $(document).on('click',selector+" .update-button",function(e) {
    let text = $(this).closest(selector).find("[data-id]").find("input, textarea").val();
    let field = $(this).closest(selector).find("[data-id]").find("input, textarea").attr("name");
    let dataId = $(this).closest(selector).find("[data-id]").find("input, textarea").attr("data-id");
    let action = $(this).closest(selector).attr("data-url")+"/"+dataId;
    var that = $(this);

    //console.log(field);
    //Make form  to send values
    data = new FormData();
    data.append(field, text);

    jQuery.ajax({
      type:"POST",
      url: action ,
      data:data,
      contentType:false,
      processData:false,
      cache:false,
      dataType: "json",
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success:function(res){
          that.parent().html(text+' <a href="#" class="edit-button" >edit<a/>');
      },
      error:function(error){
        console.log(error);
      }
    });
  });
  /* 
    Change Field Status 
  */
  $(document).on("change", selector+" .update-field", function (event) {


      //Make form  to send values
      data = new FormData();
      data.append($(this).attr("name"), $(this).val());

      let dataId = $(this).attr("data-id");
      let action = $(this).closest(selector).attr("data-url")+"/"+dataId;

      $.ajax({
        type:"POST",
        url: action ,
        data:data,
        contentType:false,
        processData:false,
        cache:false,
        dataType: "json",
        headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
        success: function (res) {
          if (res.flag == true) {
            toastr["success"](res.msg, "Completed!");
            
          }
        },
      });
    });
  });

/*
Datatable with checkbox and action like wordpress 
*/
$(document).ready(function(){
   $(document).on('change',"#data-table input[type='checkbox']",function(e) {
      if($(this).closest('th').length == 1) {
         if($(this).prop("checked") == true){
            $(this).closest('table').find('tbody').find("input[type='checkbox']").prop("checked", true);
         }else {
            $(this).closest('table').find('tbody').find("input[type='checkbox']").prop("checked", false);
         }
      }
  });
   $(document).on("click", "#data-table #actions button", function (event) {
      let select = $(this).closest('#actions').find("select").val();
      if(select == "")
         return;
      let action =  $(this).closest('form').attr("action");
      if(action == "")
         return;
      let method = $(this).closest('form').attr("method"); 
      if(method == "")
         return;
      let checkedCount =  $(this).closest('form').find("input[type='checkbox']:checked").length;
      if(checkedCount == 0) {
         return;
      }
      var form = $(this).closest('form').serialize();
      var btn = this;
      var btntxt = $(btn).html();
      addWait(btn, "working...");
      $.ajax({
         type: method,
         cache: false,
         data: form,
         url: action+"/"+select,
         dataType: "json",
         headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
         success: function (res) {
          removeWait(btn, btntxt);
          afterAajaxCall('success',res);
          return false;
        },
        error: function (err) {
          removeWait(btn, btntxt);
          afterAajaxCall('success',err);
          return false;
        },
      });
   });
});



/*
------------------------------------------------START - Comment box with screenshot upload-----------------------------------------------------
*/
//CONTAINER 
var container = "#commentBox";
$(document).ready(function() {
  
  /*
  Detect Paste event to uplooad the image
  */
  $(document).on('paste',container+" textarea",function(e) {
    
   
    //Get form action to upload the image
    var action = $(this).closest('#commentBox').attr('image-add-action');
    var deleteUrl = $(this).closest('#commentBox').attr('image-delete-action');

    
    
    //e.preventDefault();
    //Get clipboard data
    var data = e.originalEvent;

    //Check if data has  item
    if (data.clipboardData && data.clipboardData.items) {

      var items = data.clipboardData.items;

      //Loop to  get the items from data
      for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {

              //Get image file to upload
              var file = items[i].getAsFile();

              //Get random image name
              let uniqueID = getRandomString();

              //Contact image name and extension
              var fileName  = uniqueID+"."+extractExtension(file.name);

              //Append iamge to show
              $(container+" .images-list").append('<div id="'+uniqueID+'" data-file="'+fileName+'">'+fileName+' <span class="upload"> - uploading</span><a href="javascript:void()" data-url="'+deleteUrl+'?filename='+fileName+'" class="delete"></a></div>');

              //Start to  upload file
              data = new FormData();
              data.append('file', file);

              //Make ajax call
              jQuery.ajax({
                type:"POST",
                url: action + '?filename='+fileName,
                data:data,
                contentType:false,
                processData:false,
                cache:false,
                dataType: "json",
                headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
                success:function(res){
                  console.log(res);
                    
                  //After ajax complete add delete button
                  $(container+" .images-list #"+uniqueID+" .delete").html('x');
                  //After upload remove the uploading  text
                  $(container+" .images-list #"+uniqueID+" .upload").html('');

                  //Add files into  container later to  add comments
                  let files = $("#images").val();
                  if(files == "") {
                    $("#images").val(res.file);
                  }else {
                    $("#images").val(files+","+res.file);
                  }
                },
                error:function(error){
                  console.log(error);
                }
              });
            }
        }
    }
  });
  $(document).on('click',container+" .images-list .delete",function(e) {

    /*
    GET FILE TO REMOVE
    */

    let files = $(container + " #images").val();

    /*
    GET ALL FIELS TO SHOW
    */
    let file = $(this).closest('div').attr("data-file");
    files = files.split(",");
    const index = files.indexOf(file);
    if (index > -1) {
      files.splice(index, 1);
    }
    //RPLACE UPDATED FILES
    $("#images").val(files.join(","));

    
    //Note: Make ajax call here to delete image & comments from database
    var that = $(this);
    $.ajax({
      type: "GET",
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: $(this).closest(container).attr("image-delete-action")+"?filename="+file,
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        that.closest('div').remove();
      },
      error: function (err) {
        console.log(err.responseJSON);
      },
    });

  });
  $(document).on('click',container+" .save",function(e) {

    /*
    GET COMMENTS
    */
    //Note: Make ajax call here to save comments into database

    $.ajax({
      type: "POST",
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: $(this).closest('form').attr("action"),
      data: new FormData($(this).closest('form')[0]),
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        
        /* MAKE HTML */
        html = "<div>";
        html += '<ul class="action"><li class="date"> Commmented at: '+res.data.date+' | By: '+res.data.user.name+'</li><li class="delete"><a href="javascript:void(0)" data-id="'+res.data.com_id+'"> remove</a></li></ul>';
        html += '<div class="comments">';
        

        /*
        GET ALL FIELS TO SHOW
        */
        let files = $("#images").val();
        files = files.split(",");
        
        for(i = 0; i < files.length; i++) {
          if(files[i] != "")
            //APPEND HTML
            html += '<a href="'+files[i]+'" target="_blank"><img width="100" src="'+files[i]+'"></a>';
        }


        //APPEND HTML
        html += '<p>'+res.data.comments+'</p>';
        html += "</div>";
        html += "</div>";
         /*
        CLEAR IMAGES UPLOAD
        */
        $(container+" .images-list").html('');
        /*
        CLEAR TEXTAREA
        */
        $(container+" textarea").val('');
        /*
        CLEAR FILE CONTANER
        */
        $(container+" #images").val("");

        //PLACE THE HTML
        $(container+" .comment-list").append(html);
      },
      error: function (err) {
        console.log(err.responseJSON);
      },
    });

   

    


  });
  $(document).on('click',container+" .comment-list .delete",function(e) {
    /*
    REMOVE COMMENTS
    */
    var that = $(this)
    var action = $(this).closest(container).attr("data-comment-delete-url")+"/"+that.attr("data-id");

    that.closest('div').remove();
    //Note: Make ajax call here to delete image & comments from database
    $.ajax({
      type: "GET",
      contentType: false,
      cache: false,
      processData: false,
      dataType: "json",
      url: action,
      headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
      success: function (res) {
        
      },
      error: function (err) {
        console.log(err.responseJSON);
      },
    });

  });
  $(document).on('click',container+" .cancel",function(e) {
    /*
    CLEAR IMAGES UPLOAD
    */
    $(container+" .images-list").html('');
    /*
    CLEAR TEXTAREA
    */
    $(container+" textarea").val('');
    /*
    CLEAR FILE CONTANER
    */
    $(container+" #images").val("");

    //Note; Make ajax call to remove the images

  });
  
});
$(document).ready(function() {
/*
------------------------------------------START - Submit Problem----------------------------------------------
*/
  var submitProblem = {
    container : "#submitProblem",
    modal : `
      <div class="modal fade" id="submitProblemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Submit Problem</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <form action="#">
                <div class="modal-body">
                  <div class="form-group">
                    <label for="problem">Problem</label>
                    <textarea  class="form-control" id="problem" name="problem"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="problem">Link</label>
                    <input type="text" class="form-control" id="url" name="url" readonly value="`+window.location.href+`" />
                  </div>
                  <div class="form-group">
                   <label for="problem">Screenshot</label>
                    <img src="{==IMAGEURL==}" >
                    <input type="hidden" class="form-control" id="screenshot" name="screenshot" value="" />
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary btn-sm save" >Save changes</button>
                </div>
             </form>
           </div>
         </div>
       </div>
    `,
    init: function () {
      //Add convas JS
      $('html').append('<script type="text/javascript" src="https://dixeam.com/cdn/plugins/html2canvas/html2canvas.min.js"></script>');

      //Append Sub Problem Button
      $(submitProblem.container).append('<a class="button" href="javascript:void(0);">Submit Problem</a>');

      //Get modal html
      var modal = submitProblem.modal;

      //Load modal
      $(document).on("click", submitProblem.container+" .button", function (event) {
        html2canvas(document.querySelector("body")).then(canvas => {
            let screenshot = canvas.toDataURL();

            //Replace Screenshot
            modal = modal.replace("{==IMAGEURL==}",screenshot);

            //Show the modal
            $(submitProblem.container).append(modal);
            $("#submitProblemModal").modal('show');
            $(submitProblem.container+" #screenshot").val(screenshot);
        });
      });

      //Save Screenshot
      $(document).on("click", submitProblem.container+" .save", function (event) {
        if($(submitProblem.container+" #problem").val() == "") {$(submitProblem.container+" #problem").focus(); return;}

        let link = window.location.href;
        $.ajax({
          type: "POST",
          contentType: false,
          cache: false,
          processData: false,
          dataType: "json",
          url: $(submitProblem.container).attr("data-action"),
          data: new FormData($(submitProblem.container +" form")[0]),
          //headers: { "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") },
          success: function (res) {
            $("#submitProblemModal .modal-body").html('<p>Problem has been submitted.</p>');
            $("#submitProblemModal .save").remove();
          },
        });
      });
    }
  }
  submitProblem.init();
});
/* ---------------------------------Voice to text ------------------------------*/
$(document).on('click',"#voice-input",function(e) {
  let target = $(this).attr("data-target");
  let lang = $(this).attr("data-lang");

  //Add listing 
  $(this).attr("placeholder","listing...");

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = lang;
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById(target).value = e.results[0][0].transcript;
      recognition.stop();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
});
