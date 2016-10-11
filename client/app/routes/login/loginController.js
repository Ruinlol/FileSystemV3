/**
 * 
 */
mainApp.controller('loginController',function($scope, $location,userSrv){
	$scope.user = {name:'',password:''};
	//show message
	$scope.showModal = function(){
		if(	$scope.show == true){
			$scope.show = false ;
		} else {
			$scope.show = true ;
		}

	}
	
	//check whether the username is valid 
	$scope.isValidName = function(){
		var userReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{5,20}$/);
		if(userReg.test($scope.user.name)){
			return true;
		} else {
			return false;
		}
	}
	//check whether the password is valid 
	$scope.isValidPassword = function(){
		var passwordReg = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{8,20}$/);
		if(passwordReg.test($scope.user.password)){
			return true;
		} else {
			return false;
		}
	}

	 //Checks if the data is valid
		$scope.isValid = function(){
			if($scope.isValidName() && $scope.isValidPassword()){
				return false;
				} else {
					return true;
				}
		}
		
		 $scope.login = function(){
			 if (!$scope.isValid()) {
					userSrv.userLogin($scope.user).then(function(response){
				        if(response.data == "Logged!"){
				        	console.log("probe when logged")
							$location.path('/main');
					
				        	} else if(response.data == "No such user!") {
				        		$scope.showModal();
				        		console.log("probe when NOT logged");
				        	}
					})
			 	}
		 }	
	})