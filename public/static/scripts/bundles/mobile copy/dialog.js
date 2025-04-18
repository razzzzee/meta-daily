async function RegisterDialog(dialogElement, openDialogActionElement,  closeDialogActionElement) {
        var openButton = openDialogActionElement;
        var closeButton = closeDialogActionElement;
        var dialog = dialogElement;
        dialog.returnValue = "Success";
        
        // Update button opens a modal dialog
        //if(dialogElement.)
        if(openButton != null){
          openButton.addEventListener("click", () => {
            if(dialog.id=="SubscriptionDialog")
            {
              dialog.querySelector("#txtSubscribeFullName").value="";
              dialog.querySelector("#txtSubscribeEmail").value="";
              dialog.querySelector("#SubscribeCaptcha").value="";
              var datetime=new Date().getTime();
              form.querySelector("#btnSubscribeSubmit").disabled = false;
              dialog.querySelector("#SubscribeInvalidCaptchaMessage").style.display="none";
              dialog.querySelector("#SubscribeCaptchaImage").style.backgroundImage="url('/generate/captcha.png?"+datetime+"')";
            }
            dialog.showModal();
          });
          
          // Form cancel button closes the dialog box
          closeButton.addEventListener("click", () => {
            CloseDialog(dialog);
          });
      }
}

async function CloseDialog(dialogElement){
        dialogElement.close();
}