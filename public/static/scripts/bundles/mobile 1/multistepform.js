const navigateToFormStep = (stepNumber, multiformElement) => {
    multiformElement.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    multiformElement.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    multiformElement.querySelector("#step-" + stepNumber).classList.remove("d-none");
    const formStepCircle = multiformElement.querySelector('li[step="' + stepNumber + '"]');
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    for (let index = 0; index < stepNumber; index++) {
        const formStepCircle = multiformElement.querySelector('li[step="' + index + '"]');
        if (formStepCircle) {
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};

function RegisterMultiform(multiFormBaseElement) {
    var multiformElement = multiFormBaseElement;
    multiformElement.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
        formNavigationBtn.addEventListener("click", () => {
            const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
            const formToValidate = formNavigationBtn.getAttribute("form_to_validate");
            if (formToValidate != null) {
                var form = multiformElement.querySelector('#' + formToValidate);
                if (form.reportValidity()) {
                    navigateToFormStep(stepNumber, multiformElement);
                }
            }
            else {
                navigateToFormStep(stepNumber);
            }
        });
    });
}