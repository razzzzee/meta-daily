
var insightsExclusiveMembershipFullName;
var insightsExclusiveMembershipEmailId;

var insightsExclusiveMembershipPage1;
var insightsExclusiveMembershipPage2;
var insightsExclusiveMembershipErrorMessage;
var insightsExclusiveMembershipLoader;

var closeInsightsExclusiveMembershipDialogButton;
var insightsExclusiveMembershipDialog;


closeInsightsExclusiveMembershipDialogButton = document.getElementById('CloseInsightsExclusiveMembershipDialog');
insightsExclusiveMembershipDialog = document.getElementById('InsightsDialog');
insightsExclusiveMembershipDialog.returnValue = "Success";

insightsExclusiveMembershipPage1 = document.getElementById('insightsExclusiveMembershipPage1');
insightsExclusiveMembershipPage2 = document.getElementById('insightsExclusiveMembershipPage2');
insightsExclusiveMembershipErrorMessage = document.getElementById('InsightsExclusiveMembershipErrorMessage');
insightsExclusiveMembershipLoader = document.getElementById('InsightsExclusiveMembershipLoader');

hideInsightsExclusiveMembershipLoader();

insightsExclusiveMembershipPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeInsightsExclusiveMembershipDialogButton.addEventListener("click", () => {
    insightsExclusiveMembershipPage2.classList.remove('show');
    insightsExclusiveMembershipDialog.close();
});

function ShowInsightsExclusiveMembershipDialog() {
    var insightsExclusiveMembershipForm = insightsExclusiveMembershipDialog.querySelector('#insightsExclusiveMembershipForm');
    insightsExclusiveMembershipForm.reset();
    insightsExclusiveMembershipErrorMessage.style.display = 'none';
    insightsExclusiveMembershipPage1.style.display = 'block';
    insightsExclusiveMembershipDialog.style.width = "950px";
    insightsExclusiveMembershipDialog.showModal();
}

function CloseInsightsExclusiveMembershipDialog() {
    insightsExclusiveMembershipPage2.classList.remove('show');
    insightsExclusiveMembershipDialog.close();
}

async function InsightsExclusiveMembership(el) {
    var insightsExclusiveMembershipForm = insightsExclusiveMembershipDialog.querySelector('#insightsExclusiveMembershipForm');
    if (insightsExclusiveMembershipForm.reportValidity()) {
        el.disabled = true;
        displayInsightsExclusiveMembershipLoader();
        insightsExclusiveMembershipFullName = document.getElementById('txtInsightsExclusiveMembershipFullName').value;
        insightsExclusiveMembershipEmailId = document.getElementById('txtInsightsExclusiveMembershipEmail').value;
        await fetch('/InsightsExclusiveMembership', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                InsightsExclusiveMembershipFullName: insightsExclusiveMembershipFullName,
                InsightsExclusiveMembershipEmailId: insightsExclusiveMembershipEmailId,
                InsightsExclusiveMembershipType: 'Insights'
            })
        })
            .then(function (response) {
                hideInsightsExclusiveMembershipLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'INSIGHTS-EXCLUSIVE-MEMBERSHIP-EXISTS') {
                    el.disabled = false;
                    insightsExclusiveMembershipErrorMessage.style.display = 'block';
                    insightsExclusiveMembershipErrorMessage.innerText = '** You have already applied for insights exclusive memberships with Metaverse Daily. Please get your updates on mail.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    insightsExclusiveMembershipErrorMessage.style.display = 'none';
                    insightsExclusiveMembershipPage1.style.display = 'none';
                    insightsExclusiveMembershipPage2.classList.toggle('show');
                    insightsExclusiveMembershipDialog.style.width = "300px";
                }
                else {
                    el.disabled = false;
                    insightsExclusiveMembershipErrorMessage.style.display = 'block';
                    insightsExclusiveMembershipErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayInsightsExclusiveMembershipLoader() {
    insightsExclusiveMembershipLoader.style.display = 'block';
}

function hideInsightsExclusiveMembershipLoader() {
    insightsExclusiveMembershipLoader.style.display = 'none';
}
