
var MainContent;
var MainContentOverflow;
var MainContentOverflowContent;
var MainContentOverflowHeader;
var HeroContent;

var LeftSideRail;
var LeftSideContent;
var LeftSideContentHeader_1;
var LeftSideContent_1;
var LeftSideContentHeader_2;
var LeftSideContent_2;
var LeftSideContentPromo_1;
var LeftSideContentPromo_2;

var RightSideContent;
var RightSideContentHeader_1;
var RightSideContent_1;
var RightSideContentHeader_2;
var RightSideContent_2;
var RightContentPromo_1;
var RightContentPromo_2;

var StandardForImageHeight;
var RightSideStandardImageWidth

var MainContentHeight;
var MainContentOverflowHeight;
var MainContentOverflowContentHeight;
var MainContentOverflowHeaderHeight;
var HeroContentHeight;

var LeftSideRailHeight;
var LeftSideContentHeight;
var LeftSideContentHeader_1_Height;
var LeftSideContent_1_Height;
var LeftSideContentHeader_2_Height;
var LeftSideContent_2_Height;
var LeftSideContentPromo_1_Height;
var LeftSideContentPromo_2_Height;

var RightSideContentHeight;
var RightSideContentHeader_1_Height;
var RightSideContent_1_Height;
var RightSideContentHeader_2_Height;
var RightSideContent_1_Height;
var RightSideContentPromo_1_Height;
var RightSideContentPromo_2_Height;

var LeftSideContent_1_Scroll_Start;
var LeftSideContent_1_Scroll_End;
var RightSideContent_2_Scroll_Start;
var RightSideContent_2_Scroll_End;
window.onload = function () {
        RegisterDialog(document.getElementById("MetaverseDailySubscribeDialog"),document.getElementById("OpenSubscriptionDialog"),document.getElementById("CloseSubscriptionDialog"));
        RegisterDialog(document.getElementById("MetaverseDailyMessageUsDialog"),document.getElementById("OpenMessageUsDialog"),document.getElementById("CloseMessageUsDialog"));
        RegisterDialog(document.getElementById("MetaverseDailyPartnerWithUsDialog"),document.getElementById("OpenPartnerWithUsDialog"),document.getElementById("ClosePartnerWithUsDialog"));
        //RegisterDialog(document.getElementById("LoginOptionsDialog"),document.getElementById("OpenLoginOptionsDialog"),document.getElementById("CloseLoginOptionsDialog"));
        RegisterDialogFormForSubmit(document.getElementById("SubscriptionForm"), document.getElementById("SubscriptionDialog"));
        RegisterMemberLoginFormForSubmit(document.getElementById("MemberLoginForm"), document.getElementById("divMemberLogin"),document.getElementById("divMemberMenuOptions"));
        RegisterLoginOptionsDialog(document.getElementById("LoginOptionsDialog"),document.getElementById("OpenLoginOptionsDialog"),document.getElementById("CloseLoginOptionsDialog"));

        require(['core'], function (core) {
            core.init(mlScripts);
        });



        HeroContent = document.getElementById("MetaverseDailyHeroContent");

        LeftSideRail = document.getElementById("LeftSideRail");
        LeftSideContent = document.getElementById("LeftSideContent");
        LeftSideContentHeader_1 = document.getElementById("LeftSideContentHeader_1");
        LeftSideContent_1 = document.getElementById("LeftSideContent_1");
        LeftSideFirstContent = document.getElementById("LeftSideFirstContent");
        LeftSideContentHeader_2 = document.getElementById("LeftSideContentHeader_2");
        LeftSideContent_2 = document.getElementById("LeftSideContent_2");
        LeftSideContentPromo_1 = document.getElementById("LeftSideContentPromo_1");
        LeftSideContentPromo_2 = document.getElementById("LeftSideContentPromo_2");

        RightSideContent = document.getElementById("RightSideContent");
        RightSideContentHeader_1 = document.getElementById("RightSideContentHeader_1");
        RightSideContent_1 = document.getElementById("RightSideContent_1");
        RightSideContentHeader_2 = document.getElementById("RightSideContentHeader_2");
        RightSideContent_2 = document.getElementById("RightSideContent_2");
        RightContentPromo_1 = document.getElementById("RightSideContentPromo_1");
        RightContentPromo_2 = document.getElementById("RightSideContentPromo_2");


        HeroContentHeight = HeroContent.getBoundingClientRect().height;

        LeftSideRailHeight = LeftSideRail.getBoundingClientRect().height;
        LeftSideContentHeight = LeftSideContent.getBoundingClientRect().height;
        LeftSideContentHeader_1_Height = LeftSideContentHeader_1.getBoundingClientRect().height;
        LeftSideContent_1_Height = LeftSideContent_1.getBoundingClientRect().height;
        LeftSideContentHeader_2_Height = LeftSideContentHeader_2.getBoundingClientRect().height;
        LeftSideContent_2_Height = LeftSideContent_2.getBoundingClientRect().height;
        LeftSideContentPromo_1_Height = LeftSideContentPromo_1.getBoundingClientRect().height;
        LeftSideContentPromo_2_Height = LeftSideContentPromo_2.getBoundingClientRect().height;


        RightSideContentHeight = RightSideContent.getBoundingClientRect().height;
        RightSideContentHeader_1_Height = RightSideContentHeader_1.getBoundingClientRect().height;
        RightSideContent_1_Height = RightSideContent_1.getBoundingClientRect().height;
        RightSideContentHeader_2_Height = RightSideContentHeader_2.getBoundingClientRect().height;
        RightSideContent_2_Height = RightSideContent_2.getBoundingClientRect().height;
        RightSideContentPromo_1_Height = RightSideContentPromo_1.getBoundingClientRect().height;
        RightSideContentPromo_2_Height = RightSideContentPromo_2.getBoundingClientRect().height;
        

      

        LeftSideContent_1_Scroll_Start = HeroContentHeight + LeftSideRailHeight + LeftSideContentPromo_1_Height;
        //alert(LeftSideContentHeader_1_Height);
        //alert(LeftSideContent_1_Height);
        
        LeftSideContent_1_Scroll_End = LeftSideContent_1_Scroll_Start + LeftSideContentHeader_1_Height + LeftSideContent_1_Height;
        
        LeftSideContent_2_Scroll_Start = LeftSideContent_1_Scroll_End + LeftSideContentPromo_2_Height;
        LeftSideContent_2_Scroll_End = LeftSideContent_2_Scroll_Start + LeftSideContentHeader_2_Height + LeftSideContent_2_Height;
    
        RightSideContent_1_Scroll_Start = HeroContentHeight + RightSideContentPromo_1_Height;
        RightSideContent_1_Scroll_End = RightSideContent_1_Scroll_Start + RightSideContentHeader_1_Height + RightSideContent_1_Height;
        //alert(RightSideContent_1_Height);
        RightSideContent_2_Scroll_Start = RightSideContent_1_Scroll_End + RightSideContentPromo_2_Height;
        RightSideContent_2_Scroll_End = RightSideContent_2_Scroll_Start + RightSideContentHeader_2_Height + RightSideContent_2_Height;  
    
        alert('test1')
        $('.fixed-action-btn-shortcuts.click-to-toggle').floatingActionButton({
                        direction: 'top',
                        hoverEnabled: false
        });
}

