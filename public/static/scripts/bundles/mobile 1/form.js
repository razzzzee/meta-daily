
var loader;
var form;
var dialog;
async function RegisterDialogFormForSubmit(formElement, dialogElement) {
        form = formElement;
        dialog = dialogElement;
        if(form != null){
          if(dialogElement != null){
            loader = dialogElement.querySelector("#SubscribeLoader");
          }
          form.addEventListener('submit', () => {
            handleForm(event, dialogElement)
          });
      }
}

//const loader = document.querySelector("#loader");

function displayLoader()
{
  loader.classList.add("display");
  setTimeout(() => {
    loader.classList.remove("display");
  }, 50000);
}

function hideLoader()
{
  loader.classList.remove("display");
}

async function handleForm(event, dialogElement) { 
  alert('test');
  event.preventDefault(); 
  form.querySelector("#btnSubscribeSubmit").disabled = true;
  displayLoader();
  var captcha = form.querySelector("#SubscribeCaptcha").value;
  var email = form.querySelector("#txtSubscribeEmail").value;
  var fullname = form.querySelector("#txtSubscribeFullName").value;
  await fetch('/subscribe/'+fullname+'/'+email+'/'+captcha).then((response) => response.text())
  .then((body) => {
      if(body=='SUCCESS'){
        hideLoader();
        dialogElement.close();
        butterup.toast({
          title:'Message',
          message:'You are subscribed. Please check your mail for confirmation.',
          type:'success',
          icon: true,
          dismissable: true
        });
      }
      else if(body=='INVALID-CAPTCHA')
      {
        hideLoader();
        ResetFormControls(); 
        form.querySelector("#btnSubscribeSubmit").disabled = false;
        form.querySelector("#SubscribeInvalidCaptchaMessage").style.display="inline";
        var datetime=new Date().getTime();
        form.querySelector("#SubscribeCaptchaImage").style.backgroundImage="url('/generate/captcha.png?"+datetime+"')";
      }
      else if(body=='EMAIL-SUBSCRIBED')
      {
        hideLoader();
        dialogElement.close();
        ResetFormControls(); 
        butterup.toast({
          title:'Message',
          message:'Subcription for this email is already active.',
          type:'error',
          icon: true,
          dismissable: true
        });
      }
      else
      {
        hideLoader();
        dialogElement.close();
        ResetFormControls(); 
        butterup.toast({
          title:'Message',
          message:'System Error.',
          type:'error',
          icon: true,
          dismissable: true
        });
      }
  });
  

      
  //let data = await response.text();

  //dialogElement.close();

} 

function ResetFormControls()
{
  form.querySelector("#txtSubscribeFullName").value="";
  form.querySelector("#txtSubscribeEmail").value="";
  form.querySelector("#SubscribeCaptcha").value="";
}