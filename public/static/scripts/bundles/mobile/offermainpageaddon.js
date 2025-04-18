$(document).ready(function () {
    const offerPublishOfferStartDateCalendarify = new Calendarify('#txtOfferPublishOfferStartDate', {
        position: "bottom",
        isDark: true,
        quickActions: false,
        locale: { // You can set locale for calendar
            format: "DD-MM-YYYY"
        }
    });
    offerPublishOfferStartDateCalendarify.init();
}); 