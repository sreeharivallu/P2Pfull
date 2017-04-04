'use strict';
angular.module('icici',['ui.router'])
.config(function($stateProvider,$urlRouterProvider){
     
    let loginState = {
         name:'login',
         url:'/login',
         templateUrl: '/templates/navbar/navbar.tmpl.html'  //'/templates/login.tmpl.html'
    }
    
    let mainState = {
         name:'main',
         url:'/main',
         templateUrl: '/templates/mainmenu.tmpl.html'  //'/templates/login.tmpl.html'
    }
      
    
    
    
      $urlRouterProvider.otherwise('/main');
      
      $stateProvider.state(loginState);
      $stateProvider.state(mainState);
    
});