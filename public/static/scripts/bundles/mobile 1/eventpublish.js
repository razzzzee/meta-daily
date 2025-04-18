var eventPublishName;
var eventPublishEmail;
var eventPublishEventDate;
var eventPublishEventTitle;
var eventPublishReferenceLink;
var eventPublishEmbeddLink;
var eventPublishBookingLink;

var eventPublishPage1;
var eventPublishPage2;
var eventPublishErrorMessage;
var eventPublishLoader;

var closeEventPublishDialogButton;
var eventPublishDialog;
var eventPublishButton;


closeEventPublishDialogButton = document.getElementById('CloseEventPublishDialog');
eventPublishDialog = document.getElementById('EventPublishDialog');
eventPublishButton = document.getElementById('btnEventPublish');
eventPublishDialog.returnValue = "Success";

eventPublishPage1 = document.getElementById('eventPublishPage1');
eventPublishPage2 = document.getElementById('eventPublishPage2');
eventPublishErrorMessage = document.getElementById('EventPublishErrorMessage');
eventPublishLoader = document.getElementById('EventPublishLoader');

hideEventPublishLoader();

eventPublishPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeEventPublishDialogButton.addEventListener("click", () => {
    eventPublishPage2.classList.remove('show');
    eventPublishDialog.close();
});

function ShowEventPublishDialog() {
    var eventPublishForm = eventPublishDialog.querySelector('#eventPublishForm');
    eventPublishForm.reset();
    eventPublishErrorMessage.style.display = 'none';
    eventPublishPage1.style.display = 'block';
    eventPublishDialog.style.width = "950px";
    eventPublishDialog.showModal();
    eventPublishButton.focus();
}

function CloseEventPublishDialog() {
    eventPublishPage2.classList.remove('show');
    eventPublishDialog.close();
}

async function EventPublish(el) {
    var eventPublishForm = eventPublishDialog.querySelector('#eventPublishForm');
    if (eventPublishForm.reportValidity()) {
        el.disabled = true;
        displayEventPublishLoader();
        eventPublishName = document.getElementById('txtEventPublishName').value;
        eventPublishEmail = document.getElementById('txtEventPublishEmail').value;
        eventPublishEventdate = document.getElementById('txtEventPublishEventDate').value;
        eventPublishEventTitle = document.getElementById('txtEventPublishEventTitle').value;
        eventPublishReferenceLink = document.getElementById('txtEventPublishReferenceLink').value;
        eventPublishEmbeddLink = document.getElementById('txtEventPublishEmbeddLink').value;
        eventPublishBookingLink = document.getElementById('txtEventPublishBookingLink').value;
        await fetch('/EventPublish', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                EventPublishName: eventPublishName,
                EventPublishEmail: eventPublishEmail,
                EventPublishEventDate: eventPublishEventDate,
                EventPublishEventTitle: eventPublishEventTitle,
                EventPublishReferenceLink: eventPublishReferenceLink,
                EventPublishEmbeddLink: eventPublishEmbeddLink,
                EventPublishBookingLink: eventPublishBookingLink
            })
        })
            .then(function (response) {
                hideEventPublishLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'EVENT-PUBLISH-EXISTS') {
                    el.disabled = false;
                    eventPublishErrorMessage.style.display = 'block';
                    eventPublishErrorMessage.innerText = '** Same event already published. Cross Check Reference Link **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    eventPublishErrorMessage.style.display = 'none';
                    eventPublishPage1.style.display = 'none';
                    eventPublishPage2.classList.toggle('show');
                    eventPublishDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    eventPublishErrorMessage.style.display = 'block';
                    eventPublishErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayEventPublishLoader() {
    eventPublishLoader.style.display = 'block';
}

function hideEventPublishLoader() {
    eventPublishLoader.style.display = 'none';
}
