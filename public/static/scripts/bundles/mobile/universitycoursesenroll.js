
var universityCoursesEnrollCode;
var universityCoursesEnrollTitle;
const btnUniversityCoursesEnroll = document.querySelectorAll('.universitycourses-enroll');
const universityCoursesEnrollDialog = document.getElementById('UniversityCoursesEnrollDialog');
var closeUniversityCoursesEnrollDialogButton = document.getElementById('CloseUniversityCoursesEnrollDialogButton');
var divUniversityCoursesDesc = document.getElementById('divUniversityCoursesDesc');
var universityCoursesTitle = document.getElementById('UniversityCoursesTitle');
universityCoursesEnrollDialog.returnValue = "Success";
btnUniversityCoursesEnroll.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#universityCoursesEnrollForm');
    form.reset();
    universityCoursesEnrollErrorMessage.style.display = 'none';
    $("#ScrollableUniversityCoursesEnrollForm").animate({ scrollTop: 0 }, "slow");
    universityCoursesEnrollPage1.style.display = 'block';
    universityCoursesEnrollDialog.showModal();
    universityCoursesEnrollCode = event.currentTarget.getAttribute("data-attribute-id");
    universityCoursesEnrollTitle = event.currentTarget.getAttribute("data-attribute-universitycourses");
    universityCoursesTitle.innerText = universityCoursesEnrollTitle;
    divUniversityCoursesDesc.innerHTML = document.getElementById(universityCoursesEnrollCode + '-desc').innerHTML;
    universityCoursesEnrollDialog.scrollTop = 0;
}));

// Form cancel button closes the dialog box
closeUniversityCoursesEnrollDialogButton.addEventListener("click", () => {
    universityCoursesEnrollPage2.classList.remove('show');
    universityCoursesEnrollDialog.close();
});

function CloseUniversityCoursesEnrollDialog() {
    universityCoursesEnrollPage2.classList.remove('show');
    universityCoursesEnrollDialog.close();
}

var universityCoursesEnrollFullName;
var universityCoursesEnrollEmailId;
var universityCoursesEnrollLinkedInProfile;
var universityCoursesEnrollOtherOwnedProfile;
var universityCoursesEnrollDescribeYourself;

var universityCoursesEnrollPage1 = document.getElementById('universityCoursesEnrollPage1');
var universityCoursesEnrollPage2 = document.getElementById('universityCoursesEnrollPage2');
var universityCoursesEnrollErrorMessage = document.getElementById('UniversityCoursesEnrollErrorMessage');
var universityCoursesEnrollLoader = document.getElementById('UniversityCoursesEnrollLoader');

hideUniversityCoursesEnrollLoader();

universityCoursesEnrollPage1.style.display = 'block';

async function UniversityCoursesEnroll(el) {
    var form = document.querySelector('#universityCoursesEnrollForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayUniversityCoursesEnrollLoader();
        universityCoursesEnrollFullName = document.getElementById('txtUniversityCoursesEnrollFullName').value;
        universityCoursesEnrollEmailId = document.getElementById('txtUniversityCoursesEnrollEmail').value;
        universityCoursesEnrollLinkedInProfile = document.getElementById('txtUniversityCoursesEnrollLinkedInProfile').value;
        universityCoursesEnrollOtherOwnedProfile = document.getElementById('txtUniversityCoursesEnrollOtherOwnedProfile').value;
        universityCoursesEnrollDescribeYourself = document.getElementById('txtUniversityCoursesEnrollDescribeYourself').value;
        try {
            await fetch('/UniversityProgramsEnroll', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer metaversedaily',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: universityCoursesEnrollFullName,
                    EmailId: universityCoursesEnrollEmailId,
                    LinkedInProfile: universityCoursesEnrollLinkedInProfile,
                    OtherOwnedProfile: universityCoursesEnrollOtherOwnedProfile,
                    DescribeYourself: universityCoursesEnrollDescribeYourself,
                    ProgramType: 'Course',
                    ProgramCode: universityCoursesEnrollCode,
                    ProgramTitle: universityCoursesEnrollTitle
                })
            })
                .then(function (response) {
                    hideUniversityCoursesEnrollLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        universityCoursesEnrollErrorMessage.style.display = 'block';
                        universityCoursesEnrollErrorMessage.innerText = '** You have already applied for this course. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {
                        el.disabled = false;
                        universityCoursesEnrollErrorMessage.style.display = 'none';
                        universityCoursesEnrollPage1.style.display = 'none';
                        universityCoursesEnrollPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        universityCoursesEnrollErrorMessage.style.display = 'block';
                        universityCoursesEnrollErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) {  }
    }
}

function displayUniversityCoursesEnrollLoader() {
    universityCoursesEnrollLoader.style.display = 'block';
}

function hideUniversityCoursesEnrollLoader() {
    universityCoursesEnrollLoader.style.display = 'none';
}