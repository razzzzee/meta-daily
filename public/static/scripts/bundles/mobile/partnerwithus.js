var openPartnerWithUsDialogButton = document.getElementById('OpenPartnerWithUsDialogButton');
var closePartnerWithUsDialogButton = document.getElementById('ClosePartnerWithUsDialogButton');
var partnerWithUsDialog = document.getElementById('MetaverseDailyPartnerWithUsDialog');
partnerWithUsDialog.returnValue = "Success";
RegisterMultiform(partnerWithUsDialog);

openPartnerWithUsDialogButton.addEventListener("click", () => {
    ShowPartnerWithUsDialog();
});

function ShowPartnerWithUsDialog()
{
    navigateToFormStep(1, partnerWithUsDialog);
    var step1Form = partnerWithUsDialog.querySelector('#partnerWithUsStep1Form');
    var step2Form = partnerWithUsDialog.querySelector('#partnerWithUsStep2Form');
    var step3Form = document.querySelector('#partnerWithUsStep3Form');
    var step4Form = document.querySelector('#partnerWithUsStep4Form');
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    step4Form.reset();
    partnerWithUsErrorMessage.style.display = 'none';
    partnerWithUsPage1.style.display = 'block';
    //partnerWithUsDialog.style.width = "700px";
    partnerWithUsDialog.showModal();
}

// Form cancel button closes the dialog box
closePartnerWithUsDialogButton.addEventListener("click", () => {
    partnerWithUsPage2.classList.remove('show');
    partnerWithUsDialog.close();
});

function ClosePartnerWithUsDialog() {
    partnerWithUsPage2.classList.remove('show');
    partnerWithUsDialog.close();
}

var partnerFullName;
var partnerEmailId;
var partnerContactNumber;
var partnerPartnershipOptions;
var partnerOrganizationName;
var partnerOrganizationURL;
var partnerOrganizationalTitle;
var partnerLinkedInProfile;
var partnerOtherSocialProfile;


var referralCode;
var statementOfObjectives;

var partnerWithUsPage1 = document.getElementById('partnerWithUsPage1');
var partnerWithUsPage2 = document.getElementById('partnerWithUsPage2');
var partnerWithUsErrorMessage = document.getElementById('PartnerWithUsErrorMessage');
var partnerWithUsLoader = document.getElementById('PartnerWithUsLoader');

hidePartnerWithUsLoader();

partnerWithUsPage1.style.display = 'block';

async function PartnerWithUs(el) {
    var step1Form = partnerWithUsDialog.querySelector('#partnerWithUsStep1Form');
    var step2Form = partnerWithUsDialog.querySelector('#partnerWithUsStep2Form');
    var step3Form = partnerWithUsDialog.querySelector('#partnerWithUsStep3Form');
    var step4Form = partnerWithUsDialog.querySelector('#partnerWithUsStep4Form');
    if (step1Form.reportValidity() && step2Form.reportValidity() && step3Form.reportValidity() && step4Form.reportValidity()) {
        el.disabled = true;
        displayPartnerWithUsLoader();
        partnerFullName = document.getElementById('txtPartnerFullName').value;
        partnerEmailId = document.getElementById('txtPartnerEmail').value;
        partnerContactNumber = document.getElementById('txtPartnerContactNumber').value;
        partnerPartnershipOptions = "Publishing";
        if(document.getElementById("chkPartnerOptionBroadcasting").checked)
        {
            partnerPartnershipOptions +="_Broadcasting";
        }
        if(document.getElementById("chkPartnerOptionEventPublishing").checked)
        {
            partnerPartnershipOptions +="_EventPublishing";
        }
        if(document.getElementById("chkPartnerOptionEventBooking").checked)
        {
            partnerPartnershipOptions +="_EventBooking";
        }
        if(document.getElementById("chkPartnerOptionEventCasting").checked)
        {
            partnerPartnershipOptions +="_EventCasting";
        }
        if(document.getElementById("chkPartnerOptionMarketplace").checked)
        {
            partnerPartnershipOptions +="_Marketplace";
        }
        if(document.getElementById("chkPartnerOptionResearchLabs").checked)
        {
            partnerPartnershipOptions +="_ResearchLabs";
        }
        if(document.getElementById("chkPartnerOptionEducationPrograms").checked)
        {
            partnerPartnershipOptions +="_EducationPrograms";
        }
        partnerOrganizationName = document.getElementById('txtPartnerOrganizationName').value;
        partnerOrganizationURL = document.getElementById('txtPartnerOrganizationURL').value;
        partnerOrganizationalTitle = document.getElementById('txtPartnerOrganizationalTitle').value;
        partnerLinkedInProfile = document.getElementById('txtPartnerLinkedInProfile').value;
        partnerOtherSocialProfile = document.getElementById('txtPartnerOtherSocialProfile').value;
        await fetch('/PartnerWithUs', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PartnerFullName: partnerFullName,
                PartnerEmailId: partnerEmailId,
                PartnerContactNumber: partnerContactNumber,
                PartnerPartnershipOptions: partnerPartnershipOptions,
                PartnerOrganizationName: partnerOrganizationName,
                PartnerOrganizationURL: partnerOrganizationURL,
                PartnerOrganizationalTitle: partnerOrganizationalTitle,
                PartnerLinkedInProfile: partnerLinkedInProfile,
                PartnerOtherSocialProfile: partnerOtherSocialProfile
            })
        })
            .then(function (response) {
                hidePartnerWithUsLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'PARTNER-REQUEST-EXISTS') {
                    el.disabled = false;
                    partnerWithUsErrorMessage.style.display = 'block';
                    partnerWithUsErrorMessage.innerText = '** You are already a partner with Metaverse Daily. Please check your access.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    partnerWithUsErrorMessage.style.display = 'none';
                    partnerWithUsPage1.style.display = 'none';
                    partnerWithUsPage2.classList.toggle('show');
                    //partnerWithUsDialog.style.width = "400px";
                }
                else {
                    el.disabled = false;
                    partnerWithUsErrorMessage.style.display = 'block';
                    partnerWithUsErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayPartnerWithUsLoader() {
    partnerWithUsLoader.style.display = 'block';
}

function hidePartnerWithUsLoader() {
    partnerWithUsLoader.style.display = 'none';
}
