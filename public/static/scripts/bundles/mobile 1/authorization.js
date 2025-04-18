if ("token" in sessionStorage) {
    if (sessionStorage.getItem('token').length > 0) {
        fetch('/Authorize', {
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
            if (data.Status === 'UNAUTHORIZED') {
                sessionStorage.setItem('token', '');
                clearSessionStorage();
            }
            else
            {
                sessionStorage.setItem('token', data.Token);
            }
        });
    }
}
