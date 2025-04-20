document.getElementById('drawer-avatar').style.backgroundImage = 'url(/static/Image/AvatarOptions/' + sessionStorage.getItem('avatar') + '.png)';
document.getElementById('drawer-profilename').innerText = 'Hello, '+sessionStorage.getItem('userName')+'!';


function SetUserDrawerProfile(){
    document.getElementById('drawer-avatar').style.backgroundImage = 'url(/static/Image/AvatarOptions/' + sessionStorage.getItem('avatar') + '.png)';
    document.getElementById('drawer-profilename').innerText = 'Hello, '+sessionStorage.getItem('userName')+'!';
}