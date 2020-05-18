var myApp = angular.module('myApp', []);

var baseUrl = "http://anuda.me:8080/saisa-live";

myApp.controller('scores-controller', function ($scope, $http) {

     $scope.currentStatus = 1;

    $http({
        method: 'GET',
        url: baseUrl+'/games?activeStatus=1'
    }).then(function successCallback(response) {

        $scope.liveGames=response.data;

        for(var i=0; i<$scope.liveGames.length;i++){

            let ts = new Date($scope.liveGames[i].startTime*1000);


            $scope.liveGames[i].startTime = ts.toLocaleString();
        }

        $scope.games = $scope.liveGames;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/games?activeStatus=0'
    }).then(function successCallback(response) {

        $scope.upcomingGames=response.data;
        for(var i=0; i<$scope.upcomingGames.length;i++){

            let ts = new Date($scope.upcomingGames[i].startTime*1000);


            $scope.upcomingGames[i].startTime = ts.toLocaleString();
        }

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/games?activeStatus=2'
    }).then(function successCallback(response) {

        $scope.completedGames=response.data;
        $scope.completedGames=response.data;
        for(var i=0; i<$scope.completedGames.length;i++){

            let ts = new Date($scope.completedGames[i].startTime*1000);


            $scope.completedGames[i].startTime = ts.toLocaleString();
        }
    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.watchLive = function (url) {
        window.open(url);

    };

    $scope.changeStatus = function(newStatus){

        $scope.currentStatus = newStatus;

        if(newStatus===1){
            $scope.games = $scope.liveGames;
        }else if(newStatus===0){
            $scope.games = $scope.upcomingGames;
        }else{
            $scope.games = $scope.completedGames;
        }


    }



});
// myApp.filter('reverse', function() {
//     return function(items) {
//         return items.slice().reverse();
//     };
// });