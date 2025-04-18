
const btnResearchLabKnowMore = document.querySelectorAll('.researchlab-know-more');
const researchLabKnowMoreDialog = document.getElementById('ResearchLabKnowMoreDialog');
var closeResearchLabKnowMoreDialogButton = document.getElementById('CloseResearchLabKnowMoreDialogButton');
researchLabKnowMoreDialog.returnValue = "Success";
btnResearchLabKnowMore.forEach(el => el.addEventListener('click', event => {
    $("#ScrollableResearchLabKnowMoreForm").animate({ scrollTop: 0 }, "slow");
    researchLabKnowMoreDialog.showModal();
}));

// Form cancel button closes the dialog box
closeResearchLabKnowMoreDialogButton.addEventListener("click", () => {
    researchLabKnowMoreDialog.close();
});

function CloseApplyNowDialog() {
    researchLabKnowMoreDialog.close();
}

