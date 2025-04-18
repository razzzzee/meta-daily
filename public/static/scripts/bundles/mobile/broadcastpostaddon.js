
$(document).ready(function () {
    const broadcastPublishBroadcastDateCalendarify = new Calendarify('#txtBroadcastPublishBroadcastDate', {
        position: "bottom",
        isDark: true,
        quickActions: false,
        locale: { // You can set locale for calendar
            format: "DD-MM-YYYY"
        }
    });
    broadcastPublishBroadcastDateCalendarify.init();
});
