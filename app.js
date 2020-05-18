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

myApp.controller('livestreams-controller', function ($scope, $http, $sce) {

    $scope.live = true;

    $http({
        method: 'GET',
        url: baseUrl+'/livestreams?liveNow=1&tournamentId=0'
    }).then(function successCallback(response) {

        $scope.liveStreams=response.data;

        for(var i=0; i<$scope.liveStreams.length;i++){

            $scope.liveStreams[i].url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+$scope.liveStreams[i].url.replace("https://youtu.be/",""));
        }
        $scope.streams = $scope.liveStreams;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/livestreams?liveNow=0&tournamentId=0'
    }).then(function successCallback(response) {

        $scope.pastFootage=response.data;

        for(var i=0; i<$scope.pastFootage.length;i++){

            $scope.pastFootage[i].url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+$scope.pastFootage[i].url.replace("https://youtu.be/",""));
        }

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.changeStatus = function(){

        if(!$scope.live){
            $scope.live=true;
            $scope.streams = $scope.liveStreams;
        }else{
            $scope.live=false;
            $scope.streams = $scope.pastFootage;

        }
    };

});

myApp.controller('meets-controller', function ($scope, $http, $sce) {

    $scope.currentStatus = 2;

    $http({
        method: 'GET',
        url: baseUrl+'/meets?activeStatus=1'
    }).then(function successCallback(response) {

        $scope.liveMeets=response.data;

        for(var i=0; i<$scope.liveMeets.length;i++){

            let ts = new Date($scope.liveMeets[i].startTime*1000);

            $scope.liveMeets[i].startTime = ts.toLocaleString();

            $scope.liveMeets[i].livestream.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/"+$scope.liveMeets[i].livestream.url.replace("https://youtu.be/",""));

        }


    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/meets?activeStatus=0'
    }).then(function successCallback(response) {

        $scope.upcomingMeets=response.data;
        for(var i=0; i<$scope.upcomingMeets.length;i++){

            let ts = new Date($scope.upcomingMeets[i].startTime*1000);


            $scope.upcomingMeets[i].startTime = ts.toLocaleString();
        }

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/meets?activeStatus=2'
    }).then(function successCallback(response) {

        $scope.completedMeets=response.data;
        $scope.completedMeets=response.data;
        for(var i=0; i<$scope.completedMeets.length;i++){

            let ts = new Date($scope.completedMeets[i].startTime*1000);


            $scope.completedMeets[i].startTime = ts.toLocaleString();
        }

        $scope.meets = $scope.completedMeets;

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
            $scope.meets = $scope.liveMeets;
        }else if(newStatus===0){
            $scope.meets = $scope.upcomingMeets;
        }else{
            $scope.meets = $scope.completedMeets;
        }


    }



});

myApp.controller('events-controller', function ($scope, $http, $sce) {

    $scope.live = true;

    $http({
        method: 'GET',
        url: baseUrl+'/tournaments?tournamentId=0'
    }).then(function successCallback(response) {

        $scope.liveEvents=response.data;

        for(var i=0; i<$scope.liveEvents.length;i++){
            let ts = new Date($scope.liveEvents[i].startDate*1000);

            $scope.liveEvents[i].startDate = ts.toLocaleDateString();
        }
        $scope.events = $scope.liveEvents;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/tournaments/inactive'
    }).then(function successCallback(response) {

        $scope.archivedEvents=response.data;

        for(var i=0; i<$scope.archivedEvents.length;i++){

            let ts = new Date($scope.archivedEvents[i].startDate*1000);

            $scope.archivedEvents[i].startDate = ts.toLocaleDateString();        }

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.changeStatus = function(){

        if(!$scope.live){
            $scope.live=true;
            $scope.events = $scope.liveEvents;
        }else{
            $scope.live=false;
            $scope.events = $scope.archivedEvents;

        }
    };

    $scope.activateModal = function(tournamentId){

        $http({
            method: 'GET',
            url: baseUrl+'/tournaments/participants/?tournamentId='+tournamentId
        }).then(function successCallback(response) {
            $scope.standingsData = response.data;


        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            alert("Error Retrieving Data");

        });

    };

});
