//var openBecomeCouncilDialogButton = document.getElementById('OpenBecomeCouncilDialogButton');
var closeBecomeCouncilDialogButton = document.getElementById('CloseBecomeCouncilDialogButton');
var becomeCouncilDialog = document.getElementById('MetaverseDailyBecomeCouncilDialog');
becomeCouncilDialog.returnValue = "Success";
RegisterMultiform(becomeCouncilDialog);

/*openBecomeCouncilDialogButton.addEventListener("click", () => {
    ShowBecomeCouncilDialog();
});*/

function ShowBecomeCouncilDialog()
{
    navigateToFormStep(1, becomeCouncilDialog);
    var step1Form = becomeCouncilDialog.querySelector('#becomeCouncilStep1Form');
    var step2Form = becomeCouncilDialog.querySelector('#becomeCouncilStep2Form');
    var step3Form = document.querySelector('#becomeCouncilStep3Form');
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    becomeCouncilErrorMessage.style.display = 'none';
    becomeCouncilPage1.style.display = 'block';
    becomeCouncilDialog.showModal();
}

// Form cancel button closes the dialog box
closeBecomeCouncilDialogButton.addEventListener("click", () => {
    becomeCouncilPage2.classList.remove('show');
    becomeCouncilDialog.close();
});

function CloseBecomeCouncilDialog() {
    becomeCouncilPage2.classList.remove('show');
    becomeCouncilDialog.close();
}

var councilFullName;
var councilEmailId;
var councilContactNumber;
var councilOrganizationName;
var councilOrganizationURL;
var councilOrganizationalTitle;
var councilLinkedInProfile;
var councilOtherSocialProfile;


var becomeCouncilPage1 = document.getElementById('becomeCouncilPage1');
var becomeCouncilPage2 = document.getElementById('becomeCouncilPage2');
var becomeCouncilErrorMessage = document.getElementById('BecomeCouncilErrorMessage');
var becomeCouncilLoader = document.getElementById('BecomeCouncilLoader');

hideBecomeCouncilLoader();

becomeCouncilPage1.style.display = 'block';

async function BecomeCouncil(el) {
    var step1Form = becomeCouncilDialog.querySelector('#becomeCouncilStep1Form');
    var step2Form = becomeCouncilDialog.querySelector('#becomeCouncilStep2Form');
    var step3Form = becomeCouncilDialog.querySelector('#becomeCouncilStep3Form');
    if (step1Form.reportValidity() && step2Form.reportValidity() && step3Form.reportValidity()) {
        el.disabled = true;
        displayBecomeCouncilLoader();
        councilFullName = document.getElementById('txtCouncilFullName').value;
        councilEmailId = document.getElementById('txtCouncilEmail').value;
        councilContactNumber = document.getElementById('txtCouncilContactNumber').value;
        councilOrganizationName = document.getElementById('txtCouncilOrganizationName').value;
        councilOrganizationURL = document.getElementById('txtCouncilOrganizationURL').value;
        councilOrganizationalTitle = document.getElementById('txtCouncilOrganizationalTitle').value;
        councilLinkedInProfile = document.getElementById('txtCouncilLinkedInProfile').value;
        councilOtherSocialProfile = document.getElementById('txtCouncilOtherSocialProfile').value;
        await fetch('/BecomeCouncil', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CouncilFullName: councilFullName,
                CouncilEmailId: councilEmailId,
                CouncilContactNumber: councilContactNumber,
                CouncilOrganizationName: councilOrganizationName,
                CouncilOrganizationURL: councilOrganizationURL,
                CouncilOrganizationalTitle: councilOrganizationalTitle,
                CouncilLinkedInProfile: councilLinkedInProfile,
                CouncilOtherSocialProfile: councilOtherSocialProfile
            })
        })
            .then(function (response) {
                hideBecomeCouncilLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'COUNCIL-REQUEST-EXISTS') {
                    el.disabled = false;
                    becomeCouncilErrorMessage.style.display = 'block';
                    becomeCouncilErrorMessage.innerText = '** You are already a council with Metaverse Daily. Please check your access.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    becomeCouncilErrorMessage.style.display = 'none';
                    becomeCouncilPage1.style.display = 'none';
                    becomeCouncilPage2.classList.toggle('show');
                }
                else {
                    el.disabled = false;
                    becomeCouncilErrorMessage.style.display = 'block';
                    becomeCouncilErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayBecomeCouncilLoader() {
    becomeCouncilLoader.style.display = 'block';
}

function hideBecomeCouncilLoader() {
    becomeCouncilLoader.style.display = 'none';
}
