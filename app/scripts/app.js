'use strict';
//var myApp = angular.module('patientPortalApp',[]);

var myApp = angular.module('patientPortalApp', ['ui.router','ngResource','ngDialog']);
myApp.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html'
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html'
                    }
                }
            })

            // route for the profile page
            .state('app.profile', {
                url: 'profile',
                views: {
                    'content@': {
                        templateUrl : 'views/profile.html',
                        controller  : 'ProfileController'
                    }
                }
            })

            // route for the visits page
            .state('app.visits', {
                url: 'visits',
                views: {
                    'content@': {
                        templateUrl : 'views/visits.html',
                        controller  : 'VisitController'
                    }
                }
            })
            // route for the medications page
            .state('app.medications', {
                url: 'medications',
                views: {
                    'content@': {
                        templateUrl : 'views/medications.html',
                        controller  : 'MedicationsController'
                    }
                }
            })
    
            // route for the visits page
            .state('app.messages', {
                url: 'messages',
                views: {
                    'content@': {
                        templateUrl : 'views/messages.html',
                        controller  : 'MessagesController'
                    }
                }
            })
    
                // route for the insurance page
            .state('app.insurance', {
                url: 'insurance',
                views: {
                    'content@': {
                        templateUrl : 'views/insurances.html',
                        controller  : 'InsurancesController'
                    }
                }
            })
    
                // route for the billing page
            .state('app.billing', {
                url: 'billing',
                views: {
                    'content@': {
                        templateUrl : 'views/billing.html',
                        controller  : 'BillingController'
                    }
                }
            })
    
    ;
    
        $urlRouterProvider.otherwise('/');
    })
;
