Royal_Preloader.config({
  mode:           'logo', // 'number', "text" or "logo"
  logo:           '/static/Image/metaversedaily.png',
  timeout:        0,
  showInfo:       true,
  opacity:        1,
  background:     ['#FFFFFF']
});

function CopyLinkToast()
{
  butterup.toast({
      title:'Message',
      message:'Link  Copied for sharing',
      type:'success',
      icon: true,
      dismissable: true

  });
}