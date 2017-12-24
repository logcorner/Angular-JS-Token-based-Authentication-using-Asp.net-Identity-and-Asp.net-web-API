(function () {
    "use strict";

    angular
        .module("appmodule")
        .controller("userCtrl",
        ["$scope", "loginservice", "userProfile",
            userCtrl]);

    function userCtrl($scope, loginservice, userProfile) {
        var vm = this;
        vm.registerErrorData = "";
        vm.loginErrorData = "";
        vm.responseData = "";
        vm.userName = "";
        vm.userEmail = "";
        vm.userPassword = "";

        vm.newUserEmail = "";
        vm.newUserPassword = "";
        vm.confirmUserPassword = "";

        vm.accessToken = "";
        vm.refreshToken = "";

        vm.isLoggedIn = function () {
            var result = userProfile.getProfile().isLoggedIn;
            return result;
        };

        vm.registerUser = function () {
            vm.responseData = '';
            vm.registerErrorData = '';
            vm.loginErrorData = '';
            var userRegistrationInfo = {
                Email: vm.newUserEmail,
                Password: vm.newUserPassword,
                ConfirmPassword: vm.confirmUserPassword
            };

            var registerResult = loginservice.register(userRegistrationInfo);

            registerResult.then(function (data) {
                vm.responseData = "User Registration successful";
                vm.newUserPassword = "";
                vm.confirmUserPassword = "";
            }, function (response) {
                vm.registerErrorData = response.statusText + "\r\n";
                if (response.data.exceptionMessage)
                    vm.registerErrorData += response.data.exceptionMessage;

                if (response.data.modelState) {
                    for (var key in response.data.modelState) {
                        vm.registerErrorData += response.data.modelState[key] + "\r\n";
                    }
                }
            });
        };

        vm.redirect = function (url) {
            window.location.href = url;
        };

        vm.login = function () {
            var userLogin = {
                grant_type: 'password',
                username: vm.userEmail,
                password: vm.userPassword
            };
            vm.responseData = '';
            vm.registerErrorData = '';
            vm.loginErrorData = '';
            var loginResult = loginservice.login(userLogin);

            loginResult.then(function (resp) {
                vm.userName = resp.data.userName;

                userProfile.setProfile(resp.data);
            }, function (response) {
                vm.loginErrorData = response.statusText + " : \r\n";
                if (response.data.error)
                    vm.loginErrorData += response.data.error_description;
            });
        };

        vm.logout = function () {
            var logoutResult = loginservice.logout();
            logoutResult.then(function (resp) {
                userProfile.logout();
            }, function (response) {
                var logoutErrorData = response.statusText + " : \r\n";
                if (response.data.message) {
                    logoutErrorData += response.data.message;
                }
                if (response.data.error) {
                    logoutErrorData += response.data.error_description;
                }
                console.lo(logoutErrorData);
            });
        };
    }
})();