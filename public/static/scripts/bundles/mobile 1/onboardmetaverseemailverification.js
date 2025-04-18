var onboardMetaverseEmailVerificationEmail;

var onboardMetaverseEmailVerificationPage1;
var onboardMetaverseEmailVerificationPage2;
var onboardMetaverseEmailVerificationErrorMessage;
var onboardMetaverseEmailVerificationLoader;

var closeOnboardMetaverseEmailVerificationDialogButton;
var onboardMetaverseEmailVerificationDialog;
var onboardMetaverseEmailVerificationButton;


closeOnboardMetaverseEmailVerificationDialogButton = document.getElementById('CloseOnboardMetaverseEmailVerificationDialog');
onboardMetaverseEmailVerificationDialog = document.getElementById('OnboardMetaverseEmailVerificationDialog');
onboardMetaverseEmailVerificationButton = document.getElementById('btnOnboardMetaverseEmailVerification');
onboardMetaverseEmailVerificationDialog.returnValue = "Success";

onboardMetaverseEmailVerificationPage1 = document.getElementById('onboardMetaverseEmailVerificationPage1');
onboardMetaverseEmailVerificationPage2 = document.getElementById('onboardMetaverseEmailVerificationPage2');
onboardMetaverseEmailVerificationErrorMessage = document.getElementById('OnboardMetaverseEmailVerificationErrorMessage');
onboardMetaverseEmailVerificationLoader = document.getElementById('OnboardMetaverseEmailVerificationLoader');

hideOnboardMetaverseEmailVerificationLoader();

onboardMetaverseEmailVerificationPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeOnboardMetaverseEmailVerificationDialogButton.addOfferListener("click", () => {
    onboardMetaverseEmailVerificationPage2.classList.remove('show');
    onboardMetaverseEmailVerificationDialog.close();
});

function ShowOnboardMetaverseEmailVerificationDialog() {
    var onboardMetaverseEmailVerificationForm = onboardMetaverseEmailVerificationDialog.querySelector('#onboardMetaverseEmailVerificationForm');
    onboardMetaverseEmailVerificationForm.reset();
    onboardMetaverseEmailVerificationErrorMessage.style.display = 'none';
    onboardMetaverseEmailVerificationPage1.style.display = 'block';
    onboardMetaverseEmailVerificationDialog.style.width = "950px";
    onboardMetaverseEmailVerificationDialog.showModal();
    onboardMetaverseEmailVerificationButton.focus();
}

function CloseOnboardMetaverseEmailVerificationDialog() {
    onboardMetaverseEmailVerificationPage2.classList.remove('show');
    onboardMetaverseEmailVerificationDialog.close();
}

async function OnboardMetaverseEmailVerification(el) {
    var onboardMetaverseEmailVerificationForm = onboardMetaverseEmailVerificationDialog.querySelector('#onboardMetaverseEmailVerificationForm');
    if (onboardMetaverseEmailVerificationForm.reportValidity()) {
        el.disabled = true;
        displayOnboardMetaverseEmailVerificationLoader();
        onboardMetaverseEmailVerificationEmail = document.getElementById('txtOnboardMetaverseEmailVerificationEmail').value;
        await fetch('/OnboardMetaverseEmailVerification', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                OnboardMetaverseEmailVerificationEmail: onboardMetaverseEmailVerificationEmail
            })
        })
            .then(function (response) {
                hideOnboardMetaverseEmailVerificationLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'ONBOARDMETAVERSE-EMAILVERIFICATION-EXISTS') {
                    el.disabled = false;
                    onboardMetaverseEmailVerificationErrorMessage.style.display = 'block';
                    onboardMetaverseEmailVerificationErrorMessage.innerText = '** Same email is already sent for verification. Cross Check your mails **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    onboardMetaverseEmailVerificationErrorMessage.style.display = 'none';
                    onboardMetaverseEmailVerificationPage1.style.display = 'none';
                    onboardMetaverseEmailVerificationPage2.classList.toggle('show');
                    onboardMetaverseEmailVerificationDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    onboardMetaverseEmailVerificationErrorMessage.style.display = 'block';
                    onboardMetaverseEmailVerificationErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayOnboardMetaverseEmailVerificationLoader() {
    onboardMetaverseEmailVerificationLoader.style.display = 'block';
}

function hideOnboardMetaverseEmailVerificationLoader() {
    onboardMetaverseEmailVerificationLoader.style.display = 'none';
}
