mainApp.service("TreeService", ["$http", "URLConfig", function ($http, URLConfig) {
    this.getTree = function () {
        return $http.get(URLConfig.tree);
    };
}]);