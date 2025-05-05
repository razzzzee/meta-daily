const councilMemberHowItWorksDialog = document.getElementById('CouncilMemberHowItWorksDialog');
var closeCouncilMemberHowItWorksDialogButton = document.getElementById('CloseCouncilMemberHowItWorksDialogButton');
councilMemberHowItWorksDialog.returnValue = "Success";
closeCouncilMemberHowItWorksDialogButton.addEventListener("click", () => {
    councilMemberHowItWorksDialog.close();
});

function CloseCouncilMemberHowItWorksDialog() {
    councilMemberHowItWorksDialog.close();
}

function ShowCouncilMemberHowItWorksDialog() {
    $("#ScrollableCouncilMemberHowItWorks").animate({ scrollTop: 0 }, "slow");
    councilMemberHowItWorksDialog.showModal();
}