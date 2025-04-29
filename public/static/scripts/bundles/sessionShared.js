var userName;
var userId;
var userRole;
var token;
var isAuthorized = 0;
var avatar;
var isListLayout = 0;

function setSessionStorage() {
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userRole', userRole);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('avatar', avatar);
    sessionStorage.setItem('isAuthorized', isAuthorized);
}

function clearSessionStorage() {
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('userRole', 'Default');
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('isAuthorized', 0);
}

function SignOut() {
    sessionStorage.setItem('signout-status', 1);
    clearSessionStorage();
    window.history.go(1);
    window.location.href = '/home';
}