var app = angular.module("myApp", []);

// .run(function($rootScope){

//  })

// home page controller
app.controller('welcomeCtrl', ['$scope', function($scope){


}])


// form controller
app.controller('FormCtrl', ['$scope', function($scope){


	$scope.person={};
	$scope.showValidation = false;

	$scope.enter = function(e){
		e.preventDefault();

		if ($scope.myForm.$invalid){
			$scope.showValidation=true;
			alert ('Hey');
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
			alert ('Hey');
		}
	}


}]);


