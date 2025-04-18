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


    $.get('/MetaverseDaily/herocontent', function (result) {
        $("#MetaverseDailyHeroContent").append(result);
    });

    $.get('/MetaverseDaily/heroslidercontent', function (result) {
        $("#MetaverseDailyHeroSliderContent").append(result);
    });

    $.get("/MetaverseDaily/footercontent", { token: sessionStorage.getItem('token'), userRole: sessionStorage.getItem('userRole'), isAuthorized: sessionStorage.getItem('isAuthorized'), userName: sessionStorage.getItem('userName') })
        .done(function (result) {
            $("#MetaverseDailyFooterContent").append(result);
            $.get('/MetaverseDaily/TrendingTopics', function (result) {
                $("#MetaverseDailyTrendingTopics").append(result);
            });
        });


$.get('/MetaverseDaily/headerbrand', function (result) {
        $("#MetaverseDailyHeaderBrand").append(result);
    });

    $.get('/MetaverseDaily/opendrawermenu?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
        $("#MetaverseDailyDrawerMenu").append(result);
    });

    $.get('/MetaverseDaily/opendraweruser?role=' + userRole, function (result) {
        $("#MetaverseDailyDrawerUser").append(result);
    });

    $.get('/MetaverseDaily/opendrawersearch', function (result) {
        $("#MetaverseDailyDrawerSearch").append(result);
        $.get('/MetaverseDaily/TopSearchResults', function (result) {
            $("#MetaverseDailyTopSearchResults").append(result);
        });
    });

    $.get('/MetaverseDaily/openheadernavlist', function (result) {
        $("#MetaverseDailyHeaderNavList").append(result);
    });

 $.get('/MetaverseDaily/rail?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
        $("#MetaverseDailyRail").append(result);
    });

    $.get('/MetaverseDaily/recommended?basePage=' + basePageName, function (result) {
        $("#RecommendedContent").append(result);
    });

    if ($("#RecommendedBitsContent").length > 0) {
        $.get('/MetaverseDaily/recommendedbits', function (result) {
            $("#RecommendedBitsContent").append(result);
        });
    }

    if ($("#OrganizationalContent").length > 0) {
        $.get('/MetaverseDaily/organizational', function (result) {
            $("#OrganizationalContent").append(result);
        });
    }

    $.get('/MetaverseDaily/related?basePage=' + basePageName, function (result) {
        $("#EndPageRelatedContent").append(result);
    });

    $.get('/MetaverseDaily/endpagepromo', function (result) {
        $("#EndPagePromoContent").append(result);
    });



    $.get('/MetaverseDaily/leftsidefirstcontent', function (result) {
        $("#LeftSideFirstContent").append(result);
    });

    $.get('/MetaverseDaily/leftsidesecondcontent', function (result) {
        $("#LeftSideSecondContent").append(result);
    });

    $.get('/MetaverseDaily/leftsidecontentfirstpromo', function (result) {
        $("#LeftSideContentPromo_1").append(result);
    });

    $.get('/MetaverseDaily/leftsidecontentsecondpromo', function (result) {
        $("#LeftSideContentPromo_2").append(result);
    });

    $.get('/MetaverseDaily/rightsidecontentfirstpromo', function (result) {
        $("#RightSideContentPromo_1").append(result);
    });

    var datetime = new Date().getTime();
    $.get('/Ticker?' + datetime, function (result) {
        $("#MetaverseDailyHeroTicker").append(result);
    });

});