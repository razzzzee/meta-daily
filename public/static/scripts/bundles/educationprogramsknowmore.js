const educationProgramsKnowMoreDialog = document.getElementById('EducationProgramsKnowMoreDialog');
var closeEducationProgramsKnowMoreDialogButton = document.getElementById('CloseEducationProgramsKnowMoreDialogButton');
educationProgramsKnowMoreDialog.returnValue = "Success";
closeEducationProgramsKnowMoreDialogButton.addEventListener("click", () => {
    educationProgramsKnowMoreDialog.close();
});

function CloseEducationProgramsKnowMoreDialog() {
    educationProgramsKnowMoreDialog.close();
}

function ShowEducationProgramsKnowMoreDialog() {
    $("#ScrollableEducationProgramsKnowMoreForm").animate({ scrollTop: 0 }, "slow");
    educationProgramsKnowMoreDialog.showModal();
}