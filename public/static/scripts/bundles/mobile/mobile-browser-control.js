if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    window.location.replace("https://www.metaversedaily.world");
    console.log("mobile device");
} else {
    // false for not mobile device
    console.log("no mobile device");
}