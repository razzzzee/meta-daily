

var openResearchLabsApplyNowDialogButton = document.getElementById('OpenResearchLabsApplyNowDialogButton');
var closeResearchLabsApplyNowDialogButton = document.getElementById('CloseResearchLabsApplyNowDialogButton');
var researchLabsApplyNowDialog = document.getElementById('ResearchLabsApplyNowDialog');
researchLabsApplyNowDialog.returnValue = "Success";

openResearchLabsApplyNowDialogButton.addEventListener("click", () => {
    var form = document.querySelector('#researchLabsApplyNowForm');
    form.reset();
    researchLabsApplyNowErrorMessage.style.display = 'none';
    researchLabsApplyNowPage1.style.display = 'block';
    researchLabsApplyNowDialog.style.height = "550px";
    $("#ScrollableResearchLabsApplyNowForm").animate({ scrollTop: 0 }, "slow");
    researchLabsApplyNowDialog.showModal();
});

closeResearchLabsApplyNowDialogButton.addEventListener("click", () => {
    researchLabsApplyNowPage2.classList.remove('show');
    researchLabsApplyNowDialog.close();
});

function CloseResearchLabsApplyNowDialog() {
    researchLabsApplyNowPage2.classList.remove('show');
    researchLabsApplyNowDialog.close();
}

var researchLabsApplyNowFullName;
var researchLabsApplyNowEmailId;
var researchLabsApplyNowSocialProfile;
var researchLabsApplyNowResearchLab;
var researchLabsApplyNowReferralCode;
var researchLabsApplyNowStatementOfObjectives;

var researchLabsApplyNowPage1 = document.getElementById('researchLabsApplyNowPage1');
var researchLabsApplyNowPage2 = document.getElementById('researchLabsApplyNowPage2');
var researchLabsApplyNowErrorMessage = document.getElementById('ResearchLabsApplyNowErrorMessage');
var researchLabsApplyNowLoader = document.getElementById('ResearchLabsApplyNowLoader');

hideResearchLabsApplyNowLoader();

researchLabsApplyNowPage1.style.display = 'block';

async function ApplyForResearchLab(el) {
    var form = document.querySelector('#researchLabsApplyNowForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayResearchLabsApplyNowLoader();
        researchLabsApplyNowFullName = document.getElementById('txtResearchLabsApplyNowFullName').value;
        researchLabsApplyNowEmailId = document.getElementById('txtResearchLabsApplyNowEmail').value;
        researchLabsApplyNowSocialProfile = document.getElementById('txtResearchLabsApplyNowSocialProfile').value;
        researchLabsApplyNowResearchLab = document.getElementById('pickerResearchLabsApplyNowResearchLab').value;
        researchLabsApplyNowReferralCode = document.getElementById('txtResearchLabsApplyNowReferralCode').value;
        researchLabsApplyNowStatementOfObjectives = document.getElementById('txtResearchLabsApplyNowStatementOfObjective').value;
        await fetch('/ApplyForResearchLab', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: researchLabsApplyNowFullName,
                EmailId: researchLabsApplyNowEmailId,
                SocialProfile: researchLabsApplyNowSocialProfile,
                ResearchLab: researchLabsApplyNowResearchLab,
                ReferralCode: researchLabsApplyNowReferralCode,
                statementOfObjectives: researchLabsApplyNowStatementOfObjectives
            })
        })
            .then(function (response) {
                hideResearchLabsApplyNowLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'RESEARCHLAB-ACCESS-REQUEST-EXISTS') {
                    el.disabled = false;
                    researchLabsApplyNowErrorMessage.style.display = 'block';
                    researchLabsApplyNowErrorMessage.innerText = '** Requested Research Lab access already exists. Please check your access.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    researchLabsApplyNowErrorMessage.style.display = 'none';
                    researchLabsApplyNowPage1.style.display = 'none';
                    researchLabsApplyNowPage2.classList.toggle('show');
                    researchLabsApplyNowDialog.style.height = "550px";
                }
                else {
                    el.disabled = false;
                    researchLabsApplyNowErrorMessage.style.display = 'block';
                    researchLabsApplyNowErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayResearchLabsApplyNowLoader() {
    researchLabsApplyNowLoader.style.display = 'block';
}

function hideResearchLabsApplyNowLoader() {
    researchLabsApplyNowLoader.style.display = 'none';
}
