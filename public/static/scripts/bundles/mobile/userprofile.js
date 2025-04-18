if(sessionStorage.getItem('token') === null || sessionStorage.getItem('token').length === 0)
{
    window.location.href = '/home';
}

document.getElementById('rail-avatar').style.backgroundImage = 'url(/static/Image/AvatarOptions/' + sessionStorage.getItem('avatar') + '.png)';
document.getElementById('rail-profilename').innerText = sessionStorage.getItem('userName');
