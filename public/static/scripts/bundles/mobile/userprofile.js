if(sessionStorage.getItem('token') === null || sessionStorage.getItem('token').length === 0)
    {
        window.location.href = '/home';
    }
    else{
        SetUserProfile();
    }
    
    
    function SetUserProfile() {
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
                document.getElementById('txtFullName').value = data.FullName;
                document.getElementById('txtEmail').value = data.Email;
                document.getElementById('txtDOB').value = data.DOB;
                document.getElementById('rail-avatar').style.backgroundImage = 'url(/static/Image/AvatarOptions/' + data.Avatar + '.png)';
                document.getElementById('rail-profilename').innerText = data.FullName;//sessionStorage.getItem('userName');
                document.getElementById('drawer-avatar').style.backgroundImage = 'url(/static/Image/AvatarOptions/' + data.Avatar + '.png)';
                document.getElementById('drawer-profilename').innerText = 'Hello, '+data.FullName + '!';//sessionStorage.getItem('userName')+'!';     
            });
    }
    
    
    
    
    
    