$(function() { 
    const calendarify = new Calendarify('.date-picker', {
        position: "bottom",
        isDark: true,
        quickActions: false,
        locale: { // You can set locale for calendar
            format: "DD-MM-YYYY"
        }
    });
    calendarify.init();
});