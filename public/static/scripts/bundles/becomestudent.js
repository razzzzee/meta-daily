//var openBecomeStudentDialogButton = document.getElementById('OpenBecomeStudentDialogButton');
var closeBecomeStudentDialogButton = document.getElementById('CloseBecomeStudentDialogButton');
var becomeStudentDialog = document.getElementById('MetaverseDailyBecomeStudentDialog');
becomeStudentDialog.returnValue = "Success";
RegisterMultiform(becomeStudentDialog);

function ShowBecomeStudentDialog()
{
    navigateToFormStep(1, becomeStudentDialog);
    var step1Form = becomeStudentDialog.querySelector('#becomeStudentStep1Form');
    var step2Form = becomeStudentDialog.querySelector('#becomeStudentStep2Form');
    var step3Form = document.querySelector('#becomeStudentStep3Form');
    step1Form.reset();
    step2Form.reset();
    step3Form.reset();
    becomeStudentErrorMessage.style.display = 'none';
    becomeStudentPage1.style.display = 'block';
    becomeStudentDialog.style.width = "700px";
    becomeStudentDialog.showModal();
}

// Form cancel button closes the dialog box
closeBecomeStudentDialogButton.addEventListener("click", () => {
    becomeStudentPage2.classList.remove('show');
    becomeStudentDialog.close();
});

function CloseBecomeStudentDialog() {
    becomeStudentPage2.classList.remove('show');
    becomeStudentDialog.close();
}

var studentFullName;
var studentEmailId;
var studentContactNumber;
var studentInterests;
var studentLinkedInProfile;
var studentOtherSocialProfile;


var becomeStudentPage1 = document.getElementById('becomeStudentPage1');
var becomeStudentPage2 = document.getElementById('becomeStudentPage2');
var becomeStudentErrorMessage = document.getElementById('BecomeStudentErrorMessage');
var becomeStudentLoader = document.getElementById('BecomeStudentLoader');

hideBecomeStudentLoader();

becomeStudentPage1.style.display = 'block';

async function BecomeStudent(el) {
    var step1Form = becomeStudentDialog.querySelector('#becomeStudentStep1Form');
    var step2Form = becomeStudentDialog.querySelector('#becomeStudentStep2Form');
    var step3Form = becomeStudentDialog.querySelector('#becomeStudentStep3Form');
    if (step1Form.reportValidity() && step2Form.reportValidity() && step3Form.reportValidity()) {
        el.disabled = true;
        displayBecomeStudentLoader();
        studentFullName = document.getElementById('txtStudentFullName').value;
        studentEmailId = document.getElementById('txtStudentEmail').value;
        studentContactNumber = document.getElementById('txtStudentContactNumber').value;
        studentInterests = "Education";
        if(document.getElementById("chkStudentOptionMedia").checked)
        {
            studentInterests +="_Media";
        }
        if(document.getElementById("chkStudentOptionArt").checked)
        {
            studentInterests +="_Art";
        }
        if(document.getElementById("chkStudentOptionDesign").checked)
        {
            studentInterests +="_Design";
        }
        if(document.getElementById("chkStudentOptionTechnology").checked)
        {
            studentInterests +="_Technology";
        }
        if(document.getElementById("chkStudentOptionResearch").checked)
        {
            studentInterests +="_Research";
        }
        if(document.getElementById("chkStudentOptionBusiness").checked)
        {
            studentInterests +="_Business";
        }
        if(document.getElementById("chkStudentOptionEconomics").checked)
        {
            studentInterests +="_Economics";
        }
        if(document.getElementById("chkStudentOptionSocial").checked)
            {
                studentInterests +="_Social";
            }
        studentLinkedInProfile = document.getElementById('txtStudentLinkedInProfile').value;
        studentOtherSocialProfile = document.getElementById('txtStudentOtherSocialProfile').value;
        await fetch('/BecomeStudent', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                StudentFullName: studentFullName,
                StudentEmailId: studentEmailId,
                StudentContactNumber: studentContactNumber,
                StudentInterestOptions: studentInterests,
                StudentLinkedInProfile: studentLinkedInProfile,
                StudentOtherSocialProfile: studentOtherSocialProfile
            })
        })
            .then(function (response) {
                hideBecomeStudentLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'STUDENT-REQUEST-EXISTS') {
                    el.disabled = false;
                    becomeStudentErrorMessage.style.display = 'block';
                    becomeStudentErrorMessage.innerText = '** Your student request is already with Metaverse Daily. Please check your mail for further updates.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    becomeStudentErrorMessage.style.display = 'none';
                    becomeStudentPage1.style.display = 'none';
                    becomeStudentPage2.classList.toggle('show');
                    becomeStudentDialog.style.width = "400px";
                }
                else {
                    el.disabled = false;
                    becomeStudentErrorMessage.style.display = 'block';
                    becomeStudentErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayBecomeStudentLoader() {
    becomeStudentLoader.style.display = 'block';
}

function hideBecomeStudentLoader() {
    becomeStudentLoader.style.display = 'none';
}
