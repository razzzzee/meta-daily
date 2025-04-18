var educatorVideoEmail;
var educatorVideoVideoLink;

var educatorVideoPage1;
var educatorVideoPage2;
var educatorVideoErrorMessage;
var educatorVideoLoader;

var closeEducatorVideoDialogButton;
var educatorVideoDialog;
var educatorVideoButton;


closeEducatorVideoDialogButton = document.getElementById('CloseEducatorVideoDialog');
educatorVideoDialog = document.getElementById('EducatorVideoDialog');
educatorVideoButton = document.getElementById('btnEducatorVideo');
educatorVideoDialog.returnValue = "Success";

educatorVideoPage1 = document.getElementById('educatorVideoPage1');
educatorVideoPage2 = document.getElementById('educatorVideoPage2');
educatorVideoErrorMessage = document.getElementById('EducatorVideoErrorMessage');
educatorVideoLoader = document.getElementById('EducatorVideoLoader');

hideEducatorVideoLoader();

educatorVideoPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeEducatorVideoDialogButton.addEventListener("click", () => {
    educatorVideoPage2.classList.remove('show');
    educatorVideoDialog.close();
});

function ShowEducatorVideoDialog() {
    var educatorVideoForm = educatorVideoDialog.querySelector('#educatorVideoForm');
    educatorVideoForm.reset();
    educatorVideoErrorMessage.style.display = 'none';
    educatorVideoPage1.style.display = 'block';
    educatorVideoDialog.style.width = "950px";
    educatorVideoDialog.showModal();
    educatorVideoButton.focus();
}

function CloseEducatorVideoDialog() {
    educatorVideoPage2.classList.remove('show');
    educatorVideoDialog.close();
}

async function EducatorVideo(el) {
    var educatorVideoForm = educatorVideoDialog.querySelector('#educatorVideoForm');
    if (educatorVideoForm.reportValidity()) {
        el.disabled = true;
        displayEducatorVideoLoader();
        educatorVideoEmail = document.getElementById('txtEducatorVideoEmail').value;
        educatorVideoVideoLink = document.getElementById('txtEducatorVideoVideoLink').value;
        await fetch('/EducatorVideo', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EducatorVideoEmail: educatorVideoEmail,
                EducatorVideoVideoLink: educatorVideoVideoLink
            })
        })
            .then(function (response) {
                hideEducatorVideoLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'EDUCATOR-VIDEO-EXISTS') {
                    el.disabled = false;
                    educatorVideoErrorMessage.style.display = 'block';
                    educatorVideoErrorMessage.innerText = '** Same Video Link is already submitted. Please cross check. **';
                }
                else if (data == 'EDUCATOR-VIDEO-EMAILID-NOT-VERIFIED') {
                    el.disabled = false;
                    educatorVideoErrorMessage.style.display = 'block';
                    educatorVideoErrorMessage.innerText = '** Provided Email Id is not verified. Please Sign Up First. **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    educatorVideoErrorMessage.style.display = 'none';
                    educatorVideoPage1.style.display = 'none';
                    educatorVideoPage2.classList.toggle('show');
                    educatorVideoDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    educatorVideoErrorMessage.style.display = 'block';
                    educatorVideoErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayEducatorVideoLoader() {
    educatorVideoLoader.style.display = 'block';
}

function hideEducatorVideoLoader() {
    educatorVideoLoader.style.display = 'none';
}
