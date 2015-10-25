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
	$scope.options = [{ name: "USD", id: 1 }, { name: "SGD", id: 2 }, { name: "CNY", id: 3 }, { name: "EUR", id: 4 }, { name: "RUR", id: 4 }, { name: "HKD", id: 4 }];
    $scope.changeClass = function(){
        $scope.left = "animated fadeOutLeft";
        $scope.right = "animated fadeOutRight";
        $scope.showme = true;

    };

	$scope.onSubmit = function(){
		$scope.isClicked = true;
    	$scope.merchains = [];
    	GetResult.retrieveData($scope.query.inputAmount, $scope.query.selectedCurrency.name, $scope.query.selectedOutputCurrency.name, function(data){
			$scope.merchains = (data.data);
			console.log($scope.merchains);
			$scope.showtable = true;
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
