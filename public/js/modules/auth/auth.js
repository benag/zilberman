angular.module('auth', ['auth0.lock'])
.config(function(lockProvider) {
    lockProvider.init({
        clientID: AUTH0_CLIENT_ID,
        domain: AUTH0_DOMAIN,
        options: {
            _idTokenVerification: false
        }
    });
}).run(function(lock) {

    // For use with UI Router
    //lock.interceptHash();
    lock.on('authenticated', function(authResult) {
        alert('got you');
        //localStorage.setItem('id_token', authResult.idToken);
        //
        //lock.getProfile(authResult.idToken, function(error, profile) {
        //    if (error) {
        //        console.log(error);
        //    }
        //    localStorage.setItem('profile', JSON.stringify(profile));
        //});
    });
});