
const btnResearchLabsKnowMore = document.querySelectorAll('.researchlabs-know-more');
const researchLabsKnowMoreDialog = document.getElementById('ResearchLabsKnowMoreDialog');
var closeResearchLabsKnowMoreDialogButton = document.getElementById('CloseResearchLabsKnowMoreDialogButton');
researchLabsKnowMoreDialog.returnValue = "Success";
btnResearchLabsKnowMore.forEach(el => el.addEventListener('click', event => {
    $("#ScrollableResearchLabsKnowMoreForm").animate({ scrollTop: 0 }, "slow");
    researchLabsKnowMoreDialog.showModal();
}));

// Form cancel button closes the dialog box
closeResearchLabsKnowMoreDialogButton.addEventListener("click", () => {
    researchLabsKnowMoreDialog.close();
});

function CloseResearchLabsKnowMoreNowDialog() {
    researchLabsKnowMoreDialog.close();
}

