
var applyNowRequisitionCode;
var applyNowOpportunityTitle;
const btnKnowMoreAndApply = document.querySelectorAll('.apply-now');
const knowMoreAndApplyDialog = document.getElementById('KnowMoreAndApplyDialog');
var closeApplyNowDialogButton = document.getElementById('CloseApplyNowDialogButton');
var divOpportunityDesc = document.getElementById('divOpportunityDesc');
var opportunityTitle = document.getElementById('OpportunityTitle');
knowMoreAndApplyDialog.returnValue = "Success";
btnKnowMoreAndApply.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#applyNowForm');
    form.reset();
    applyNowErrorMessage.style.display = 'none';
    $("#ScrollableApplyNowForm").animate({ scrollTop: 0 }, "slow");
    applyNowPage1.style.display = 'block';
    knowMoreAndApplyDialog.showModal();
    applyNowRequisitionCode = event.currentTarget.getAttribute("data-attribute-id");
    applyNowOpportunityTitle = event.currentTarget.getAttribute("data-attribute-opportunity");
    opportunityTitle.innerText = applyNowOpportunityTitle;
    divOpportunityDesc.innerHTML = document.getElementById(applyNowRequisitionCode + '-desc').innerHTML;
    knowMoreAndApplyDialog.scrollTop = 0;
}));

// Form cancel button closes the dialog box
closeApplyNowDialogButton.addEventListener("click", () => {
    applyNowPage2.classList.remove('show');
    knowMoreAndApplyDialog.close();
});

function CloseApplyNowDialog() {
    applyNowPage2.classList.remove('show');
    knowMoreAndApplyDialog.close();
}

var applyNowFullName;
var applyNowEmailId;
var applyNowLinkedInProfile;
var applyNowTwitterProfile;
var applyNowMastodonProfile;
var applyNowReferralCode;
var applyNowDescribeYourself;

var applyNowPage1 = document.getElementById('applyNowPage1');
var applyNowPage2 = document.getElementById('applyNowPage2');
var applyNowErrorMessage = document.getElementById('ApplyNowErrorMessage');
var applyNowLoader = document.getElementById('ApplyNowLoader');

hideApplyNowLoader();

applyNowPage1.style.display = 'block';

async function ApplyNow(el) {
    var form = document.querySelector('#applyNowForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayApplyNowLoader();
        applyNowFullName = document.getElementById('txtApplyNowFullName').value;
        applyNowEmailId = document.getElementById('txtApplyNowEmail').value;
        applyNowLinkedInProfile = document.getElementById('txtApplyNowLinkedInProfile').value;
        applyNowTwitterProfile = document.getElementById('txtApplyNowTwitterProfile').value;
        applyNowMastodonProfile = document.getElementById('txtApplyNowMastodonProfile').value;
        applyNowReferralCode = document.getElementById('txtApplyNowReferralCode').value;
        applyNowDescribeYourself = document.getElementById('txtApplyNowDescribeYourself').value;
        try {
            await fetch('/ApplyNowForOpportunity', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: applyNowFullName,
                    EmailId: applyNowEmailId,
                    LinkedInProfile: applyNowLinkedInProfile,
                    TwitterProfile: applyNowTwitterProfile,
                    MastodonProfile: applyNowMastodonProfile,
                    ReferralCode: applyNowReferralCode,
                    DescribeYourself: applyNowDescribeYourself,
                    RequisitionCode: applyNowRequisitionCode,
                    Opportunity: applyNowOpportunityTitle
                })
            })
                .then(function (response) {
                    hideApplyNowLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        applyNowErrorMessage.style.display = 'block';
                        applyNowErrorMessage.innerText = '** You have already applied for this opportunity. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {

                        el.disabled = false;
                        applyNowErrorMessage.style.display = 'none';
                        applyNowPage1.style.display = 'none';
                        applyNowPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        applyNowErrorMessage.style.display = 'block';
                        applyNowErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) { }
    }
}

function displayApplyNowLoader() {
    applyNowLoader.style.display = 'block';
}

function hideApplyNowLoader() {
    applyNowLoader.style.display = 'none';
}
