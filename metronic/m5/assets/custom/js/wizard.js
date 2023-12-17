var WizardDemo = (function () {
    $("#m_wizard");
    var e,
        r,
        i = $("#m_form_wiz");
    return {
        init: function () {
            var n;
            $("#m_wizard"),
                (i = $("#m_form_wiz")),
                (r = new mWizard("m_wizard", {
                    startStep: 2,
                })).on("beforeNext", function (wizard) {
                    if (
                        ($("#listing_type").val() == "" ||
                            $("#property_type").val() == "" ||
                            $("#ListingAgreement").val() == "") &&
                        wizard.currentStep == 1
                    ) {
                        $("#createListingAlert")
                            .show()
                            .find("span")
                            .html(" All fields are required");
                        wizard.stop();
                    }

                    if (
                        listing.validateCreateListingForm("#m_form") == false &&
                        wizard.currentStep == 2
                    ) {
                        return false;
                    }
                    id = $("#__id").val();
                    console.log(id);
                    if (wizard.currentStep == 2 && id == "0") {
                        console.log("not saved");
                        $("#createListingAlert")
                            .show()
                            .find("span")
                            .html("You must save draft before upload photos");
                        return false;
                    }
                    /*!0 !== e.form() && r.stop()*/
                }),
                r.on("change", function (wizard) {
                    if (wizard.currentStep > 1) $("#clSaveDraft").show();
                    else $("#clSaveDraft").hide();
                    $("#createListingAlert").hide();
                    mUtil.scrollTop();
                    if (wizard.currentStep == 5) {
                        html = "<table>";

                        html +=
                            "<tr><td>Taxmap :</td>" +
                            "<td>" +
                            $("#ParcelNumber").val() +
                            "</td></tr>";
                        html +=
                            "<tr><td>Street Number :</td>" +
                            "<td>" +
                            $("#StreetNumberNumeric").val() +
                            "</td></tr>";
                        html +=
                            "<tr><td>Street Name :</td>" +
                            "<td>" +
                            $("#StreetName").val() +
                            "</td></tr>";
                        html +=
                            "<tr><td>City :</td>" +
                            "<td>" +
                            $("#City").val() +
                            "</td></tr>";
                        html +=
                            "<tr><td>State Or Province :</td>" +
                            "<td>" +
                            $("#StateOrProvince").val() +
                            "</td></tr>";

                        html += "</table>";
                        $(
                            "#m_wizard_form_step_5 .m-portlet__body .m-portlet__body"
                        ).html(html);
                        console.log("test");
                    }
                }),
                (e = i.validate({
                    ignore: ":hidden",
                    rules: {
                        name: {
                            required: !0,
                        },
                        email: {
                            required: !0,
                            email: !0,
                        },
                        phone: {
                            required: !0,
                            phoneUS: !0,
                        },
                        address1: {
                            required: !0,
                        },
                        city: {
                            required: !0,
                        },
                        state: {
                            required: !0,
                        },
                        city: {
                            required: !0,
                        },
                        country: {
                            required: !0,
                        },
                        account_url: {
                            required: !0,
                            url: !0,
                        },
                        account_username: {
                            required: !0,
                            minlength: 4,
                        },
                        account_password: {
                            required: !0,
                            minlength: 6,
                        },
                        account_group: {
                            required: !0,
                        },
                        "account_communication[]": {
                            required: !0,
                        },
                        billing_card_name: {
                            required: !0,
                        },
                        billing_card_number: {
                            required: !0,
                            creditcard: !0,
                        },
                        billing_card_exp_month: {
                            required: !0,
                        },
                        billing_card_exp_year: {
                            required: !0,
                        },
                        billing_card_cvv: {
                            required: !0,
                            minlength: 2,
                            maxlength: 3,
                        },
                        billing_address_1: {
                            required: !0,
                        },
                        billing_address_2: {},
                        billing_city: {
                            required: !0,
                        },
                        billing_state: {
                            required: !0,
                        },
                        billing_zip: {
                            required: !0,
                            number: !0,
                        },
                        billing_delivery: {
                            required: !0,
                        },
                        accept: {
                            required: !0,
                        },
                    },
                    messages: {
                        "account_communication[]": {
                            required:
                                "You must select at least one communication option",
                        },
                        accept: {
                            required:
                                "You must accept the Terms and Conditions agreement!",
                        },
                    },
                    invalidHandler: function (e, r) {
                        mUtil.scrollTop(),
                            swal({
                                title: "",
                                text:
                                    "There are some errors in your submission. Please correct them.",
                                type: "error",
                                confirmButtonClass:
                                    "btn btn-secondary m-btn m-btn--wide",
                            });
                    },
                    submitHandler: function (e) {},
                })),
                (n = i.find('[data-wizard-action="submit"]')).on(
                    "click",
                    function (r) {
                        r.preventDefault(),
                            e.form() &&
                                (mApp.progress(n),
                                i.ajaxSubmit({
                                    success: function () {
                                        mApp.unprogress(n),
                                            swal({
                                                title: "",
                                                text:
                                                    "The application has been successfully submitted!",
                                                type: "success",
                                                confirmButtonClass:
                                                    "btn btn-secondary m-btn m-btn--wide",
                                            });
                                    },
                                }));
                    }
                );
        },
    };
})();
jQuery(document).ready(function () {
    WizardDemo.init();
});
