const subscribeNewsletterDialog = document.getElementById('MetaverseDailySubscribeDialog');
const openSubscribeNewsletterDialogButton = document.getElementById('OpenSubscribeNewsletterDialogButton');
const closeSubscribeNewsletterDialogButton = document.getElementById('CloseSubscribeNewsletterDialogButton');
subscribeNewsletterDialog.returnValue = "Success";

openSubscribeNewsletterDialogButton.addEventListener("click", () => {   
    var form = subscribeNewsletterDialog.querySelector('#subscribeNewsletterForm');
    form.reset();
    var datetime=new Date().getTime();
    subscribeNewsletterPage1.style.display = 'block';
    subscribeNewsletterDialog.style.height = "320px";
    subscribeNewsletterDialog.showModal();
});

closeSubscribeNewsletterDialogButton.addEventListener("click", () => {
    subscribeNewsletterPage2.classList.remove('show');
    subscribeNewsletterDialog.close();
});

function CloseSubscribeNewsletterDialog() {
    subscribeNewsletterPage2.classList.remove('show');
    subscribeNewsletterDialog.close();
}

function ShowSubscribeNewsletterDialog() {
    var form = subscribeNewsletterDialog.querySelector('#subscribeNewsletterForm');
    form.reset();
    var datetime=new Date().getTime();
    subscribeNewsletterPage1.style.display = 'block';
    subscribeNewsletterDialog.style.height = "320px";
    subscribeNewsletterDialog.showModal();
}

var subscribeNewsletterFullName;
var subscribeNewsletterEmailId;

var subscribeNewsletterPage1 = document.getElementById('subscribeNewsletterPage1');
var subscribeNewsletterPage2 = document.getElementById('subscribeNewsletterPage2');
var subscribeNewsletterErrorMessage = document.getElementById('SubscribeNewsletterErrorMessage');
var subscribeNewsletterLoader = document.getElementById('SubscribeNewsletterLoader');

hideSubscribeNewsletterLoader();

subscribeNewsletterPage1.style.display = 'block';

async function SubscribeNewsletter(el) {
    var form = document.querySelector('#subscribeNewsletterForm');
    if (form.reportValidity()) {
        el.disabled = true;
        displaySubscribeNewsletterLoader();
        subscribeNewsletterFullName = document.getElementById('txtSubscribeNewsletterFullName').value;
        subscribeNewsletterEmailId = document.getElementById('txtSubscribeNewsletterEmail').value;
        await fetch('/SubscribeNewsletter', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                FullName: subscribeNewsletterFullName,
                EmailId: subscribeNewsletterEmailId
            })
        })
            .then(function (response) {
                hideSubscribeNewsletterLoader();
                el.disabled = false;
                return response.text();
            })
            .then(function (data) {
                if (data == 'SUCCESS') {
                    subscribeNewsletterErrorMessage.style.display = 'none';
                    subscribeNewsletterDialog.style.height = "500px";
                    subscribeNewsletterPage1.style.display = 'none';
                    subscribeNewsletterPage2.classList.toggle('show');
                }
                else if(data == 'EMAIL-SUBSCRIBED')
                {
                    CloseSubscribeNewsletterDialog();
                    butterup.toast({
                      title:'Message',
                      message:'Subcription for this email is already active.',
                      type:'error',
                      icon: true,
                      dismissable: true
                    });
                }
                else {
                    subscribeNewsletterErrorMessage.style.display = 'block';
                    subscribeNewsletterErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displaySubscribeNewsletterLoader() {
    subscribeNewsletterLoader.style.display = 'block';
}   

function hideSubscribeNewsletterLoader() {
    subscribeNewsletterLoader.style.display = 'none';
}
