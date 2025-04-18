async function Subscribe() {
    
    var invalidEmailPrompt = document.getElementById('InvalidEmailPrompt');
    var subscribedPrompt = document.getElementById('SubscribedPrompt');
    invalidEmailPrompt.style.display = 'none';
    subscribedPrompt.style.display = 'none';

    var email = document.getElementById('EMAIL').value;
    var captcha = document.getElementById('SubscribeCaptcha').value;
    if(ValidateEmail(email)){
        alert(captcha);
        let response = await fetch('/subscribe/'+email+'/'+captcha);
        let data = await response.text();
        invalidEmailPrompt.style.display = 'none';
        subscribedPrompt.style.display = 'initial';
        document.getElementById('EMAIL').value = '';
        window.dialog.showModal();
    }
    else{
        invalidEmailPrompt.style.display = 'initial';
        subscribedPrompt.style.display = 'none';
        document.getElementById('EMAIL').value = '';
    }
}

function ValidateEmail(email) {
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}