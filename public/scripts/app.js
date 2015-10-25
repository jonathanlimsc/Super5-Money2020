var app = angular.module('merchainApp', []);

app.controller('mainController', ['$scope', 'GetResult', function($scope,GetResult){
	$scope.options = [{ name: "USD", id: 1 }, { name: "SGD", id: 2 }, { name: "RMB", id: 3 }];
	$scope.onSubmit = function(){
    	console.log($scope.query.inputAmount);
    	console.log($scope.query.selectedCurrency.id);
    	console.log($scope.query.selectedOutputCurrency.id);
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
		        url: '/q?amount=' + amount + '&inputCurrency' + inputCurrency + '&outputCurrency' + outputCurrency
		      }).then(callback, function errorCallback(response) { console.log('Failure');
		     });
		}
	}
}])
