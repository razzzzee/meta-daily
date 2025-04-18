var offerPublishName;
var offerPublishEmail;
var offerPublishOfferStartDate;
var offerPublishOfferCode;
var offerPublishOfferTitle;
var offerPublishReferenceLink;
var offerPublishEmbeddLink;

var offerPublishPage1;
var offerPublishPage2;
var offerPublishErrorMessage;
var offerPublishLoader;

var closeOfferPublishDialogButton;
var offerPublishDialog;
var offerPublishButton;


closeOfferPublishDialogButton = document.getElementById('CloseOfferPublishDialog');
offerPublishDialog = document.getElementById('OfferPublishDialog');
offerPublishButton = document.getElementById('btnOfferPublish');
offerPublishDialog.returnValue = "Success";

offerPublishPage1 = document.getElementById('offerPublishPage1');
offerPublishPage2 = document.getElementById('offerPublishPage2');
offerPublishErrorMessage = document.getElementById('OfferPublishErrorMessage');
offerPublishLoader = document.getElementById('OfferPublishLoader');

hideOfferPublishLoader();

offerPublishPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeOfferPublishDialogButton.addOfferListener("click", () => {
    offerPublishPage2.classList.remove('show');
    offerPublishDialog.close();
});

function ShowOfferPublishDialog() {
    var offerPublishForm = offerPublishDialog.querySelector('#offerPublishForm');
    offerPublishForm.reset();
    offerPublishErrorMessage.style.display = 'none';
    offerPublishPage1.style.display = 'block';
    offerPublishDialog.style.width = "950px";
    offerPublishDialog.showModal();
    offerPublishButton.focus();
}

function CloseOfferPublishDialog() {
    offerPublishPage2.classList.remove('show');
    offerPublishDialog.close();
}

async function OfferPublish(el) {
    var offerPublishForm = offerPublishDialog.querySelector('#offerPublishForm');
    if (offerPublishForm.reportValidity()) {
        el.disabled = true;
        displayOfferPublishLoader();
        offerPublishName = document.getElementById('txtOfferPublishName').value;
        offerPublishEmail = document.getElementById('txtOfferPublishEmail').value;
        offerPublishOfferdate = document.getElementById('txtOfferPublishOfferStartDate').value;
        offerPublishOfferCode = document.getElementById('txtOfferPublishOfferCode').value;
        offerPublishOfferTitle = document.getElementById('txtOfferPublishOfferTitle').value;
        offerPublishReferenceLink = document.getElementById('txtOfferPublishReferenceLink').value;
        offerPublishEmbeddLink = document.getElementById('txtOfferPublishEmbeddLink').value;
        await fetch('/OfferPublish', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                OfferPublishName: offerPublishName,
                OfferPublishEmail: offerPublishEmail,
                OfferPublishOfferStartDate: offerPublishOfferStartDate,
                OfferPublishOfferCode: offerPublishOfferCode,
                OfferPublishOfferTitle: offerPublishOfferTitle,
                OfferPublishReferenceLink: offerPublishReferenceLink,
                OfferPublishEmbeddLink: offerPublishEmbeddLink
            })
        })
            .then(function (response) {
                hideOfferPublishLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'OFFER-PUBLISH-EXISTS') {
                    el.disabled = false;
                    offerPublishErrorMessage.style.display = 'block';
                    offerPublishErrorMessage.innerText = '** Same offer already published. Cross Check Reference Link **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    offerPublishErrorMessage.style.display = 'none';
                    offerPublishPage1.style.display = 'none';
                    offerPublishPage2.classList.toggle('show');
                    offerPublishDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    offerPublishErrorMessage.style.display = 'block';
                    offerPublishErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayOfferPublishLoader() {
    offerPublishLoader.style.display = 'block';
}

function hideOfferPublishLoader() {
    offerPublishLoader.style.display = 'none';
}
