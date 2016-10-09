/**
 * 
 */
var mainApp = angular.module('mainModule', ['ngRoute', 'ngAnimate', 'ui.bootstrap' , 'ngMessages'])
	//routing
		.config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: './app/routes/home/home.html',
                    controller: 'homeController'
                })
                .when('/login', {
                    templateUrl: './app/routes/login/login.html',
                    controller: 'loginController'
                })
                .when('/register', {
                    templateUrl: './app/routes/register/register.html',
                    controller: 'registerController'
                })
                .when('/email', {
                    templateUrl: './app/routes/email/email.html',
                    controller: 'emailController'
                })
                //redirect to forgotten password page with routing
                
                
			})
			//this is the main controller with nested scopes in it 
			.controller('MainController', function ($scope, $location) {

        })
       .controller('CollapseDemoCtrl', function ($scope) {
            $scope.isNavCollapsed = true;
            $scope.isCollapsed = false;
            $scope.isCollapsedHorizontal = false;
       
            $scope.isActive = function(){
				if(!$scope.isAct){
					$scope.isAct = true;
				} else {
					$scope.isAct = false;
				}
			}
            //these are functions to show and hide the login and the sign up form
            $scope.showIt = function(){
            	if($scope.show){
            		$scope.show = false;
            		$scope.show2=false;
            		$scope.isAct = false;
            		
            	} else {
            		$scope.show = true;
            		$scope.show2 = false;
            		$scope.isAct = true;
            		if($scope.showEmail == true){
            			$scope.showEmail = false;
            		}
            	}
            }
            $scope.showIt2 = function(){
            	if($scope.show2){
            		$scope.show2 = false;
            		
            		$scope.isAct = false;
            	} else {
            		$scope.show = false;
            		$scope.show2 = true;
            		$scope.isAct = true;
            	}
            }
			
            
       })

    
mainApp.factory('userSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
        lostEmail: function (lostmail) {
            return $http.post(baseUrl + 'lostpassword', lostmail).then(successCallback);
            
            function successCallback(response) {
            	console.log(response);
            }
        
        },
        userRegister: function (user) {
        	return $http.post(baseUrl + 'register', user).then(successCallback);
            
            function successCallback(response) {
            	if(response.data == 'User registered!'){
            		console.log("Success");
            		$location.path('/login');
            		return;
            	} 
            		console.log("Fail!");
            		alert('Error!');
            }
            
        },
        userLogin: function (user) {
        	return $http.post(baseUrl + 'login', user)
        }
    };
});
/**
 * 
 */

mainApp.controller('emailController' , function($scope, $http, $httpParamSerializerJQLike, userSrv, $location){
	
	$scope.lostmail =  {to: ''};
	
	$scope.isValidEmail = function(){
    	if(($scope.forgottenPassword.userEmail.$valid)){
			return  false;
		}
    	return  true;
	}
	$scope.submitForm = function() {
		if ($scope.lostmail.to) {
			userSrv.lostEmail($scope.lostmail);
			console.log(143);
		}
	};

})
/**
 * 
 */
mainApp.controller('homeController' , function($scope){
	
})
/**
 * 
 */
mainApp.controller('loginController',function($scope, userSrv){


	 //Checks if the data is valid
		$scope.isValid= function(){
			if(($scope.log.username.$valid) && ($scope.log.userpass.$valid)){
					return false;
				} else {
					return true;
				}
		}
		
		$scope.user = {name:'',password:''};
		
		 $scope.login = function(){
			 if ($scope.user.name && $scope.user.password) {
					userSrv.userLogin($scope.user);
				}
		 }

				
})
/**
 * 
 */
mainApp.controller ('registerController',function($scope, userSrv){
	
	$scope.user = {name:'',password:'' , passRepeated:'' , email:''};
	
	//validate function
	//1) for username
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//validate password
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	}
	//check if passwords are the same
	$scope.isValidPassword2 = function(){
		if($scope.user.password == $scope.user.passRepeated){
			return true;
		} else {
			return false;
		}
	}
	//check if email is valid
	$scope.isValidEmail = function(){
		var emailReg = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
		if(emailReg.test($scope.user.email)){
			return true;
		} else {
			return false;
		}
	}
	$scope.isValid= function(){
		if($scope.isValidName() && $scope.isValidPassword() && $scope.isValidPassword2() && $scope.isValidEmail()){
			return false;
		} else {
			return true;
		}
	}
	$scope.submitRegisterForm = function(){
		if ($scope.user.name && $scope.user.password && $scope.user.passRepeated && $scope.user.email) {
			userSrv.userRegister($scope.user);
			return;
		}
		
	 }
});

