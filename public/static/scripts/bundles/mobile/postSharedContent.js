var userName;
var userId;
var userRole;
var token;
var isAuthorized = 0;
var avatar;

function setSessionStorage() {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userRole', userRole);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('avatar', avatar);
    sessionStorage.setItem('isAuthorized', isAuthorized);
}

function clearSessionStorage() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('userRole', 'Default');
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('isAuthorized', 0);
}

function SignOut() {
    sessionStorage.setItem('signout-status', 1);
    clearSessionStorage();
    window.history.go(1);
    window.location.href = '/home';
}


async function RunBindControls() {
    var arrDownloadLinks = [
        ['/MetaverseDaily/recommendedbits', 'RecommendedBitsContent'],
        ['/MetaverseDaily/organizational', 'OrganizationalContent'],
        ['/MetaverseDaily/endpagepromo', 'EndPagePromoContent'],
        ['/MetaverseDaily/singlenews', 'SingleNewsContent']
    ];

    await FetchHTML(arrDownloadLinks, 0, arrDownloadLinks.length);
}

async function FetchHTML(arr, index, maxIndex) {
    if ($("#" + arr[index][1]).length > 0) {
        await fetch(arr[index][0], {
            method: 'GET',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                if (data.length > 0) {   
                    $("#" + arr[index][1]).append(data);
                    if (index == arr.length -1 ) {
                        require(['core'], function (core) {
                            core.init(mlScripts);
                        });
                        return;
                    }
                    FetchHTML(arr, index + 1, arr.length);
                }
                else {
                    alert("Error.");
                    return;
                }
            });
    }
    else{
        if (index == arr.length - 1) {
            require(['core'], function (core) {
                core.init(mlScripts);
            });
            return;
        }
        FetchHTML(arr, index + 1, arr.length);
    }
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

    if ($("#MetaverseDailyHeroContent").length > 0) {
        $.get('/MetaverseDaily/herocontent?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyHeroContent").append(result);
        });
    }

    if ($("#MetaverseDailyHeroSliderContent").length > 0) {
        $.get('/MetaverseDaily/heroslidercontent?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyHeroSliderContent").append(result);
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

    if ($("#MetaverseDailyHeaderBrand").length > 0) {
        $.get('/MetaverseDaily/headerbrand', function (result) {
            $("#MetaverseDailyHeaderBrand").append(result);
        });
    }

    if ($("#MetaverseDailyDrawerMenu").length > 0) {
        $.get('/MetaverseDaily/opendrawermenu?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyDrawerMenu").append(result);
            if ($("#btnDrawerInsights").length > 0) {
                $("#btnDrawerInsights").bind("click", () => {  
                    ShowInsightsExclusiveMembershipDialog();
                });
            }
        });
    }

    if ($("#MetaverseDailyDrawerUser").length > 0) {
        $.get('/MetaverseDaily/opendraweruser?role=' + sessionStorage.getItem('userRole'), function (result) {
            $("#MetaverseDailyDrawerUser").append(result);
        });
    }

    if ($("#MetaverseDailyDrawerSearch").length > 0) {
        $.get('/MetaverseDaily/opendrawersearch', function (result) {
            $("#MetaverseDailyDrawerSearch").append(result);
            if ($("#MetaverseDailyTopSearchResults").length > 0) {
                $.get('/MetaverseDaily/TopSearchResults', function (result) {
                    $("#MetaverseDailyTopSearchResults").append(result);
                });
            }
        });
    }

    if ($("#MetaverseDailyHeaderNavList").length > 0) {
        $.get('/MetaverseDaily/openheadernavlist', function (result) {
            $("#MetaverseDailyHeaderNavList").append(result);
        });
    }

    if ($("#MetaverseDailyRail").length > 0) {
        $.get('/MetaverseDaily/rail?basePageKey=' + basePageKey + '&pageKey=' + pageKey, function (result) {
            $("#MetaverseDailyRail").append(result);
            if ($("#btnRailInsights").length > 0) {
                $("#btnRailInsights").bind("click", () => {  
                    ShowInsightsExclusiveMembershipDialog();
                });
            }
            if(document.querySelector('meta[property="og:announcement"]') != null)
            {
                var announcement = document.querySelector('meta[property="og:announcement"]').content;
                var showAnnouncement = document.querySelector('meta[property="og:show-announcement"]').content;
                if(announcement == "1")
                {
                    $.get('/MetaverseDaily/Announcements?basePage='+basePageName, function(result) {
                        $("#AnnouncementDialog").append(result);   
                        var announcementDialog = document.getElementById('AnnouncementDialog');
                        var closeAnnouncementDialog = document.getElementById('CloseAnnouncementDialog');
                        // Form cancel button closes the dialog box
                        closeAnnouncementDialog.addEventListener("click", () => {
                            announcementDialog.close();
                        });
                        if(basePageName == 'Marketplace')
                        {
                            SetMarketplaceJoinWaitlist();
                        }
                        if(showAnnouncement == "1")
                        {
                            announcementDialog.showModal();
                            announcementDialog.scrollTop = 0;
                        }
                    });
                }
            }
        });
    }

    if ($("#UpdatesContent").length > 0) {
        $.get('/MetaverseDaily/updates?basePage=' + basePageName, function (result) {
            $("#UpdatesContent").append(result);
        });
    }

    if ($("#RecommendedContent").length > 0) {
        $.get('/MetaverseDaily/recommended?basePage=' + basePageName, function (result) {
            $("#RecommendedContent").append(result);
        });
    }


    if ($("#EndPageRelatedContent").length > 0) {
        $.get('/MetaverseDaily/related?basePage=' + basePageName, function (result) {
            $("#EndPageRelatedContent").append(result);
        });
    }
    
    RunBindControls();
});