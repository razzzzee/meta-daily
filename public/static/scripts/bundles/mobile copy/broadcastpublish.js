var broadcastPublishBroadcasterName;
var broadcastPublishBroadcasterEmail;
var broadcastPublishBroadcastDate;
var broadcastPublishBroadcastTitle;
var broadcastPublishBroadcastSummary;
var broadcastPublishReferenceLink;

var broadcastPublishPage1;
var broadcastPublishPage2;
var broadcastPublishErrorMessage;
var broadcastPublishLoader;

var closeBroadcastPublishDialogButton;
var broadcastPublishDialog;
var broadcastPublishButton;


closeBroadcastPublishDialogButton = document.getElementById('CloseBroadcastPublishDialog');
broadcastPublishDialog = document.getElementById('BroadcastPublishDialog');
broadcastPublishButton = document.getElementById('btnBroadcastPublish');
broadcastPublishDialog.returnValue = "Success";

broadcastPublishPage1 = document.getElementById('broadcastPublishPage1');
broadcastPublishPage2 = document.getElementById('broadcastPublishPage2');
broadcastPublishErrorMessage = document.getElementById('BroadcastPublishErrorMessage');
broadcastPublishLoader = document.getElementById('BroadcastPublishLoader');

hideBroadcastPublishLoader();

broadcastPublishPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeBroadcastPublishDialogButton.addBroadcastListener("click", () => {
    broadcastPublishPage2.classList.remove('show');
    broadcastPublishDialog.close();
});

function ShowBroadcastPublishDialog() {
    var broadcastPublishForm = broadcastPublishDialog.querySelector('#broadcastPublishForm');
    broadcastPublishForm.reset();
    broadcastPublishErrorMessage.style.display = 'none';
    broadcastPublishPage1.style.display = 'block';
    broadcastPublishDialog.style.width = "950px";
    broadcastPublishDialog.showModal();
    broadcastPublishButton.focus();
}

function CloseBroadcastPublishDialog() {
    broadcastPublishPage2.classList.remove('show');
    broadcastPublishDialog.close();
}

async function BroadcastPublish(el) {
    var broadcastPublishForm = broadcastPublishDialog.querySelector('#broadcastPublishForm');
    if (broadcastPublishForm.reportValidity()) {
        el.disabled = true;
        displayBroadcastPublishLoader();
        broadcastPublishBroadcasterName = document.getElementById('txtBroadcastPublishBroadcasterName').value;
        broadcastPublishBroadcasterEmail = document.getElementById('txtBroadcastPublishBroadcasterEmail').value;
        broadcastPublishBroadcastdate = document.getElementById('txtBroadcastPublishBroadcastDate').value;
        broadcastPublishBroadcastTitle = document.getElementById('txtBroadcastPublishBroadcastTitle').value;
        broadcastPublishBroadcastSummary = document.getElementById('txtBroadcastPublishBroadcastSummary').value;
        broadcastPublishReferenceLink = document.getElementById('txtBroadcastPublishReferenceLink').value;
        await fetch('/BroadcastPublish', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                BroadcastPublishBroadcasterName: broadcastPublishBroadcasterName,
                BroadcastPublishBroadcasterEmail: broadcastPublishBroadcasterEmail,
                BroadcastPublishBroadcastDate: broadcastPublishBroadcastDate,
                BroadcastPublishBroadcastTitle: broadcastPublishBroadcastTitle,
                BroadcastPublishBroadcastSummary: broadcastPublishBroadcastSummary,
                BroadcastPublishReferenceLink: broadcastPublishReferenceLink
            })
        })
            .then(function (response) {
                hideBroadcastPublishLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'BROADCAST-PUBLISH-EXISTS') {
                    el.disabled = false;
                    broadcastPublishErrorMessage.style.display = 'block';
                    broadcastPublishErrorMessage.innerText = '** Same broadcast already published. Cross Check Reference Link **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    broadcastPublishErrorMessage.style.display = 'none';
                    broadcastPublishPage1.style.display = 'none';
                    broadcastPublishPage2.classList.toggle('show');
                    broadcastPublishDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    broadcastPublishErrorMessage.style.display = 'block';
                    broadcastPublishErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayBroadcastPublishLoader() {
    broadcastPublishLoader.style.display = 'block';
}

function hideBroadcastPublishLoader() {
    broadcastPublishLoader.style.display = 'none';
}
