var app = angular.module('merchainApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider, $locationProvider) {
   $routeProvider
      .when('/', {
         templateUrl : '/views/index',
         controller  : 'mainController'
      })
      .otherwise({redirectTo: "/"});
}])

app.controller('mainController', ['$scope', 'GetResult', function($scope,GetResult){
	$scope.options = [{ name: "USD", id: 1 }, { name: "SGD", id: 2 }, { name: "RMB", id: 3 }]; 

    $scope.changeClass = function(){
        $scope.left = "animated fadeOutLeft";
        $scope.right = "animated fadeOutRight";
        $scope.showme = true;

    };

	$scope.onSubmit = function(){
    	console.log($scope.query.inputAmount);
    	console.log($scope.query.selectedCurrency.name);
    	console.log($scope.query.selectedOutputCurrency.name);
    	GetResult.retrieveData($scope.query.inputAmount, $scope.query.selectedCurrency.id, $scope.query.selectedOutputCurrency.id, function(data){
    		console.log(data);
    	});

    }
}])


.service('GetResult', ['$http', function($http){
	return{
		"retrieveData": function(amount, inputCurrency, outputCurrency, callback){
			$http({
		        method: 'GET',
		        url: './q?amount=' + amount + '&inputCurrency=' + inputCurrency + '&outputCurrency=' + outputCurrency
		      }).then(callback, function errorCallback(response) { console.log('Failure');
		     });
		}
	}
}])
