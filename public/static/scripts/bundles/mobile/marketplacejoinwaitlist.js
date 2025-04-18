
var marketplaceJoinWaitlistFullName;
var marketplaceJoinWaitlistEmailId;

var marketplaceAnnouncementPage1;
var marketplaceAnnouncementPage2;
var marketplaceJoinWaitlistErrorMessage;
var marketplaceJoinWaitlistLoader;

var openMarketplaceAnnouncementDialogButton;
var closeMarketplaceAnnouncementDialogButton;
var marketplaceAnnouncementDialog;

function SetMarketplaceJoinWaitlist() {
    openMarketplaceAnnouncementDialogButton = document.getElementById('OpenMarketplaceAnnouncementDialogButton');
    closeMarketplaceAnnouncementDialogButton = document.getElementById('CloseAnnouncementDialog');
    marketplaceAnnouncementDialog = document.getElementById('AnnouncementDialog');
    marketplaceAnnouncementDialog.returnValue = "Success";

    marketplaceAnnouncementPage1 = document.getElementById('marketplaceAnnouncementPage1');
    marketplaceAnnouncementPage2 = document.getElementById('marketplaceAnnouncementPage2');
    marketplaceJoinWaitlistErrorMessage = document.getElementById('MarketplaceJoinWaitlistErrorMessage');
    marketplaceJoinWaitlistLoader = document.getElementById('MarketPlaceJoinWaitlistLoader');

    hideMarketplaceJoinWaitlistLoader();

    marketplaceAnnouncementPage1.style.display = 'block';

    openMarketplaceAnnouncementDialogButton.addEventListener("click", () => {
        ShowMarketplaceAnnouncementDialog();
    });

    // Form cancel button closes the dialog box
    closeMarketplaceAnnouncementDialogButton.addEventListener("click", () => {
        marketplaceAnnouncementPage2.classList.remove('show');
        marketplaceAnnouncementDialog.close();
    });
}


function ShowMarketplaceAnnouncementDialog() {
    var marketplaceJoinWaitlistForm = marketplaceAnnouncementDialog.querySelector('#marketplaceJoinWaitlistForm');
    marketplaceJoinWaitlistForm.reset();
    marketplaceJoinWaitlistErrorMessage.style.display = 'none';
    marketplaceAnnouncementPage1.style.display = 'block';
    marketplaceAnnouncementPage2.style.display = 'none';
    hideMarketplaceJoinWaitlistLoader();
    marketplaceAnnouncementDialog.showModal();
}

function CloseMarketplaceAnnouncementDialog() {
    marketplaceAnnouncementPage2.classList.remove('show');
    marketplaceAnnouncementDialog.close();
}

async function MarketplaceJoinWaitlist(el) {
    var marketplaceJoinWaitlistForm = marketplaceAnnouncementDialog.querySelector('#marketplaceJoinWaitlistForm');
    if (marketplaceJoinWaitlistForm.reportValidity()) {
        el.disabled = true;
        displayMarketplaceJoinWaitlistLoader();
        marketplaceJoinWaitlistFullName = document.getElementById('txtMarketplaceJoinWaitlistFullName').value;
        marketplaceJoinWaitlistEmailId = document.getElementById('txtMarketplaceJoinWaitlistEmail').value;
        await fetch('/MarketplaceJoinWaitlist', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer metaversedaily',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MarketplaceWaitlistFullName: marketplaceJoinWaitlistFullName,
                MarketplaceWaitlistEmailId: marketplaceJoinWaitlistEmailId
            })
        })
            .then(function (response) {
                hideMarketplaceJoinWaitlistLoader();
                return response.text();
            }).then(function (data) {
                if (data == 'MARKETPLACE-WAITLIST-EXISTS') {
                    el.disabled = false;
                    marketplaceJoinWaitlistErrorMessage.style.display = 'block';
                    marketplaceJoinWaitlistErrorMessage.innerText = '** You are already in marketplace waitlist with Metaverse Daily. Please get your updates on mail.**';
                }
                else if (data == 'SUCCESS') {
                    el.disabled = false;
                    marketplaceJoinWaitlistErrorMessage.style.display = 'none';
                    marketplaceAnnouncementPage1.style.display = 'none';
                    marketplaceAnnouncementPage2.style.display = 'block';
                    marketplaceAnnouncementPage2.classList.toggle('show');
                }
                else {
                    el.disabled = false;
                    marketplaceJoinWaitlistErrorMessage.style.display = 'block';
                    marketplaceJoinWaitlistErrorMessage.innerText = '** System Error. Try after sometime. **';
                }
            });
    }
}

function displayMarketplaceJoinWaitlistLoader() {
    marketplaceJoinWaitlistLoader.style.display = 'block';
}

function hideMarketplaceJoinWaitlistLoader() {
    marketplaceJoinWaitlistLoader.style.display = 'none';
}