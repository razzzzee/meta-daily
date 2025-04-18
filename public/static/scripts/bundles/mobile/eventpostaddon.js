
$(document).ready(function () {
    const eventPublishEventDateCalendarify = new Calendarify('#txtEventPublishEventDate', {
        position: "bottom",
        isDark: true,
        quickActions: false,
        locale: { // You can set locale for calendar
            format: "DD-MM-YYYY"
        }
    });
    eventPublishEventDateCalendarify.init();
});
