var app = angular.module("myApp", ['ui.router', 'ngAnimate', 'ngCookies']);

//Animation
app.run(function($rootScope){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		$rootScope.stateName = toState.name;
	})
		})

//Config

	app.config(['$stateProvider',
				'$urlRouterProvider',
				'$locationProvider',
				function($stateProvider,
						$urlRouterProvider,
						$locationProvider){


					$locationProvider.html5Mode({
						enable: true,
						requireBase: false,
						rewriteLinks: false
					});


					$stateProvider
						.state('welcome', {
							url: '',
							templateUrl: 'index1.html',
							controller: 'welcomeCtrl'
						})

						.state('register', {
							url:'/register',
							templateUrl: 'index2.html',
							controller: 'FormCtrl',
							resolve: {
								user: ['$cookies', function($cookies){
									if ($cookies.getObject('mars_user')){
										$state.go ('encounters');
									}	

								}]
							}
						})
							
						.state ('encounters',{
							url: '/encounters',
							templateUrl: 'index3.html',
							controller: 'marsCtrl'

						})
						
						.state('report', {
						 	url: '/report',
							templateUrl: 'index4.html',
							controller: 'reportCtrl'
						 })

	}]);

// My Controlers
// home page controller - welcome screen
app.controller('welcomeCtrl', ['$scope', '$cookies', function($scope, $cookies){

$cookies.putObject('mars_user', undefined);

}])


// form controller 
app.controller('FormCtrl', ['$scope','$state', '$http', '$cookies', function($scope, $state, $http, $cookies){
var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";

	// $scope.person={}; - it was replaced by the colonist from api
	$scope.colonist = {};

	$http.get(API_URL_GET_JOBS).then(function (response){
		// debugger; - if you want to get data from the api - check the inspector and type response
		$scope.jobs = response.data.jobs;

	});

	$cookies.putObject('mars_user', undefined);

	$scope.showValidation = false;

	// $scope.occupations= ['Janitor',
 //        			'Alien hunter',
 //        			'Dust farmer',
 //        			'Battery technician',
 //        			'Yoga teacher'
 //    ];

	$scope.enter = function(e){
		e.preventDefault();

		if ($scope.myForm.$invalid){
			$scope.showValidation=true;
			
		} else{

			// debugger; - to see what you've got from the server, on inspector type $scope.colonist and then you'll see it using "network"
			// "header"
			

			$http({
				method: 'POST',
				url: API_URL_CREATE_COLONIST,
				data: {colonist: $scope.colonist}
			}).then (function(response){

			$cookies.putObject('mars_user', response.data.colonist);

			$state.go('encounters');

			// debugger; - on the inspector type $cookies.getObject('mars_user') and you'll see the object
		})
		
	}
}
}])

//encounter controller

app.controller('marsCtrl', ['$scope', '$http', function($scope, $http){
	var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';

	$scope.encounter={};

	$http.get(ENCOUNTERS_API_URL).then(function(response){
	
	// debugger;
	$scope.encounters = response.data.encounters;

	});

}])

// report controller

app.controller('reportCtrl', ['$scope','$http', function($scope, $http){
var ALIEN_TYPE_API_URL = "https://red-wdp-api.herokuapp.com/api/mars/aliens";
	
	$scope.alien ={};
	$scope.showValidation = false;
	// $scope.aliens= ['Lizard Man',
	// 				'Giant Slug',
	// 				'Rogue Android',
	// 				'Octospider',
	// 				'Spiderpus'
	// ];

	$http.get(ALIEN_TYPE_API_URL).then(function(response){
	// debugger;

	$scope.aliens = response.data.aliens;


	});

	$scope.enter = function (e){
		e.preventDefault();
		
		if ($scope.myReport.$invalid){
			$scope.showValidation=true;
		}else{

			alert ("Thank you for your report! Mars is even safer now!");
		
		}
	}

	

}]);




