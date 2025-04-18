
const btnMembershipKnowMore = document.querySelectorAll('.membership-know-more');
const membershipKnowMoreDialog = document.getElementById('MembershipKnowMoreDialog');
var closeMembershipKnowMoreDialogButton = document.getElementById('CloseMembershipKnowMoreDialogButton');
membershipKnowMoreDialog.returnValue = "Success";
btnMembershipKnowMore.forEach(el => el.addEventListener('click', event => {
    $("#ScrollableMembershipKnowMoreForm").animate({ scrollTop: 0 }, "slow");
    membershipKnowMoreDialog.showModal();
}));

// Form cancel button closes the dialog box
closeMembershipKnowMoreDialogButton.addEventListener("click", () => {
    membershipKnowMoreDialog.close();
});

function CloseMembershipKnowMoreNowDialog() {
    membershipKnowMoreDialog.close();
}

