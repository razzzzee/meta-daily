
window.onload = function () {
        RegisterDialog(document.getElementById("MetaverseDailySubscribeDialog"),document.getElementById("OpenSubscriptionDialog"),document.getElementById("CloseSubscriptionDialog"));
        RegisterDialog(document.getElementById("MetaverseDailyMessageUsDialog"),document.getElementById("OpenMessageUsDialog"),document.getElementById("CloseMessageUsDialog"));
        RegisterDialog(document.getElementById("MetaverseDailyMessageUsDialog"),document.getElementById("OpenContactUsDialog"),document.getElementById("CloseMessageUsDialog"));
        RegisterDialog(document.getElementById("MetaverseDailyPartnerWithUsDialog"),document.getElementById("OpenPartnerWithUsDialog"),document.getElementById("ClosePartnerWithUsDialog"));
        //RegisterDialog(document.getElementById("LoginOptionsDialog"),document.getElementById("OpenLoginOptionsDialog"),document.getElementById("CloseLoginOptionsDialog"));
        RegisterDialogFormForSubmit(document.getElementById("SubscriptionForm"), document.getElementById("SubscriptionDialog"));
        RegisterMemberLoginFormForSubmit(document.getElementById("MemberLoginForm"), document.getElementById("divMemberLogin"),document.getElementById("divMemberMenuOptions"));

        require(['core'], function (core) {
            core.init(mlScripts);
        });
        
        $('.fixed-action-btn-shortcuts.click-to-toggle').floatingActionButton({
            direction: 'top',
            hoverEnabled: false
        });
        $('.share-action-btn-left.click-to-toggle').floatingActionButton({
            direction: 'left',
            hoverEnabled: true
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
