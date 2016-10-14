/**
 * 
 */
mainApp.factory('fileSrv', function ($http , $location) {
	var baseUrl = 'http://localhost:3000/';
    return {
       sendFolderName: function (folder) {
            return $http.post(baseUrl + 'main', folder);
        },
        uploadfile : function( files,success, error )
        {

         var fd = new FormData();

         var url = 'your web service url';

         angular.forEach(files,function(file){
         fd.append('file',file);
         });

         //sample data
         var data ={
          name : name,
          type : type
         };

         fd.append("data", JSON.stringify(data));

         $http.post(url, fd, {
          withCredentials : false,
          headers : {
          'Content-Type' : undefined
          },
          transformRequest : angular.identity
         })
         .success(function(data)
         {
          console.log(data);
         })
         .error(function(data)
         {
          console.log(data);
         });
        },
    };

});