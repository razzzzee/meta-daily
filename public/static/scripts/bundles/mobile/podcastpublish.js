var podcastPublishName;
var podcastPublishEmail;
var podcastPublishPodcastDate;
var podcastPublishPodcastTitle;
var podcastPublishReferenceLink;
var podcastPublishEmbeddLink;
var podcastPublishEmbeddCode;

var podcastPublishPage1;
var podcastPublishPage2;
var podcastPublishErrorMessage;
var podcastPublishLoader;

var closePodcastPublishDialogButton;
var podcastPublishDialog;
var podcastPublishButton;


closePodcastPublishDialogButton = document.getElementById('ClosePodcastPublishDialog');
podcastPublishDialog = document.getElementById('PodcastPublishDialog');
podcastPublishButton = document.getElementById('btnPodcastPublish');
podcastPublishDialog.returnValue = "Success";

podcastPublishPage1 = document.getElementById('podcastPublishPage1');
podcastPublishPage2 = document.getElementById('podcastPublishPage2');
podcastPublishErrorMessage = document.getElementById('PodcastPublishErrorMessage');
podcastPublishLoader = document.getElementById('PodcastPublishLoader');

hidePodcastPublishLoader();

podcastPublishPage1.style.display = 'block';

// Form cancel button closes the dialog box
closePodcastPublishDialogButton.addEventListener("click", () => {
    podcastPublishPage2.classList.remove('show');
    podcastPublishDialog.close();
});

function ShowPodcastPublishDialog() {
    var podcastPublishForm = podcastPublishDialog.querySelector('#podcastPublishForm');
    podcastPublishForm.reset();
    podcastPublishErrorMessage.style.display = 'none';
    podcastPublishPage1.style.display = 'block';
    podcastPublishDialog.showModal();
    podcastPublishButton.focus();
}

function ClosePodcastPublishDialog() {
    podcastPublishPage2.classList.remove('show');
    podcastPublishDialog.close();
}

async function PodcastPublish(el) {
    var podcastPublishForm = podcastPublishDialog.querySelector('#podcastPublishForm');
    if (podcastPublishForm.reportValidity()) {
        el.disabled = true;
        displayPodcastPublishLoader();
        podcastPublishName = document.getElementById('txtPodcastPublishName').value;
        podcastPublishEmail = document.getElementById('txtPodcastPublishEmail').value;
        podcastPublishPodcastdate = document.getElementById('txtPodcastPublishPodcastDate').value;
        podcastPublishPodcastTitle = document.getElementById('txtPodcastPublishPodcastTitle').value;
        podcastPublishReferenceLink = document.getElementById('txtPodcastPublishReferenceLink').value;
        podcastPublishEmbeddLink = document.getElementById('txtPodcastPublishEmbeddLink').value;
        podcastPublishEmbeddCode = document.getElementById('txtPodcastPublishEmbeddCode').value;
        await fetch('/PodcastPublish', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                PodcastPublishName: podcastPublishName,
                PodcastPublishEmail: podcastPublishEmail,
                PodcastPublishPodcastDate: podcastPublishPodcastDate,
                PodcastPublishPodcastTitle: podcastPublishPodcastTitle,
                PodcastPublishReferenceLink: podcastPublishReferenceLink,
                PodcastPublishEmbeddLink: podcastPublishEmbeddLink,
                PodcastPublishEmbeddCode: podcastPublishEmbeddCode
            })
        })
            .then(function (response) {
                hidePodcastPublishLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'PODCAST-PUBLISH-EXISTS') {
                    el.disabled = false;
                    podcastPublishErrorMessage.style.display = 'block';
                    podcastPublishErrorMessage.innerText = '** Same podcast already published. Cross Check Reference Link **';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    podcastPublishErrorMessage.style.display = 'none';
                    podcastPublishPage1.style.display = 'none';
                    podcastPublishPage2.classList.toggle('show');
                }
                else {
                    el.disabled = false;
                    podcastPublishErrorMessage.style.display = 'block';
                    podcastPublishErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayPodcastPublishLoader() {
    podcastPublishLoader.style.display = 'block';
}

function hidePodcastPublishLoader() {
    podcastPublishLoader.style.display = 'none';
}
