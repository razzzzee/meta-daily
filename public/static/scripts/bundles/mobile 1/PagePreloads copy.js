
var urlString = window.location.href;
var url = new URL(urlString);
var subscriptionActivationValue = url.searchParams.get("subscription");
var partnershipVerificationValue = url.searchParams.get("partnershipVerification");
var merchantRequestVerificationValue = url.searchParams.get("merchantRequestVerification");

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