$('.global-container').click(function(event) {       
                const viaBtn = document.querySelector('.fixed-action-btn-shortcuts');
                let evt = new MouseEvent('click', {
                        bubbles: true,
                        cancelable: false,
                        view: window, 
                        button:1,
                });
                viaBtn.dispatchEvent(evt);  
});


$(document).ready(function() {
    $(window).scroll(function() {                  // assign scroll event listener  
        var currentScroll = $(window).scrollTop(); // get current position
        if (currentScroll >= LeftSideContent_1_Scroll_Start && currentScroll <= LeftSideContent_1_Scroll_End) {           // apply position: fixed if you
            LeftSideContentHeader_1.style.top = "8%";
            LeftSideContentHeader_1.style.opacity = "1";
            LeftSideContentHeader_1.style.height = "100px";
            LeftSideContentHeader_1.style.transition ="top 1s ease";
            LeftSideContentHeader_1.style.position = "fixed";
            LeftSideContentHeader_1.style.boxShadow ="0 4px 2px -2px rgba(0, 0, 0, 0.2)";
        }
        else if(currentScroll >=LeftSideContent_1_Scroll_End)
        {
            LeftSideContentHeader_1.style.top = "0%";
            LeftSideContentHeader_1.style.position = "relative";
            LeftSideContentHeader_1.style.backgroundColor = "white";
            LeftSideContentHeader_1.style.opacity = "0";
        }
        else {                                   // apply position: static
            LeftSideContentHeader_1.style.position = "relative";
            LeftSideContentHeader_1.style.top = "0%";
            LeftSideContentHeader_1.style.transition ="top 2s ease";
            LeftSideContentHeader_1.style.opacity = "1";
            LeftSideContentHeader_1.style.backgroundColor = "white";
            LeftSideContentHeader_1.style.boxShadow ="none";
        }

        if (currentScroll >= LeftSideContent_2_Scroll_Start && currentScroll <= LeftSideContent_2_Scroll_End) {           // apply position: fixed if you
            LeftSideContentHeader_2.style.top = "8%";
            LeftSideContentHeader_2.style.opacity = "1";
            LeftSideContentHeader_2.style.height = "100px";
            LeftSideContentHeader_2.style.transition ="top 1s ease";
            LeftSideContentHeader_2.style.position = "fixed";
            LeftSideContentHeader_2.style.boxShadow ="0 4px 2px -2px rgba(0, 0, 0, 0.2)";
        }
        else if(currentScroll >= LeftSideContent_2_Scroll_End)
        {
            LeftSideContentHeader_2.style.top = "0%";
            LeftSideContentHeader_2.style.position = "relative";
            LeftSideContentHeader_2.style.backgroundColor = "white";
            LeftSideContentHeader_2.style.opacity = "0";
        }
        else {                                   // apply position: static
            LeftSideContentHeader_2.style.position = "relative";
            LeftSideContentHeader_2.style.top = "0%";
            LeftSideContentHeader_2.style.transition ="top 2s ease";
            LeftSideContentHeader_2.style.opacity = "1";
            LeftSideContentHeader_2.style.backgroundColor = "white";
            LeftSideContentHeader_2.style.boxShadow ="none";
        }


        if (currentScroll >= RightSideContent_1_Scroll_Start && currentScroll <= RightSideContent_1_Scroll_End) {           // apply position: fixed if you
            RightSideContentHeader_1.style.top = "8%";
            RightSideContentHeader_1.style.left = "76.5%";
            RightSideContentHeader_1.style.opacity = "1";
            RightSideContentHeader_1.style.height = "100px";
            RightSideContentHeader_1.style.transition ="top 1s ease";
            RightSideContentHeader_1.style.position = "fixed";
            RightSideContentHeader_1.style.boxShadow ="0 4px 2px -2px rgba(0, 0, 0, 0.2)";
            RightSideContentHeader_1.style.zIndex="15";
        }
        else if(currentScroll >= RightSideContent_1_Scroll_End)
        {
            RightSideContentHeader_1.style.top = "0%";
            RightSideContentHeader_1.style.position = "relative";
            RightSideContentHeader_1.style.left = "0%";
            RightSideContentHeader_1.style.backgroundColor = "white";
            RightSideContentHeader_1.style.opacity = "0";
        }
        else {                                   // apply position: static
            RightSideContentHeader_1.style.position = "relative";
            RightSideContentHeader_1.style.top = "0%";
            RightSideContentHeader_1.style.left = "0%";
            RightSideContentHeader_1.style.transition ="top 2s ease";
            RightSideContentHeader_1.style.opacity = "1";
            RightSideContentHeader_1.style.backgroundColor = "white";
            RightSideContentHeader_1.style.boxShadow ="none";
            RightSideContentHeader_1.style.zIndex="0";
        }


        if (currentScroll >= RightSideContent_2_Scroll_Start && currentScroll <= RightSideContent_2_Scroll_End) {           // apply position: fixed if you
            RightSideContentHeader_2.style.top = "8%";
            RightSideContentHeader_2.style.left = "76.5%";
            RightSideContentHeader_2.style.opacity = "1";
            RightSideContentHeader_2.style.height = "100px";
            RightSideContentHeader_2.style.transition ="top 1s ease";
            RightSideContentHeader_2.style.position = "fixed";
            RightSideContentHeader_2.style.boxShadow ="0 4px 2px -2px rgba(0, 0, 0, 0.2)";
            RightSideContentHeader_2.style.zIndex="15";
        }
        else if(currentScroll >= RightSideContent_2_Scroll_End)
        {
            RightSideContentHeader_2.style.top = "0%";
            RightSideContentHeader_2.style.position = "relative";
            RightSideContentHeader_2.style.left = "0%";
            RightSideContentHeader_2.style.backgroundColor = "white";
            RightSideContentHeader_2.style.opacity = "0";
        }
        else {                                   // apply position: static
            RightSideContentHeader_2.style.position = "relative";
            RightSideContentHeader_2.style.top = "0%";
            RightSideContentHeader_2.style.left = "0%";
            RightSideContentHeader_2.style.transition ="top 2s ease";
            RightSideContentHeader_2.style.opacity = "1";
            RightSideContentHeader_2.style.backgroundColor = "white";
            RightSideContentHeader_2.style.boxShadow ="none";
            RightSideContentHeader_2.style.zIndex="0";
        }


       /* if (currentScroll >= MainPrimaryBlockHeight+HeroContentHeight && currentScroll <= (MainContentHeight+MainPrimaryBlockHeight+HeroContentHeight)) {           // apply position: fixed if you   
            MainContentHeader.style.top = "8%";
            MainContentHeader.style.width="50%";
            MainContentHeader.style.height = "100px";
            MainContentHeader.style.transition ="top .5s ease";
            MainContentHeader.style.position = "fixed";
            MainContentHeader.style.opacity = "1";
            MainContentHeader.style.boxShadow ="0 4px 2px -2px rgba(0, 0, 0, 0.2)";
            MainContentHeader.style.zIndex="26";
        }
        else if(currentScroll >= MainContentHeight+MainPrimaryBlockHeight+HeroContentHeight)
        {
            MainContentHeader.style.top = "0%";
            MainContentHeader.style.backgroundColor = "white";
            MainContentHeader.style.position = "relative";
            MainContentHeader.style.opacity = "0";
        }
        else {                                  // apply position: static
            MainContentHeader.style.top = "0%";
            MainContentHeader.style.width="100%";
            MainContentHeader.style.transition ="top 1s ease";
            MainContentHeader.style.backgroundColor = "white";
            MainContentHeader.style.position = "relative";
            MainContentHeader.style.opacity = "1";
            MainContentHeader.style.boxShadow ="none";
            MainContentHeader.style.zIndex="0";
        }*/
    });        
});


