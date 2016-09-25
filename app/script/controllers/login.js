'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller: LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the quizApp
 */

angular.module('quizApp')
    .controller('LoginCtrl', ['$scope', '$mdDialog', '$state', 'sessionService', function ($scope, $mdDialog, $state, sessionService) {
        /*=================================
         =            Variables            =
         =================================*/
        $scope.avatars = [
            {name: 'svg-1', selected: false},
            {name: 'svg-2', selected: false},
            {name: 'svg-3', selected: false},
            {name: 'svg-4', selected: false},
            {name: 'svg-5', selected: false},
            {name: 'svg-6', selected: false},
            {name: 'svg-7', selected: false},
            {name: 'svg-8', selected: false},
            {name: 'svg-9', selected: false},
            {name: 'svg-10', selected: false},
            {name: 'svg-11', selected: false},
            {name: 'svg-12', selected: false},
            {name: 'svg-13', selected: false},
            {name: 'svg-14', selected: false},
            {name: 'svg-15', selected: false},
            {name: 'svg-16', selected: false}
        ];
        $scope.user = {};
        /*=====  End of Variables  ======*/

        /*========================================
         =            Function Toolbox            =
         ========================================*/
        /**
         Contains:
            - submitLogin: used to save the user object in browser's local storage.
            - selectAvatar: used to select the user avatar.
            - noAvatarSelectedAlert: helper to display alert in case an avatar isn't selected.
         */

        $scope.noAvatarSelectedAlert = function ($evt) {
            var noAvatarSelectedAlert = $mdDialog.alert()
                .title('No Avatar Selected')
                .textContent('Please select an avatar first')
                .ariaLabel('select user')
                .targetEvent($evt)
                .ok('Ok');

            $mdDialog.show(noAvatarSelectedAlert);
        };

        $scope.selectAvatar = function (index) {
            _.map($scope.avatars, function(o){ return o.selected = false; });
            $scope.avatars[index].selected = true;
            $scope.user.avatar = $scope.avatars[index].name;
        };

        $scope.submitLogin = function(user, $evt, isValid){
            if( !isValid ) return false;
            if( !user.hasOwnProperty('avatar') ){
                $scope.noAvatarSelectedAlert($evt);
                return false;
            }
            sessionService.setUserDetails(user);
            $state.go('questions');
        };
        /*=====  End of Function Toolbox  ======*/

    }]);