const contactUsDialog = document.getElementById('MetaverseDailyContactUsDialog');
const openContactUsDialogButton = document.getElementById('OpenContactUsDialogButton');
const closeContactUsDialogButton = document.getElementById('CloseContactUsDialogButton');
contactUsDialog.returnValue = "Success";

openContactUsDialogButton.addEventListener("click", () => {
    var form = document.querySelector('#contactUsForm');
    form.reset();
    contactUsErrorMessage.style.display = 'none';
    contactUsPage1.style.display = 'block';
    contactUsDialog.showModal();
});

closeContactUsDialogButton.addEventListener("click", () => {
    contactUsPage2.classList.remove('show');
    contactUsDialog.close();
});

function CloseContactUsDialog() {
    contactUsPage2.classList.remove('show');
    contactUsDialog.close();
}

var contactUsFullName;
var contactUsEmailId;
var contactUsContact;

var contactUsPage1 = document.getElementById('contactUsPage1');
var contactUsPage2 = document.getElementById('contactUsPage2');
var contactUsErrorMessage = document.getElementById('ContactUsErrorMessage');
var contactUsLoader = document.getElementById('ContactUsLoader');

hideContactUsLoader();

contactUsPage1.style.display = 'block';

async function ContactUsSend(el) {
    var form = document.querySelector('#contactUsForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayContactUsLoader();
        contactUsFullName = document.getElementById('txtContactUsFullName').value;
        contactUsEmailId = document.getElementById('txtContactUsEmail').value;
        contactUsMessage = document.getElementById('txtContactUsMessage').value;
        await fetch('/ContactUs', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: contactUsFullName,
                EmailId: contactUsEmailId,
                Message: contactUsMessage
            })
        })
            .then(function (response) {
                hideContactUsLoader();
                return response.text();
            })
            .then(function (data) {
                if (data == 'SUCCESS') {
                    el.disabled = false;
                    contactUsErrorMessage.style.display = 'none';
                    contactUsPage1.style.display = 'none';
                    contactUsPage2.classList.toggle('show');
                }
                else {
                    el.disabled = false;
                    contactUsErrorMessage.style.display = 'block';
                    contactUsErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayContactUsLoader() {
    contactUsLoader.style.display = 'block';
}   

function hideContactUsLoader() {
    contactUsLoader.style.display = 'none';
}
