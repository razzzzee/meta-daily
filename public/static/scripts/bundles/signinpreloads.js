if ("signup-status" in sessionStorage) {
    if (sessionStorage.getItem('signup-status').length > 0) {
        butterup.toast({
            title: 'Message',
            message: 'You have successfully signed up! Please sign in to continue.',
            type: 'success',
            icon: true,
            dismissable: true
        });
        window.scrollTo({
            top: 100,
            right: 100,
            behavior: 'smooth'
        });
        sessionStorage.removeItem('signup-status');

    }
}
