'use strict';

angular.module('patientPortalApp')


.controller('ProfileController', ['$scope', 'profileFactory', 'AuthFactory','$stateParams', '$localStorage', function ($scope, profileFactory, AuthFactory, $stateParams, $localStorage ) {

    $scope.showProfile = false;
    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.showProfile = true;
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    
}])

.filter('myDateFormat', function myDateFormat($filter){
      return function(text){
        var  tempdate= new Date(text.replace(/-/g,"/"));
        return $filter('date')(tempdate, "MMM dd, yyyy");
      }
 })

.controller('VisitController', ['$scope', '$state', '$stateParams', 'visitFactory', '$localStorage',  function ($scope, $state, $stateParams, visitFactory, $localStorage) {

    $scope.message = "Loading ...";
    
    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
        
    var visits = visitFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.visits = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

.controller('BillingController', ['$scope', '$state', '$stateParams', 'billingFactory', '$localStorage',  function ($scope, $state, $stateParams, billingFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var bills = billingFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.bills = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

.controller('InsurancesController', ['$scope', '$state', '$stateParams', 'insuranceFactory', '$localStorage',  function ($scope, $state, $stateParams, insuranceFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var insurances = insuranceFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.insurances = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])

.controller('MessagesController', ['$scope', '$state', '$stateParams', 'messageFactory', '$localStorage',  function ($scope, $state, $stateParams, messageFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    
    var messages = messageFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.messages = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])
.controller('MedicationsController', ['$scope', '$state', '$stateParams', 'medicationsFactory', '$localStorage', function ($scope, $state, $stateParams, medicationsFactory, $localStorage) {

    $scope.message = "Loading ...";

    var pt = $localStorage.getObject("patientinfo");

    if(pt){
        $scope.patient = pt[0];
        console.log($scope.patient);
    }
    var medications = medicationsFactory.query({
            patientId:$scope.patient._id
        })
        .$promise.then(
            function (response) {
                console.log(response);
                $scope.medications = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }
])


.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;