var userName;
var userId;
var userRole;
var token;
var isAuthorized = 0;

function setSessionStorage() {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userRole', userRole);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('isAuthorized', isAuthorized);
}

function clearSessionStorage() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('userRole', 'Default');
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('isAuthorized', 0);
}

function SignOut() {
    clearSessionStorage();
    window.location.href = '/home';
}

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

    if ($("#MetaverseDailyHeroContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/herocontent', function (result) {
            $("#MetaverseDailyHeroContent").append(result);
        });
    }

    if ($("#MetaverseDailyHeroSliderContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/heroslidercontent', function (result) {
            $("#MetaverseDailyHeroSliderContent").append(result);
        });
    }

    if ($("#MetaverseDailyFooterContent").length > 0) {
        $.get("/MetaverseDaily/Mobile/footercontent", { token: sessionStorage.getItem('token'), userRole: sessionStorage.getItem('userRole'), isAuthorized: sessionStorage.getItem('isAuthorized'), userName: sessionStorage.getItem('userName') })
            .done(function (result) {
                $("#MetaverseDailyFooterContent").append(result);
                if ($("#MetaverseDailyTrendingTopics").length > 0) {
                    $.get('/MetaverseDaily/Mobile/TrendingTopics', function (result) {
                        $("#MetaverseDailyTrendingTopics").append(result);
                    });
                }
            });
    }

    if ($("#MetaverseDailyHeaderBrand").length > 0) {
        $.get('/MetaverseDaily/Mobile/headerbrand', function (result) {
            $("#MetaverseDailyHeaderBrand").append(result);
        });
    }

    if ($("#MetaverseDailyDrawerMenu").length > 0) {
        $.get('/MetaverseDaily/Mobile/opendrawermenu?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyDrawerMenu").append(result);
        });
    }

    if ($("#MetaverseDailyDrawerUser").length > 0) {
        $.get('/MetaverseDaily/Mobile/opendraweruser?role=' + userRole, function (result) {
            $("#MetaverseDailyDrawerUser").append(result);
        });
    }

    if ($("#MetaverseDailyDrawerSearch").length > 0) {
        $.get('/MetaverseDaily/Mobile/opendrawersearch', function (result) {
            $("#MetaverseDailyDrawerSearch").append(result);
            if ($("#MetaverseDailyTopSearchResults").length > 0) {
                $.get('/MetaverseDaily/Mobile/TopSearchResults', function (result) {
                    $("#MetaverseDailyTopSearchResults").append(result);
                });
            }
        });
    }

    if ($("#MetaverseDailyHeaderNavList").length > 0) {
        $.get('/MetaverseDaily/Mobile/openheadernavlist', function (result) {
            $("#MetaverseDailyHeaderNavList").append(result);
        });
    }

    if ($("#MetaverseDailyRail").length > 0) {
        $.get('/MetaverseDaily/Mobile/rail?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyRail").append(result);
        });
    }

    if ($("#MetaverseDailySubscribeDialog").length > 0) {
        $.get('/MetaverseDaily/Mobile/subscribe', function (result) {
            $("#MetaverseDailySubscribeDialog").append(result);
        });
    }

    if ($("#MainContentOverflow").length > 0) {
        $.get('/MetaverseDaily/Mobile/maincontent', function (result) {
            $("#MainContentOverflow").append(result);
        });
    }

    if ($("#RecommendedBitsContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/recommendedbits', function (result) {
            $("#RecommendedBitsContent").append(result);
        });
    }

    if ($("#MarketBitsContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/marketbits', function (result) {
            $("#MarketBitsContent").append(result);
        });
    }

    if ($("#GlobalLooksContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/globallooks', function (result) {
            $("#GlobalLooksContent").append(result);
        });
    }

    if ($("#OrganizationalContent").length > 0) {
        $.get('/MetaverseDaily/Mobile/organizational', function (result) {
            $("#OrganizationalContent").append(result);
        });
    }

    if ($("#EndPageRelatedContent").length > 0) {
        $.get('/MetaverseDaily/related?basePage=' + basePageName, function (result) {
            $("#EndPageRelatedContent").append(result);
        });
    }

    if ($("#EndPagePromoContent").length > 0) {
        $.get('/MetaverseDaily/endpagepromo', function (result) {
            $("#EndPagePromoContent").append(result);
        });
    }

    if ($("#SingleNewsContent").length > 0) {
        $.get('/MetaverseDaily/singlenews', function (result) {
            $("#SingleNewsContent").append(result);
        });
    }

    if ($("#MetaverseDailyHeroTicker").length > 0) {
        var datetime = new Date().getTime();
        $.get('/Ticker?' + datetime, function (result) {
            $("#MetaverseDailyHeroTicker").append(result);
        });
    }
});