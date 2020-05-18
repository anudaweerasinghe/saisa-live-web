var myApp = angular.module('myApp', []);

var baseUrl = "http://anuda.me:8080/saisa-live";

myApp.controller('scores-controller', function ($scope, $http) {

     $scope.currentStatus = 1;

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "http://osc.lk/saisa/live-mobile";
    }

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

        if($scope.liveGames.length===0&&$scope.upcomingGames.length!==0){
            $scope.changeStatus(0);
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

            if($scope.completedGames[i].result===1){
                $scope.completedGames[i].result = $scope.completedGames[i].team1.team.name+" Won";
            }else if($scope.completedGames[i].result===2){
                $scope.completedGames[i].result = $scope.completedGames[i].team2.team.name+" Won";
            }else{
                $scope.completedGames[i].result = "No Result";

            }
        }

        if($scope.liveGames.length===0&&$scope.upcomingGames.length===0){
            $scope.changeStatus(2);
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

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "http://osc.lk/saisa/live-mobile";
    }

    $scope.live = true;
    $scope.pastFootage = [];

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

        if($scope.liveStreams.length===0){
            $scope.changeStatus();
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
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "http://osc.lk/saisa/live-mobile";
    }
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
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "http://osc.lk/saisa/live-mobile";
    }
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

            $scope.archivedEvents[i].startDate = ts.toLocaleDateString();
        }
        if($scope.liveEvents.length===0){
            $scope.changeStatus();
        }

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

myApp.controller('media-controller', function ($scope, $http) {

    $scope.currentStatus = 1;
    $scope.accessGranted = false;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        window.location.href = "http://osc.lk/saisa/live-mobile";
    }
    $http({
        method: 'GET',
        url: baseUrl+'/media?tournamentId=0&type=2'
    }).then(function successCallback(response) {

        $scope.videos=response.data;

        for(var i=0; i<$scope.videos.length;i++){

            let ts = new Date($scope.videos[i].timestamp*1000);


            $scope.videos[i].timestamp = ts.toLocaleString();
        }

        $scope.media = $scope.videos;

    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $http({
        method: 'GET',
        url: baseUrl+'/media?tournamentId=0&type=3'
    }).then(function successCallback(response) {

        $scope.news=response.data;

        for(var i=0; i<$scope.news.length;i++){

            let ts = new Date($scope.news[i].timestamp*1000);


            $scope.news[i].timestamp = ts.toLocaleString();
        }


    }, function errorCallback(response) {
        // The next bit of code is asynchronously tricky.
        alert("Error Retrieving Data");

    });

    $scope.watchLive = function (url) {
        window.open(url);

    };

    $scope.viewNews = function (title, coverImg, text, timeStamp) {
        $scope.newsTitle = title;
        $scope.newsImg = coverImg;
        $scope.newsText = text;
        $scope.newsTime = timeStamp;


    };

    $scope.changeStatus = function(newStatus){

        $scope.currentStatus = newStatus;

        if(newStatus===1){
            if($scope.accessGranted){
                $scope.media = $scope.photos;

            }

        }else if(newStatus===2){
            $scope.media = $scope.videos;
        }else{
            $scope.media = $scope.news;
        }


    };

    $scope.checkAccessCode = function(){
        $http({
            method: 'GET',
            url: baseUrl+'/media?tournamentId=0&type=1&accessCode='+$scope.accessCode
        }).then(function successCallback(response) {

            $scope.photos=response.data;
            $scope.accessGranted=true;
            $scope.responseMsg = "Access Code Successfully Validated! Press the 'Back' button to view photos.";

            for(var i=0; i<$scope.photos.length;i++){

                let ts = new Date($scope.photos[i].timestamp*1000);


                $scope.photos[i].timestamp = ts.toLocaleString();
            }

            $scope.media = $scope.photos;

        }, function errorCallback(response) {
            // The next bit of code is asynchronously tricky.
            $scope.responseMsg = "Incorrect Access Code! Please Try Again..."

        });

    };



});
