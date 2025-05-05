if ("signin-status" in sessionStorage) {
    if (sessionStorage.getItem('signin-status').length > 0) {
        butterup.toast({
            title: 'Message',
            message: 'You have successfully signed in!',
            type: 'success',
            icon: true,
            dismissable: true
        });
        window.scrollTo({
            top: 100,
            right: 100,
            behavior: 'smooth'
        });
        sessionStorage.removeItem('signin-status');

    }
}

if ("signout-status" in sessionStorage) {
    if (sessionStorage.getItem('signout-status').length > 0) {
        butterup.toast({
            title: 'Message',
            message: 'You have successfully signed out!',
            type: 'success',
            icon: true,
            dismissable: true
        });
        window.scrollTo({
            top: 100,
            right: 100,
            behavior: 'smooth'
        });
        sessionStorage.removeItem('signout-status');
    }
}




var urlString = window.location.href;
var url = new URL(urlString);
var actionValue = url.searchParams.get("action");
var subscriptionActivationValue = url.searchParams.get("subscription");
var partnershipVerificationValue = url.searchParams.get("partnershipVerification");
var merchantRequestVerificationValue = url.searchParams.get("merchantRequestVerification");
var councilRequestVerificationValue = url.searchParams.get("councilRequestVerification");
var studentRequestVerificationValue = url.searchParams.get("studentRequestVerification");

window.onload = function () {
  if (actionValue == 'subscribe') {
    ShowSubscribeNewsletterDialog();
  }
}


if (subscriptionActivationValue == 'true') {
  butterup.toast({
    title: 'Message',
    message: 'Your subscription is activated.',
    type: 'success',
    icon: true,
    dismissable: true
  });
}

if (partnershipVerificationValue == 'true') {
  butterup.toast({
    title: 'Message',
    message: 'Your Partnership request is verified.',
    type: 'success',
    icon: true,
    dismissable: true
  });
}
else if(partnershipVerificationValue == 'error') {
  butterup.toast({
    title: 'Message',
    message: 'System error while partner request verification. Please try after sometime.',
    type: 'error',
    icon: true,
    dismissable: true
  });
}



if (merchantRequestVerificationValue == 'true') {
  butterup.toast({
    title: 'Message',
    message: 'Your Merchant request is verified.',
    type: 'success',
    icon: true,
    dismissable: true
  });
}
else if(merchantRequestVerificationValue == 'error') {
  butterup.toast({
    title: 'Message',
    message: 'System error while merchant request verification. Please try after sometime.',
    type: 'error',
    icon: true,
    dismissable: true
  });
}



if (councilRequestVerificationValue == 'true') {
  butterup.toast({
    title: 'Message',
    message: 'Your Council request is verified.',
    type: 'success',
    icon: true,
    dismissable: true
  });
}
else if(councilRequestVerificationValue == 'error') {
  butterup.toast({
    title: 'Message',
    message: 'System error while council request verification. Please try after sometime.',
    type: 'error',
    icon: true,
    dismissable: true
  });
}


if (studentRequestVerificationValue == 'true') {
  butterup.toast({
    title: 'Message',
    message: 'Your Student request is verified.',
    type: 'success',
    icon: true,
    dismissable: true
  });
}
else if(studentRequestVerificationValue == 'error') {
  butterup.toast({
    title: 'Message',
    message: 'System error while student request verification. Please try after sometime.',
    type: 'error',
    icon: true,
    dismissable: true
  });
}