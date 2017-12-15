(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("currentUser",
        currentUser)

    function currentUser() {
        var profile = {
            isLoggedIn: false,
            username: "",
            token: ""
        };

        var resetProfile = function (username) {
            profile.username = username;
            profile.token = '';
            profile.isLoggedIn = false;
        };

        var setProfile = function (username, token) {
            profile.username = username;
            profile.token = token;
            profile.isLoggedIn = true;
        };

        var getProfile = function () {
            return profile;
        }

        return {
            resetProfile: resetProfile,
            setProfile: setProfile,
            getProfile: getProfile
        }
    }
})();