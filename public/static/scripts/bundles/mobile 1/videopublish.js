var videoPublishName;
var videoPublishEmail;
var videoPublishVideoTitle;
var videoPublishReferenceLink;
var videoPublishEmbeddLink;
var videoPublishEmbeddCode;

var videoPublishPage1;
var videoPublishPage2;
var videoPublishErrorMessage;
var videoPublishLoader;

var closeVideoPublishDialogButton;
var videoPublishDialog;


closeVideoPublishDialogButton = document.getElementById('CloseVideoPublishDialog');
videoPublishDialog = document.getElementById('VideoPublishDialog');
videoPublishDialog.returnValue = "Success";

videoPublishPage1 = document.getElementById('videoPublishPage1');
videoPublishPage2 = document.getElementById('videoPublishPage2');
videoPublishErrorMessage = document.getElementById('VideoPublishErrorMessage');
videoPublishLoader = document.getElementById('VideoPublishLoader');

hideVideoPublishLoader();

videoPublishPage1.style.display = 'block';

// Form cancel button closes the dialog box
closeVideoPublishDialogButton.addVideoListener("click", () => {
    videoPublishPage2.classList.remove('show');
    videoPublishDialog.close();
});

function ShowVideoPublishDialog() {
    var videoPublishForm = videoPublishDialog.querySelector('#videoPublishForm');
    videoPublishForm.reset();
    videoPublishErrorMessage.style.display = 'none';
    videoPublishPage1.style.display = 'block';
    videoPublishDialog.style.width = "950px";
    videoPublishDialog.showModal();
}

function CloseVideoPublishDialog() {
    videoPublishPage2.classList.remove('show');
    videoPublishDialog.close();
}

async function VideoPublish(el) {
    var videoPublishForm = videoPublishDialog.querySelector('#videoPublishForm');
    if (videoPublishForm.reportValidity()) {
        el.disabled = true;
        displayVideoPublishLoader();
        videoPublishName = document.getElementById('txtVideoPublishName').value;
        videoPublishEmail = document.getElementById('txtVideoPublishEmail').value;
        videoPublishVideoTitle = document.getElementById('txtVideoPublishVideoTitle').value;
        videoPublishReferenceLink = document.getElementById('txtVideoPublishReferenceLink').value;
        videoPublishEmbeddLink = document.getElementById('txtVideoPublishEmbeddLink').value;
        videoPublishEmbeddCode = document.getElementById('txtVideoPublishEmbeddCode').value;
        await fetch('/VideoPublish', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                VideoPublishName: videoPublishName,
                VideoPublishEmail: videoPublishEmail,
                VideoPublishVideoTitle: videoPublishVideoTitle,
                VideoPublishReferenceLink: videoPublishReferenceLink,
                VideoPublishEmbeddLink: videoPublishEmbeddLink,
                VideoPublishEmbeddCode: videoPublishEmbeddCode
            })
        })
            .then(function (response) {
                hideVideoPublishLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'VIDEO-PUBLISH-EXISTS') {
                    el.disabled = false;
                    videoPublishErrorMessage.style.display = 'block';
                    videoPublishErrorMessage.innerText = '** Same video already published. Cross Check Reference Link **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    videoPublishErrorMessage.style.display = 'none';
                    videoPublishPage1.style.display = 'none';
                    videoPublishPage2.classList.toggle('show');
                    videoPublishDialog.style.width = "320px";
                }
                else {
                    el.disabled = false;
                    videoPublishErrorMessage.style.display = 'block';
                    videoPublishErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayVideoPublishLoader() {
    videoPublishLoader.style.display = 'block';
}

function hideVideoPublishLoader() {
    videoPublishLoader.style.display = 'none';
}
