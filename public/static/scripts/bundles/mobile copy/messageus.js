const messageUsDialog = document.getElementById('MetaverseDailyMessageUsDialog');
const openMessageUsDialogButton = document.getElementById('OpenMessageUsDialogButton');
const closeMessageUsDialogButton = document.getElementById('CloseMessageUsDialogButton');
messageUsDialog.returnValue = "Success";

openMessageUsDialogButton.addEventListener("click", () => {
    var form = document.querySelector('#messageUsForm');
    form.reset();
    messageUsErrorMessage.style.display = 'none';
    messageUsPage1.style.display = 'block';
    messageUsDialog.showModal();
});

closeMessageUsDialogButton.addEventListener("click", () => {
    messageUsPage2.classList.remove('show');
    messageUsDialog.close();
});

function CloseMessageUsDialog() {
    messageUsPage2.classList.remove('show');
    messageUsDialog.close();
}

var messageUsFullName;
var messageUsEmailId;
var messageUsMessage;

var messageUsPage1 = document.getElementById('messageUsPage1');
var messageUsPage2 = document.getElementById('messageUsPage2');
var messageUsErrorMessage = document.getElementById('MessageUsErrorMessage');
var messageUsLoader = document.getElementById('MessageUsLoader');

hideMessageUsLoader();

messageUsPage1.style.display = 'block';

async function MessageUsSend(el) {
    var form = document.querySelector('#messageUsForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displayMessageUsLoader();
        messageUsFullName = document.getElementById('txtMessageUsFullName').value;
        messageUsEmailId = document.getElementById('txtMessageUsEmail').value;
        messageUsMessage = document.getElementById('txtMessageUsMessage').value;
        await fetch('/MessageUs', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: messageUsFullName,
                EmailId: messageUsEmailId,
                Message: messageUsMessage
            })
        })
            .then(function (response) {
                hideMessageUsLoader();
                return response.text();
            })
            .then(function (data) {
                if (data == 'SUCCESS') {
                    el.disabled = false;
                    messageUsErrorMessage.style.display = 'none';
                    messageUsPage1.style.display = 'none';
                    messageUsPage2.classList.toggle('show');
                }
                else {
                    el.disabled = false;
                    messageUsErrorMessage.style.display = 'block';
                    messageUsErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayMessageUsLoader() {
    messageUsLoader.style.display = 'block';
}   

function hideMessageUsLoader() {
    messageUsLoader.style.display = 'none';
}
