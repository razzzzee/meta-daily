window.onload = function () {
  var urlString = window.location.href; // www.test.com?filename=test
  var url = new URL(urlString);
  var value = url.searchParams.get("subscription");
  if(value=='true')
  {
    butterup.toast({
      title:'Message',
      message:'Your subscription is activated.',
      type:'success',
      icon: true,
      dismissable: true
    });
  }
}