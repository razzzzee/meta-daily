
var universityParticipationsEnrollCode;
var universityParticipationsEnrollTitle;
const btnUniversityParticipationsEnroll = document.querySelectorAll('.universityparticipations-enroll');
const universityParticipationsEnrollDialog = document.getElementById('UniversityParticipationsEnrollDialog');
var closeUniversityParticipationsEnrollDialogButton = document.getElementById('CloseUniversityParticipationsEnrollDialogButton');
var divUniversityParticipationsDesc = document.getElementById('divUniversityParticipationsDesc');
var universityParticipationsTitle = document.getElementById('UniversityParticipationsTitle');
universityParticipationsEnrollDialog.returnValue = "Success";
btnUniversityParticipationsEnroll.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#universityParticipationsEnrollForm');
    form.reset();
    universityParticipationsEnrollErrorMessage.style.display = 'none';
    $("#ScrollableUniversityParticipationsEnrollForm").animate({ scrollTop: 0 }, "slow");
    universityParticipationsEnrollPage1.style.display = 'block';
    universityParticipationsEnrollDialog.showModal();
    universityParticipationsEnrollCode = event.currentTarget.getAttribute("data-attribute-id");
    universityParticipationsEnrollTitle = event.currentTarget.getAttribute("data-attribute-universityparticipations");
    universityParticipationsTitle.innerText = universityParticipationsEnrollTitle;
    divUniversityParticipationsDesc.innerHTML = document.getElementById(universityParticipationsEnrollCode + '-desc').innerHTML;
}));

// Form cancel button closes the dialog box
closeUniversityParticipationsEnrollDialogButton.addEventListener("click", () => {
    universityParticipationsEnrollPage2.classList.remove('show');
    universityParticipationsEnrollDialog.close();
});

function CloseUniversityParticipationsEnrollDialog() {
    universityParticipationsEnrollPage2.classList.remove('show');
    universityParticipationsEnrollDialog.close();
}

var universityParticipationsEnrollFullName;
var universityParticipationsEnrollEmailId;
var universityParticipationsEnrollLinkedInProfile;
var universityParticipationsEnrollOtherOwnedProfile;
var universityParticipationsEnrollDescribeYourself;

var universityParticipationsEnrollPage1 = document.getElementById('universityParticipationsEnrollPage1');
var universityParticipationsEnrollPage2 = document.getElementById('universityParticipationsEnrollPage2');
var universityParticipationsEnrollErrorMessage = document.getElementById('UniversityParticipationsEnrollErrorMessage');
var universityParticipationsEnrollLoader = document.getElementById('UniversityParticipationsEnrollLoader');

hideUniversityParticipationsEnrollLoader();

universityParticipationsEnrollPage1.style.display = 'block';

async function UniversityParticipationsEnroll(el) {
    var form = document.querySelector('#universityParticipationsEnrollForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayUniversityParticipationsEnrollLoader();
        universityParticipationsEnrollFullName = document.getElementById('txtUniversityParticipationsEnrollFullName').value;
        universityParticipationsEnrollEmailId = document.getElementById('txtUniversityParticipationsEnrollEmail').value;
        universityParticipationsEnrollLinkedInProfile = document.getElementById('txtUniversityParticipationsEnrollLinkedInProfile').value;
        universityParticipationsEnrollOtherOwnedProfile = document.getElementById('txtUniversityParticipationsEnrollOtherOwnedProfile').value;
        universityParticipationsEnrollDescribeYourself = document.getElementById('txtUniversityParticipationsEnrollDescribeYourself').value;
        try {
            await fetch('/UniversityProgramsEnroll', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer metaversedaily',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: universityParticipationsEnrollFullName,
                    EmailId: universityParticipationsEnrollEmailId,
                    LinkedInProfile: universityParticipationsEnrollLinkedInProfile,
                    OtherOwnedProfile: universityParticipationsEnrollOtherOwnedProfile,
                    DescribeYourself: universityParticipationsEnrollDescribeYourself,
                    ProgramType: 'Participation',
                    ProgramCode: universityParticipationsEnrollCode,
                    ProgramTitle: universityParticipationsEnrollTitle
                })
            })
                .then(function (response) {
                    hideUniversityParticipationsEnrollLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        universityParticipationsEnrollErrorMessage.style.display = 'block';
                        universityParticipationsEnrollErrorMessage.innerText = '** You have already applied for this participation. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {
                        el.disabled = false;
                        universityParticipationsEnrollErrorMessage.style.display = 'none';
                        universityParticipationsEnrollPage1.style.display = 'none';
                        universityParticipationsEnrollPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        universityParticipationsEnrollErrorMessage.style.display = 'block';
                        universityParticipationsEnrollErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) {  }
    }
}

function displayUniversityParticipationsEnrollLoader() {
    universityParticipationsEnrollLoader.style.display = 'block';
}

function hideUniversityParticipationsEnrollLoader() {
    universityParticipationsEnrollLoader.style.display = 'none';
}