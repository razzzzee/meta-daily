

var openMemberAccessDialogButton = document.getElementById('OpenMemberAccessDialogButton');
var closeMemberAccessDialogButton = document.getElementById('CloseMemberAccessDialogButton');
//var closeButton = closeDialogActionElement;
var memberAccessDialog = document.getElementById('MemberAccessDialog');
memberAccessDialog.returnValue = "Success";

// Update button opens a modal dialog
//if(dialogElement.)
openMemberAccessDialogButton.addEventListener("click", () => {
    var form = document.querySelector('#memberAccessForm');
    form.reset();
    memberAccessErrorMessage.style.display = 'none';
    memberAccessPage1.style.display = 'block';
    memberAccessDialog.showModal();
});

// Form cancel button closes the dialog box
closeMemberAccessDialogButton.addEventListener("click", () => {
    memberAccessPage2.classList.remove('show');
    memberAccessDialog.close();
});

function CloseMemberAccessDialog() {
    memberAccessPage2.classList.remove('show');
    memberAccessDialog.close();
}

var memberAccessFullName;
var memberAccessEmailId;
var memberAccessSocialProfile;
var membership;
var referralCode;
var statementOfObjectives;

var memberAccessPage1 = document.getElementById('memberAccessPage1');
var memberAccessPage2 = document.getElementById('memberAccessPage2');
var memberAccessErrorMessage = document.getElementById('MemberAccessErrorMessage');
var memberAccessLoader = document.getElementById('MemberAccessLoader');

hideMemberAccessLoader();

memberAccessPage1.style.display = 'block';
//memberAccessPage2.style.display = 'none';

async function ApplyMembership(el) {
    var form = document.querySelector('#memberAccessForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayMemberAccessLoader();
        memberAccessFullName = document.getElementById('txtMemberAccessFullName').value;
        memberAccessEmailId = document.getElementById('txtMemberAccessEmail').value;
        memberAccessSocialProfile = document.getElementById('txtMemberAccessSocialProfile').value;
        membership = document.getElementById('pickerMembership').value;
        referralCode = document.getElementById('txtReferralCode').value;
        statementOfObjectives = document.getElementById('txtStatementOfObjective').value;
        await fetch('/ApplyMembership', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer abcdxyz',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: memberAccessFullName,
                EmailId: memberAccessEmailId,
                SocialProfile: memberAccessSocialProfile,
                Membership: membership,
                ReferralCode: referralCode,
                statementOfObjectives: statementOfObjectives
            })
        })
            .then(function (response) {
                hideMemberAccessLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'MEMBERSHIP-EXISTS') {
                    el.disabled = false;
                    memberAccessErrorMessage.style.display = 'block';
                    memberAccessErrorMessage.innerText = '** Requested Membership is already activated. Please check your access.**';
                }
                else if (data == 'SUCCESS') {

                    el.disabled = false;
                    memberAccessErrorMessage.style.display = 'none';
                    memberAccessPage1.style.display = 'none';
                    // memberAccessPage2.style.display = 'block';
                    memberAccessPage2.classList.toggle('show');
                    //document.querySelector('.dialog-box').classList.toggle('show'); 
                    //emailForVerification.innerText = emailId;
                }
                else {
                    el.disabled = false;
                    memberAccessErrorMessage.style.display = 'block';
                    memberAccessErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayMemberAccessLoader() {
    memberAccessLoader.style.display = 'block';
}

function hideMemberAccessLoader() {
    memberAccessLoader.style.display = 'none';
}
