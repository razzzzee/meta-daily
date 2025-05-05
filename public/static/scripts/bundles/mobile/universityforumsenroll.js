
var universityForumsEnrollCode;
var universityForumsEnrollTitle;
const btnUniversityForumsEnroll = document.querySelectorAll('.universityforums-enroll');
const universityForumsEnrollDialog = document.getElementById('UniversityForumsEnrollDialog');
var closeUniversityForumsEnrollDialogButton = document.getElementById('CloseUniversityForumsEnrollDialogButton');
var divUniversityForumsDesc = document.getElementById('divUniversityForumsDesc');
var universityForumsTitle = document.getElementById('UniversityForumsTitle');
universityForumsEnrollDialog.returnValue = "Success";
btnUniversityForumsEnroll.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#universityForumsEnrollForm');
    form.reset();
    universityForumsEnrollErrorMessage.style.display = 'none';
    $("#ScrollableUniversityForumsEnrollForm").animate({ scrollTop: 0 }, "slow");
    universityForumsEnrollPage1.style.display = 'block';
    universityForumsEnrollDialog.showModal();
    universityForumsEnrollCode = event.currentTarget.getAttribute("data-attribute-id");
    universityForumsEnrollTitle = event.currentTarget.getAttribute("data-attribute-universityforums");
    universityForumsTitle.innerText = universityForumsEnrollTitle;
    divUniversityForumsDesc.innerHTML = document.getElementById(universityForumsEnrollCode + '-desc').innerHTML;
    universityForumsEnrollDialog.scrollTop = 0;
}));

// Form cancel button closes the dialog box
closeUniversityForumsEnrollDialogButton.addEventListener("click", () => {
    universityForumsEnrollPage2.classList.remove('show');
    universityForumsEnrollDialog.close();
});

function CloseUniversityForumsEnrollDialog() {
    universityForumsEnrollPage2.classList.remove('show');
    universityForumsEnrollDialog.close();
}

var universityForumsEnrollFullName;
var universityForumsEnrollEmailId;
var universityForumsEnrollLinkedInProfile;
var universityForumsEnrollOtherOwnedProfile;
var universityForumsEnrollDescribeYourself;

var universityForumsEnrollPage1 = document.getElementById('universityForumsEnrollPage1');
var universityForumsEnrollPage2 = document.getElementById('universityForumsEnrollPage2');
var universityForumsEnrollErrorMessage = document.getElementById('UniversityForumsEnrollErrorMessage');
var universityForumsEnrollLoader = document.getElementById('UniversityForumsEnrollLoader');

hideUniversityForumsEnrollLoader();

universityForumsEnrollPage1.style.display = 'block';

async function UniversityForumsEnroll(el) {
    var form = document.querySelector('#universityForumsEnrollForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayUniversityForumsEnrollLoader();
        universityForumsEnrollFullName = document.getElementById('txtUniversityForumsEnrollFullName').value;
        universityForumsEnrollEmailId = document.getElementById('txtUniversityForumsEnrollEmail').value;
        universityForumsEnrollLinkedInProfile = document.getElementById('txtUniversityForumsEnrollLinkedInProfile').value;
        universityForumsEnrollOtherOwnedProfile = document.getElementById('txtUniversityForumsEnrollOtherOwnedProfile').value;
        universityForumsEnrollDescribeYourself = document.getElementById('txtUniversityForumsEnrollDescribeYourself').value;
        try {
            await fetch('/UniversityProgramsEnroll', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer metaversedaily',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: universityForumsEnrollFullName,
                    EmailId: universityForumsEnrollEmailId,
                    LinkedInProfile: universityForumsEnrollLinkedInProfile,
                    OtherOwnedProfile: universityForumsEnrollOtherOwnedProfile,
                    DescribeYourself: universityForumsEnrollDescribeYourself,
                    ProgramType: 'Forum',
                    ProgramCode: universityForumsEnrollCode,
                    ProgramTitle: universityForumsEnrollTitle
                })
            })
                .then(function (response) {
                    hideUniversityForumsEnrollLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        universityForumsEnrollErrorMessage.style.display = 'block';
                        universityForumsEnrollErrorMessage.innerText = '** You have already applied for this forum. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {
                        el.disabled = false;
                        universityForumsEnrollErrorMessage.style.display = 'none';
                        universityForumsEnrollPage1.style.display = 'none';
                        universityForumsEnrollPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        universityForumsEnrollErrorMessage.style.display = 'block';
                        universityForumsEnrollErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) {  }
    }
}

function displayUniversityForumsEnrollLoader() {
    universityForumsEnrollLoader.style.display = 'block';
}

function hideUniversityForumsEnrollLoader() {
    universityForumsEnrollLoader.style.display = 'none';
}