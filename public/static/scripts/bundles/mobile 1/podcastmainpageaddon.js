$(document).ready(function () {
    const podcastPublishPodcastDateCalendarify = new Calendarify('#txtPodcastPublishPodcastDate', {
        position: "bottom",
        isDark: true,
        quickActions: false,
        locale: { // You can set locale for calendar
            format: "DD-MM-YYYY"
        }
    });
    podcastPublishPodcastDateCalendarify.init();
});