var loginOptionsLoader;


async function RegisterLoginOptionsDialog(loginOptionsDialog, openLoginOptionsDialogActionElement,  closeLoginOptionsDialogActionElement) {
  /*var openButton = openLoginOptionsDialogActionElement;
  var closeButton = closeLoginOptionsDialogActionElement;
  var dialog = loginOptionsDialog;
  dialog.returnValue = "Success";

  RegisterAllEvents(dialog);
  
  openButton.addEventListener("click", () => {
    ShowDialog(dialog);
  });
  
  closeButton.addEventListener("click", () => {
    CloseDialog(dialog);
  });*/
}

function ShowDialog(loginOptionsDialog){
  ResetAllLoginOptions(loginOptionsDialog);
  var divSocialLogin = loginOptionsDialog.querySelector("#divSocialLogin");
  var divSocialLoginMenu = loginOptionsDialog.querySelector("#divSocialLoginMenu");
  ShowRespectiveOptions(divSocialLogin, divSocialLoginMenu);

  loginOptionsDialog.showModal();
}

function CloseDialog(loginOptionsDialog){
  loginOptionsDialog.close();
}

async function RegisterAllEvents(loginOptionsDialog){
  var divSocialLoginMenu = loginOptionsDialog.querySelector("#divSocialLoginMenu");
  divSocialLoginMenu.addEventListener("click", () => {
    ResetAllLoginOptions(loginOptionsDialog);
    var divSocialLogin = loginOptionsDialog.querySelector("#divSocialLogin");
    ShowRespectiveOptions(divSocialLogin, divSocialLoginMenu);
  });



  var divMetaMaskLoginMenu = loginOptionsDialog.querySelector("#divMetaMaskLoginMenu");
  divMetaMaskLoginMenu.addEventListener("click", () => {
    ResetAllLoginOptions(loginOptionsDialog);
    var divMetaMaskLogin = loginOptionsDialog.querySelector("#divMetaMaskLogin");
    ShowRespectiveOptions(divMetaMaskLogin,  divMetaMaskLoginMenu);
  });

  var divCoinbaseLoginMenu = loginOptionsDialog.querySelector("#divCoinbaseLoginMenu");
  divCoinbaseLoginMenu.addEventListener("click", () => {
    ResetAllLoginOptions(loginOptionsDialog);
    var divCoinbaseLogin = loginOptionsDialog.querySelector("#divCoinbaseLogin");
    ShowRespectiveOptions(divCoinbaseLogin, divCoinbaseLoginMenu);
  });

  var divCryptoLoginMenu = loginOptionsDialog.querySelector("#divCryptoLoginMenu");
  divCryptoLoginMenu.addEventListener("click", () => {
    ResetAllLoginOptions(loginOptionsDialog);
    var divCryptoLogin = loginOptionsDialog.querySelector("#divCryptoLogin");
    ShowRespectiveOptions(divCryptoLogin, divCryptoLoginMenu);
  });

  var divSafeLoginMenu = loginOptionsDialog.querySelector("#divSafeLoginMenu");
  divSafeLoginMenu.addEventListener("click", () => {
    ResetAllLoginOptions(loginOptionsDialog);
    var divSafeLogin = loginOptionsDialog.querySelector("#divSafeLogin");
    ShowRespectiveOptions(divSafeLogin, divSafeLoginMenu);
  });
}

function ShowRespectiveOptions(divOption, divMenuOption)
{
  divOption.style.display =  "inline";
  divMenuOption.style.backgroundColor =  "white";
}

function ResetAllLoginOptions(loginOptionsDialog){
  var divSocialLogin = loginOptionsDialog.querySelector("#divSocialLogin");
  var divMetaMaskLogin = loginOptionsDialog.querySelector("#divMetaMaskLogin");
  var divCoinbaseLogin = loginOptionsDialog.querySelector("#divCoinbaseLogin");
  var divCryptoLogin = loginOptionsDialog.querySelector("#divCryptoLogin");
  var divSafeLogin = loginOptionsDialog.querySelector("#divSafeLogin");

  divSocialLogin.style.display="none";
  divMetaMaskLogin.style.display="none";
  divCoinbaseLogin.style.display="none";
  divCryptoLogin.style.display="none";
  divSafeLogin.style.display="none";

  var divSocialLoginMenu = loginOptionsDialog.querySelector("#divSocialLoginMenu");
  divSocialLoginMenu.style.backgroundColor   =  "#201f20" ;

  var divMetaMaskLoginMenu = loginOptionsDialog.querySelector("#divMetaMaskLoginMenu");
  divMetaMaskLoginMenu.style.backgroundColor   =  "#201f20" ;

  var divCoinbaseLoginMenu = loginOptionsDialog.querySelector("#divCoinbaseLoginMenu");
  divCoinbaseLoginMenu.style.backgroundColor   =  "#201f20" ;

  var divCryptoLoginMenu = loginOptionsDialog.querySelector("#divCryptoLoginMenu");
  divCryptoLoginMenu.style.backgroundColor   =  "#201f20" ;

  var divSafeLoginMenu = loginOptionsDialog.querySelector("#divSafeLoginMenu");
  divSafeLoginMenu.style.backgroundColor   =  "#201f20" ;
}