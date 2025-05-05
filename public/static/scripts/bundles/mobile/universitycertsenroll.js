
var universityCertsEnrollCode;
var universityCertsEnrollTitle;
const btnUniversityCertsEnroll = document.querySelectorAll('.universitycerts-enroll');
const universityCertsEnrollDialog = document.getElementById('UniversityCertsEnrollDialog');
var closeUniversityCertsEnrollDialogButton = document.getElementById('CloseUniversityCertsEnrollDialogButton');
var divUniversityCertsDesc = document.getElementById('divUniversityCertsDesc');
var universityCertsTitle = document.getElementById('UniversityCertsTitle');
universityCertsEnrollDialog.returnValue = "Success";
btnUniversityCertsEnroll.forEach(el => el.addEventListener('click', event => {
    var form = document.querySelector('#universityCertsEnrollForm');
    form.reset();
    universityCertsEnrollErrorMessage.style.display = 'none';
    $("#ScrollableUniversityCertsEnrollForm").animate({ scrollTop: 0 }, "slow");
    universityCertsEnrollPage1.style.display = 'block';
    universityCertsEnrollDialog.showModal();
    universityCertsEnrollCode = event.currentTarget.getAttribute("data-attribute-id");
    universityCertsEnrollTitle = event.currentTarget.getAttribute("data-attribute-universitycerts");
    universityCertsTitle.innerText = universityCertsEnrollTitle;
    divUniversityCertsDesc.innerHTML = document.getElementById(universityCertsEnrollCode + '-desc').innerHTML;
    universityCertsEnrollDialog.scrollTop = 0;
}));

// Form cancel button closes the dialog box
closeUniversityCertsEnrollDialogButton.addEventListener("click", () => {
    universityCertsEnrollPage2.classList.remove('show');
    universityCertsEnrollDialog.close();
});

function CloseUniversityCertsEnrollDialog() {
    universityCertsEnrollPage2.classList.remove('show');
    universityCertsEnrollDialog.close();
}

var universityCertsEnrollFullName;
var universityCertsEnrollEmailId;
var universityCertsEnrollLinkedInProfile;
var universityCertsEnrollOtherOwnedProfile;
var universityCertsEnrollDescribeYourself;

var universityCertsEnrollPage1 = document.getElementById('universityCertsEnrollPage1');
var universityCertsEnrollPage2 = document.getElementById('universityCertsEnrollPage2');
var universityCertsEnrollErrorMessage = document.getElementById('UniversityCertsEnrollErrorMessage');
var universityCertsEnrollLoader = document.getElementById('UniversityCertsEnrollLoader');

hideUniversityCertsEnrollLoader();

universityCertsEnrollPage1.style.display = 'block';

async function UniversityCertsEnroll(el) {
    var form = document.querySelector('#universityCertsEnrollForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayUniversityCertsEnrollLoader();
        universityCertsEnrollFullName = document.getElementById('txtUniversityCertsEnrollFullName').value;
        universityCertsEnrollEmailId = document.getElementById('txtUniversityCertsEnrollEmail').value;
        universityCertsEnrollLinkedInProfile = document.getElementById('txtUniversityCertsEnrollLinkedInProfile').value;
        universityCertsEnrollOtherOwnedProfile = document.getElementById('txtUniversityCertsEnrollOtherOwnedProfile').value;
        universityCertsEnrollDescribeYourself = document.getElementById('txtUniversityCertsEnrollDescribeYourself').value;
        try {
            await fetch('/UniversityProgramsEnroll', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer metaversedaily',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    FullName: universityCertsEnrollFullName,
                    EmailId: universityCertsEnrollEmailId,
                    LinkedInProfile: universityCertsEnrollLinkedInProfile,
                    OtherOwnedProfile: universityCertsEnrollOtherOwnedProfile,
                    DescribeYourself: universityCertsEnrollDescribeYourself,
                    ProgramType: 'Certification',
                    ProgramCode: universityCertsEnrollCode,
                    ProgramTitle: universityCertsEnrollTitle
                })
            })
                .then(function (response) {
                    hideUniversityCertsEnrollLoader();
                    return response.text();
                })
                .then(function (data) {
                    if (data == 'APPLIED') {
                        el.disabled = false;
                        universityCertsEnrollErrorMessage.style.display = 'block';
                        universityCertsEnrollErrorMessage.innerText = '** You have already applied for this certification. Please check your mails.**';
                    }
                    else if (data == 'SUCCESS') {
                        el.disabled = false;
                        universityCertsEnrollErrorMessage.style.display = 'none';
                        universityCertsEnrollPage1.style.display = 'none';
                        universityCertsEnrollPage2.classList.toggle('show');
                        //emailForVerification.innerText = emailId;
                    }
                    else {
                        el.disabled = false;
                        universityCertsEnrollErrorMessage.style.display = 'block';
                        universityCertsEnrollErrorMessage.innerText = '** System Error. Try after sometime. **';
                    }
                });
        }
        catch (error) {  }
    }
}

function displayUniversityCertsEnrollLoader() {
    universityCertsEnrollLoader.style.display = 'block';
}

function hideUniversityCertsEnrollLoader() {
    universityCertsEnrollLoader.style.display = 'none';
}