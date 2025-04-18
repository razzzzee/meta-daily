var openBecomeMerchantDialogButton = document.getElementById('OpenBecomeMerchantDialogButton');
var closeBecomeMerchantDialogButton = document.getElementById('CloseBecomeMerchantDialogButton');
var becomeMerchantDialog = document.getElementById('MetaverseDailyBecomeMerchantDialog');
becomeMerchantDialog.returnValue = "Success";
RegisterMultiform(becomeMerchantDialog);

openBecomeMerchantDialogButton.addEventListener("click", () => {
    ShowBecomeMerchantDialog();
});

function ShowBecomeMerchantDialog()
{
    navigateToFormStep(1, becomeMerchantDialog);
    var step1Form = becomeMerchantDialog.querySelector('#becomeMerchantStep1Form');
    var step2Form = becomeMerchantDialog.querySelector('#becomeMerchantStep2Form');
    var step3Form = document.querySelector('#becomeMerchantStep3Form');
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    becomeMerchantErrorMessage.style.display = 'none';
    becomeMerchantPage1.style.display = 'block';
    becomeMerchantDialog.style.width = "700px";
    becomeMerchantDialog.showModal();
}

// Form cancel button closes the dialog box
closeBecomeMerchantDialogButton.addEventListener("click", () => {
    becomeMerchantPage2.classList.remove('show');
    becomeMerchantDialog.close();
});

function CloseBecomeMerchantDialog() {
    becomeMerchantPage2.classList.remove('show');
    becomeMerchantDialog.close();
}

var merchantFullName;
var merchantEmailId;
var merchantContactNumber;
var merchantOrganizationName;
var merchantOrganizationURL;
var merchantOrganizationalTitle;
var merchantLinkedInProfile;
var merchantOtherSocialProfile;


var becomeMerchantPage1 = document.getElementById('becomeMerchantPage1');
var becomeMerchantPage2 = document.getElementById('becomeMerchantPage2');
var becomeMerchantErrorMessage = document.getElementById('BecomeMerchantErrorMessage');
var becomeMerchantLoader = document.getElementById('BecomeMerchantLoader');

hideBecomeMerchantLoader();

becomeMerchantPage1.style.display = 'block';

async function BecomeMerchant(el) {
    var step1Form = becomeMerchantDialog.querySelector('#becomeMerchantStep1Form');
    var step2Form = becomeMerchantDialog.querySelector('#becomeMerchantStep2Form');
    var step3Form = becomeMerchantDialog.querySelector('#becomeMerchantStep3Form');
    if (step1Form.reportValidity() && step2Form.reportValidity() && step3Form.reportValidity()) {
        el.disabled = true;
        displayBecomeMerchantLoader();
        merchantFullName = document.getElementById('txtMerchantFullName').value;
        merchantEmailId = document.getElementById('txtMerchantEmail').value;
        merchantContactNumber = document.getElementById('txtMerchantContactNumber').value;
        merchantOrganizationName = document.getElementById('txtMerchantOrganizationName').value;
        merchantOrganizationURL = document.getElementById('txtMerchantOrganizationURL').value;
        merchantOrganizationalTitle = document.getElementById('txtMerchantOrganizationalTitle').value;
        merchantLinkedInProfile = document.getElementById('txtMerchantLinkedInProfile').value;
        merchantOtherSocialProfile = document.getElementById('txtMerchantOtherSocialProfile').value;
        await fetch('/BecomeMerchant', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MerchantFullName: merchantFullName,
                MerchantEmailId: merchantEmailId,
                MerchantContactNumber: merchantContactNumber,
                MerchantOrganizationName: merchantOrganizationName,
                MerchantOrganizationURL: merchantOrganizationURL,
                MerchantOrganizationalTitle: merchantOrganizationalTitle,
                MerchantLinkedInProfile: merchantLinkedInProfile,
                MerchantOtherSocialProfile: merchantOtherSocialProfile
            })
        })
            .then(function (response) {
                hideBecomeMerchantLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'MERCHANT-REQUEST-EXISTS') {
                    el.disabled = false;
                    becomeMerchantErrorMessage.style.display = 'block';
                    becomeMerchantErrorMessage.innerText = '** You are already a merchant with Metaverse Daily. Please check your access.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    becomeMerchantErrorMessage.style.display = 'none';
                    becomeMerchantPage1.style.display = 'none';
                    becomeMerchantPage2.classList.toggle('show');
                    becomeMerchantDialog.style.width = "400px";
                }
                else {
                    el.disabled = false;
                    becomeMerchantErrorMessage.style.display = 'block';
                    becomeMerchantErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayBecomeMerchantLoader() {
    becomeMerchantLoader.style.display = 'block';
}

function hideBecomeMerchantLoader() {
    becomeMerchantLoader.style.display = 'none';
}
