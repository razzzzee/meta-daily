var urlString = window.location.href;
var url = new URL(urlString);
var actionValue = url.searchParams.get("action");

if (actionValue == 'subscribe') {
  ShowSubscribeNewsletterDialog();
}
