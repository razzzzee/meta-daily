
var universityWorkshopsEnrollCode;
var universityWorkshopsEnrollTitle;
const btnUniversityWorkshopsEnroll = document.querySelectorAll('.universityworkshops-enroll');
const universityWorkshopsEnrollDialog = document.getElementById('UniversityWorkshopsEnrollDialog');
var closeUniversityWorkshopsEnrollDialogButton = document.getElementById('CloseUniversityWorkshopsEnrollDialogButton');
var divUniversityWorkshopsDesc = document.getElementById('divUniversityWorkshopsDesc');
var universityWorkshopsTitle = document.getElementById('UniversityWorkshopsTitle');
universityWorkshopsEnrollDialog.returnValue = "Success";
btnUniversityWorkshopsEnroll.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#universityWorkshopsEnrollForm');
    form.reset();
    universityWorkshopsEnrollErrorMessage.style.display = 'none';
    $("#ScrollableUniversityWorkshopsEnrollForm").animate({ scrollTop: 0 }, "slow");
    universityWorkshopsEnrollPage1.style.display = 'block';
    universityWorkshopsEnrollDialog.showModal();
    universityWorkshopsEnrollCode = event.currentTarget.getAttribute("data-attribute-id");
    universityWorkshopsEnrollTitle = event.currentTarget.getAttribute("data-attribute-universityworkshops");
    universityWorkshopsTitle.innerText = universityWorkshopsEnrollTitle;
    divUniversityWorkshopsDesc.innerHTML = document.getElementById(universityWorkshopsEnrollCode + '-desc').innerHTML;
}));

// Form cancel button closes the dialog box
closeUniversityWorkshopsEnrollDialogButton.addEventListener("click", () => {
    universityWorkshopsEnrollPage2.classList.remove('show');
    universityWorkshopsEnrollDialog.close();
});

function CloseUniversityWorkshopsEnrollDialog() {
    universityWorkshopsEnrollPage2.classList.remove('show');
    universityWorkshopsEnrollDialog.close();
}

var universityWorkshopsEnrollFullName;
var universityWorkshopsEnrollEmailId;
var universityWorkshopsEnrollLinkedInProfile;
var universityWorkshopsEnrollOtherOwnedProfile;
var universityWorkshopsEnrollDescribeYourself;

var universityWorkshopsEnrollPage1 = document.getElementById('universityWorkshopsEnrollPage1');
var universityWorkshopsEnrollPage2 = document.getElementById('universityWorkshopsEnrollPage2');
var universityWorkshopsEnrollErrorMessage = document.getElementById('UniversityWorkshopsEnrollErrorMessage');
var universityWorkshopsEnrollLoader = document.getElementById('UniversityWorkshopsEnrollLoader');

hideUniversityWorkshopsEnrollLoader();

universityWorkshopsEnrollPage1.style.display = 'block';

async function UniversityWorkshopsEnroll(el) {
    var form = document.querySelector('#universityWorkshopsEnrollForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayUniversityWorkshopsEnrollLoader();
        universityWorkshopsEnrollFullName = document.getElementById('txtUniversityWorkshopsEnrollFullName').value;
        universityWorkshopsEnrollEmailId = document.getElementById('txtUniversityWorkshopsEnrollEmail').value;
        universityWorkshopsEnrollLinkedInProfile = document.getElementById('txtUniversityWorkshopsEnrollLinkedInProfile').value;
        universityWorkshopsEnrollOtherOwnedProfile = document.getElementById('txtUniversityWorkshopsEnrollOtherOwnedProfile').value;
        universityWorkshopsEnrollDescribeYourself = document.getElementById('txtUniversityWorkshopsEnrollDescribeYourself').value;
        try {
            await fetch('/UniversityProgramsEnroll', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer metaversedaily',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: universityWorkshopsEnrollFullName,
                    EmailId: universityWorkshopsEnrollEmailId,
                    LinkedInProfile: universityWorkshopsEnrollLinkedInProfile,
                    OtherOwnedProfile: universityWorkshopsEnrollOtherOwnedProfile,
                    DescribeYourself: universityWorkshopsEnrollDescribeYourself,
                    ProgramType: 'Workshop',
                    ProgramCode: universityWorkshopsEnrollCode,
                    ProgramTitle: universityWorkshopsEnrollTitle
                })
            })
                .then(function (response) {
                    hideUniversityWorkshopsEnrollLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        universityWorkshopsEnrollErrorMessage.style.display = 'block';
                        universityWorkshopsEnrollErrorMessage.innerText = '** You have already applied for this workshop. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {
                        el.disabled = false;
                        universityWorkshopsEnrollErrorMessage.style.display = 'none';
                        universityWorkshopsEnrollPage1.style.display = 'none';
                        universityWorkshopsEnrollPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        universityWorkshopsEnrollErrorMessage.style.display = 'block';
                        universityWorkshopsEnrollErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) {  }
    }
}

function displayUniversityWorkshopsEnrollLoader() {
    universityWorkshopsEnrollLoader.style.display = 'block';
}

function hideUniversityWorkshopsEnrollLoader() {
    universityWorkshopsEnrollLoader.style.display = 'none';
}