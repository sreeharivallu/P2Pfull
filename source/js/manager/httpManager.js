'use strict';
angular.module('httpManager', []).factory('httpManger', function($q, $http) {

    let httpManager = function(require) {
        var deferred = $q.defer();
        $http(require).then(function successCallback(successResponse) {
            //console.log(successResponse);
				deferred.resolve(successResponse.data);
            
        }, function errorCallback(errorResponse) {
            deferred.reject(errorResponse);
        })
        return deferred.promise;
    };
    return {
        getHttpManager: httpManager
    }
});