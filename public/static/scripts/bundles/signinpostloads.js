function SetUserProfileSession(){
    fetch('/UserProfile', {
        method: 'POST',
        headers: {
            Authorization: sessionStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: sessionStorage.getItem('token')
        })
    })
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            //alert(data.FullName);
            sessionStorage.setItem('avatar', data.Avatar);
            sessionStorage.setItem('userName', data.FullName);    
        });
}
