var app = angular.module("anfApp", []);
app.controller("HomeController", function($scope, $http) {
	$scope.login = function(form) {
		console.log(form);
		$scope.token = "";
		$scope.err = "";
		$http.post("http://localhost:3333/login", form)
			.success(function(res) {
				console.log(res);
				$scope.token = res.token;
			})
			.error(function(err) {
				console.log(err);
				$scope.err = err;
			});
	}
});