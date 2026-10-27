// Just-for-fun login shared by login.html and index.html. Not meant to be secure.
// Same cookie name, value, lifetime and path that js-cookie used, so existing visitors stay logged in.
var EagleAuth = (function () {
    var COOKIE = 'wf_auth_page';
    var DAYS = 4;

    function logIn() {
        var expires = new Date(Date.now() + DAYS * 864e5).toUTCString();
        document.cookie = COOKIE + '=1; expires=' + expires + '; path=/';
    }

    function isLoggedIn() {
        return document.cookie.split('; ').some(function (c) {
            return c.indexOf(COOKIE + '=') === 0;
        });
    }

    // index.html calls this in <head>, so the main page never starts loading without the cookie.
    function requireLogin() {
        if (!isLoggedIn()) {
            window.location.replace('login.html');
        }
    }

    return { logIn: logIn, isLoggedIn: isLoggedIn, requireLogin: requireLogin };
})();
