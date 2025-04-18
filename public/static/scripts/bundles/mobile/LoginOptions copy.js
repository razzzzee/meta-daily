
var loginOptionsLoader;
var loginOptionsDialog;
async function RegisterLoginOptionsDialog(loginOptionsDialog, openLoginOptionsDialogActionElement,  closeLoginOptionsDialogActionElement) {
        alert("click");
        /////SetAllLoginOptions(loginOptionsDialog);
        loginOptionsDialog = loginOptionsDialog;
        var openButton = openLoginOptionsDialogActionElement;
        var closeButton  =  closeLoginOptionsDialogActionElement;
        openButton.addEventListener("click", () => {
          alert("click");
          ShowDialog(loginOptionsDialog);
        });
        
        closeButton.addEventListener("click", () => {
          CloseDialog(loginOptionsDialog);
        });
}

/*function SetAllLoginOptions(loginOptionsDialog)
{
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
  var divMetaMaskLoginMenu = loginOptionsDialog.querySelector("#divMetaMaskLoginMenu");
  var divCoinbaseLoginMenu = loginOptionsDialog.querySelector("#divCoinbaseLoginMenu");
  var divCryptoLoginMenu = loginOptionsDialog.querySelector("#divCryptoLoginMenu");
  var divSafeLoginMenu = loginOptionsDialog.querySelector("#divSafeLoginMenu");
  divSocialLoginMenu.addEventListener('click', () => {
      ResetForSocialLogin(divSocialLogin);
  });
}*/

function ResetForSocialLogin(divSocialLogin)
{
      divSocialLogin.style.display = "inline";
}

function displayLoginOptionsLoader()
{
  loginOptionsLoader.classList.add("display");
  setTimeout(() => {
    loginOptionsLoader.classList.remove("display");
  }, 50000);
}

function hideLoginOptionsLoader()
{
  loginOptionsLoader.classList.remove("display");
}


async function ShowDialog(loginOptionsDialog){
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

  divSocialLogin.style.display="inline";

  dialogElement.showModal();
}

async function CloseDialog(dialogElement){
  dialogElement.close();
}