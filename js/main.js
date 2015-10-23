var app = angular.module("myApp", ['ui.router', 'ngAnimate']);

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
							templateUrl: 'index1.html'
						})

						.state('register', {
							url:'/register',
							templateUrl: 'index2.html',
							controller: 'FormCtrl'
						})
							
						.state ('encounters',{
							url: '/encounters',
							templateUrl: 'index3.html'

						})
						
						.state('report', {
						 	url: '/report',
							templateUrl: 'index4.html',
							controller: 'reportCtrl'
						 })

	}]);

// .run(function($rootScope){

//  })

// My Controlers
// home page controller - welcome screen
app.controller('welcomeCtrl', ['$scope', function($scope){


}])


// form controller 
app.controller('FormCtrl', ['$scope','$state', function($scope, $state){


	$scope.person={};
	$scope.showValidation = false;

	$scope.occupations= ['Janitor',
        			'Alien hunter',
        			'Dust farmer',
        			'Battery technician',
        			'Yoga teacher'
    ];



	$scope.enter = function(e){
		e.preventDefault();

		if ($scope.myForm.$invalid){
			$scope.showValidation=true;
			
		} else{

			$state.go('encounters');
		}
		
	}

}])

//encounter controller

app.controller('encountersCtrl', ['$scope', function($scope){


}])

// report controller

app.controller('reportCtrl', ['$scope', function($scope){

	$scope.report={};
	$scope.showValidation = false;

	$scope.enter = function (e){
		e.preventDefault();
		
		if ($scope.myReport.$invalid){
			$scope.showValidation=true;
		
		}
	}


}]);



