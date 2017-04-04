'use strict';
angular.module('icici',['ui.router'])
.config(function($stateProvider,$urlRouterProvider){
     
    let loginState = {
         name:'login',
         url:'/login',
         templateUrl: '/templates/navbar/navbar.tmpl.html'  //'/templates/login.tmpl.html'
    }
      
    
      $urlRouterProvider.otherwise('/login');
      
    
      $stateProvider.state(loginState);
    
});