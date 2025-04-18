$(document).ready(function(){ 
    if(document.querySelector('meta[property="og:announcement"]') != null)
    {
        var basePageName = document.querySelector('meta[property="og:base_page_name"]').content;
        var pageName = document.querySelector('meta[property="og:page_name"]').content;
        var announcement = document.querySelector('meta[property="og:announcement"]').content;
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
                announcementDialog.showModal();    
            });
        }
    }
});
