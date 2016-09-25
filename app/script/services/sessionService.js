'use strict';

/**
 * @ngdoc service
 * @name quizApp.service: sessionService
 * @description
 * # used to save and get details from the browsers local storage.
 * Service in the quizApp.
 */
angular.module('quizApp')
    .service('sessionService', ['$http', '$q', '$localStorage', function($http, $q, $localStorage){
        return{
            isLoggedIn: function () {
                return $localStorage.user !== undefined;
            },
            setUserDetails: function (user) {
                if( user )
                    $localStorage.user = user;
            },
            getUserDetail: function(){
                return $localStorage.user;
            },
            destroy: function(){
                $localStorage.$reset();
            }
        }
    }]);