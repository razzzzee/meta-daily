async function RegisterAppDownloadDialog(appDownloadDialog, openAppDownloadDialogActionElement, closeAppDownloadDialogActionElement, doneAppDownloadDialogActionElement) {
  var openButton = openAppDownloadDialogActionElement;
  var closeButton = closeAppDownloadDialogActionElement;
  var dialog = appDownloadDialog;
  var doneButton = doneAppDownloadDialogActionElement;

  dialog.returnValue = "Success";

  openButton.addEventListener("click", () => {
    ShowDialog(dialog);
  });

  closeButton.addEventListener("click", () => {
    CloseDialog(dialog);
  });

  doneButton.addEventListener("click", () => {
    CloseDialog(dialog);
  });
}

function ShowDialog(appDownloadDialog) {
  appDownloadDialog.showModal();
}

function CloseDialog(appDownloadDialog) {
  appDownloadDialog.close();
}
