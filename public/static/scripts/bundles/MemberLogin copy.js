
var memberLoginLoader;
var memberLoginForm;
var memberLogin;
var memberMenuOptions;
async function RegisterMemberLoginFormForSubmit(formElement, divMemberLogin) {
        memberLoginForm = formElement;
        memberLogin = divMemberLogin;
        memberMenuOptions = divMemberMenuOptions;
        memberLoginLoader = formElement.querySelector("#MemberLoginLoader");
        formElement.addEventListener('submit', () => {
          handleMemberLoginForm(event, formElement)
        });
}

function displayMemberLoginLoader()
{
  memberLoginLoader.classList.add("display");
  setTimeout(() => {
    memberLoginLoader.classList.remove("display");
  }, 50000);
}

function hideMemberLoginLoader()
{
  memberLoginLoader.classList.remove("display");
}

async function handleMemberLoginForm(event, formElement) { 
  event.preventDefault(); 
  memberLoginForm.querySelector("#btnMemberLogin").disabled = true;
  displayMemberLoginLoader();
  var email = memberLoginForm.querySelector("#txtMemberEmail").value;
  var pass = memberLoginForm.querySelector("#txtMemberPassword").value;
  await fetch('/MemberLogin/'+email+'/'+pass).then((response) => response.text())
  .then((body) => {
      if(body=='SUCCESS'){
        hideMemberLoginLoader();
        ResetMemberLoginFormControls(); 
        memberLogin.style.display="none";
        memberMenuOptions.style.display = "inline";
        butterup.toast({
          title:'Message',
          message:'You are logged in.',
          type:'success',
          icon: true,
          dismissable: true
        });
      }
      else if(body=='INVALID')
      {
        hideMemberLoginLoader();
        ResetMemberLoginFormControls();     
        butterup.toast({
          title:'Message',
          message:'Invalid Login Attempt.',
          type:'error',
          icon: true,
          dismissable: true
        });
      }
      else
      {
        hideMemberLoginLoader();
        ResetMemberLoginFormControls(); 
        butterup.toast({
          title:'Message',
          message:'System Error.',
          type:'error',
          icon: true,
          dismissable: true
        });
      }
  });

} 

function ResetMemberLoginFormControls()
{
  memberLoginForm.querySelector("#txtMemberEmail").value="";
  memberLoginForm.querySelector("#txtMemberPassword").value="";
  memberLoginForm.querySelector("#btnMemberLogin").disabled = false;
}