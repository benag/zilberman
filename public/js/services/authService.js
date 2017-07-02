angular.module('ganim').factory('authService',function($state, angularAuth0, $timeout){
    return {
        login: function(){
            angularAuth0.authorize();
        },
        handleAuthentication: function() {
            angularAuth0.parseHash(function(err, authResult) {
                if (authResult && authResult.accessToken && authResult.idToken) {
                    setSession(authResult);
                    $state.go('main');
                } else if (err) {
                    $timeout(function() {
                        $state.go('main');
                    });
                    console.log(err);
                }
            });
        },
        setSession: function(authResult) {
            // Set the time that the access token will expire at
            let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
        },
        logout: function() {
            // Remove tokens and expiry time from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('id_token');
            localStorage.removeItem('expires_at');
        },
        isAuthenticated: function() {
            // Check whether the current time is past the
            // access token's expiry time
            let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
            return new Date().getTime() < expiresAt;
        }

    }


});

