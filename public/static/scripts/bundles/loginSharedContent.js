$(document).ready(function () {
    var basePageName = document.querySelector('meta[property="og:base_page_name"]').content;
    var pageName = document.querySelector('meta[property="og:page_name"]').content;
    var basePageKey = document.querySelector('meta[property="og:base_page_key"]').content;
    var pageKey = document.querySelector('meta[property="og:page_key"]').content;
    if ("userName" in sessionStorage) {
        userName = sessionStorage.getItem('userName').length > 0 ? sessionStorage.getItem('userName') : '';
    }
    if ("userRole" in sessionStorage) {
        userRole = sessionStorage.getItem('userRole').length > 0 ? sessionStorage.getItem('userRole') : 'Default';
    }
    else {
        sessionStorage.setItem('userRole', 'Default');
    }
    if ("token" in sessionStorage) {
        token = sessionStorage.getItem('token').length > 0 ? sessionStorage.getItem('token') : '';
    }
    isAuthorized = sessionStorage.getItem('isAuthorized');

    if ($("#MetaverseDailyShortcuts").length > 0) {
        $.get('/MetaverseDaily/openshortcuts', function (result) {
            $("#MetaverseDailyShortcuts").append(result);

            if ($("#MetaverseDailyMessageUsDialog").length > 0) {
                $.get('/MetaverseDaily/messageus', function (result) {
                    $("#MetaverseDailyMessageUsDialog").append(result);
                });
            }

            if ($("#MetaverseDailyPartnerWithUsDialog").length > 0) {
                $.get('/MetaverseDaily/partnerwithus', function (result) {
                    $("#MetaverseDailyPartnerWithUsDialog").append(result);
                });
            }

            if ($("#MetaverseDailyBecomeMerchantDialog").length > 0) {
                $.get('/MetaverseDaily/becomemerchant', function (result) {
                    $("#MetaverseDailyBecomeMerchantDialog").append(result);
                });
            }
        });
    }

    if ($("#MetaverseDailyFooterContent").length > 0) {
        $.get("/MetaverseDaily/footercontent", { token: sessionStorage.getItem('token'), userRole: sessionStorage.getItem('userRole'), isAuthorized: sessionStorage.getItem('isAuthorized'), userName: sessionStorage.getItem('userName') })
            .done(function (result) {
                $("#MetaverseDailyFooterContent").append(result);
                if ($("#MetaverseDailyTrendingTopics").length > 0) {
                    $.get('/MetaverseDaily/TrendingTopics', function (result) {
                        $("#MetaverseDailyTrendingTopics").append(result);
                    });
                }
                if ($("#OnPhoneDialog").length > 0) {
                    $.get('/OnPhone', function (result) {
                        $("#OnPhoneDialog").append(result);
                    });
                }

                if ($("#OnVRDialog").length > 0) {
                    $.get('/OnVR', function (result) {
                        $("#OnVRDialog").append(result);
                    });
                }

                if ($("#MetaverseDailySubscribeDialog").length > 0) {
                    $.get('/MetaverseDaily/subscribe', function (result) {
                        $("#MetaverseDailySubscribeDialog").append(result);
                    });
                }

                if ($("#btnFooterInsights").length > 0) {
                    $("#btnFooterInsights").bind("click", () => {
                        ShowInsightsExclusiveMembershipDialog();
                    });
                }
            });
    }

});