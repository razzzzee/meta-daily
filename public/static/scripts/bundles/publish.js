var openPublishDialogButton = document.getElementById('OpenPublishDialogButton');
var closePublishDialogButton = document.getElementById('ClosePublishDialogButton');
var publishDialog = document.getElementById('MetaverseDailyPublishDialog');
publishDialog.returnValue = "Success";
RegisterMultiform(publishDialog);

openPublishDialogButton.addEventListener("click", () => {
    ShowPublishDialog();
});  

function ShowPublishDialog()
{
    navigateToFormStep(1, publishDialog);
    var step1Form = publishDialog.querySelector('#publishStep1Form');
    var step2Form = publishDialog.querySelector('#publishStep2Form');
    var step3Form = document.querySelector('#publishStep3Form');
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    publishErrorMessage.style.display = 'none';
    publishPage1.style.display = 'block';
    publishDialog.style.width = "1000px";  
    publishDialog.showModal();
}

// Form cancel button closes the dialog box
closePublishDialogButton.addEventListener("click", () => {
    publishPage2.classList.remove('show');
    publishDialog.close();
});

function ClosePublishDialog() {
    publishPage2.classList.remove('show');
    publishDialog.close();
}

var publishFullName;
var publishEmailId;
var publishContactNumber;
var publishOrganizationName;
var publishOrganizationURL;
var publishOrganizationalTitle;
var publishLinkedInProfile;
var publishOtherSocialProfile;


var publishPage1 = document.getElementById('publishPage1');
var publishPage2 = document.getElementById('publishPage2');
var publishErrorMessage = document.getElementById('PublishErrorMessage');
var publishLoader = document.getElementById('PublishLoader');

hidePublishLoader();

publishPage1.style.display = 'block';

async function Publish(el) {
    //code here
}

function displayPublishLoader() {
    publishLoader.style.display = 'block';
}

function hidePublishLoader() {
    publishLoader.style.display = 'none';
}
