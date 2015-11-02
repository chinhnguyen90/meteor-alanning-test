app = angular.module('tms2', ['angular-meteor',
    'ui.router',
    'ui.grid',
    /*'ui.grid.autoResize',
     'ui.grid.resizeColumns',*/
    'ui.grid.selection',
    'ui.grid.expandable',
    'ui.grid.pinning',
    'ui.grid.exporter',
    'ui.grid.edit',
    'ui.grid.saveState',
    'ui.grid.grouping',
    // 'ui.grid.pagination',
    'ui.tree',
    'ngMaterial',
    'ngFileUpload',
    'ui.select',
    'ngSanitize',
    'pascalprecht.translate',
    'uiGmapgoogle-maps',
    'ncy-angular-breadcrumb',
    'cfp.hotkeys',
    'jdFontselect',
    'ui.rCalendar',
    'dndLists']);
// function onReady() {
// angular.bootstrap(document, ['tms2']);
// }

// if (Meteor.isCordova)
//     angular.element(document).on("deviceready", onReady);
// else
angular.element(document).ready(function () {
    angular.bootstrap(document, ['tms2']);
});

app.run(function ($rootScope, $state, $meteor, runtimeInit, $q) {
    console.log('config load');
    // Init States
    $meteor.subscribe('states').then(function (subscriptionHandle) {
        console.log('init state');
        // Bind all the todos to $scope.todos
        var states = $meteor.collection(States);
        states.forEach(function (item) {
            if (!$state.get(item.name)) {
                runtimeInit.addState(item.name, item.state);
            }
        });
        // You can use the subscription handle to stop the subscription if you want
        subscriptionHandle.stop();
        $state.go('default');
    });
    //Init I18n
    $meteor.subscribe('i18n').then(function (subscriptionHandle) {
        console.log('init i18n');
        // Bind all the todos to $scope.todos
        var i18n = $meteor.collection(I18n);
        i18n.forEach(function (item) {
            runtimeInit.createI18n(item.lang, item.set);
        });
        // You can use the subscription handle to stop the subscription if you want
        subscriptionHandle.stop();
    });
})
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider, $translateProvider, uiGmapGoogleMapApiProvider, $mdThemingProvider, $breadcrumbProvider) {
        $mdThemingProvider.theme('default').accentPalette('green');
        notify.config({pageVisibility: true, autoClose: 5000});
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'core/client/views/home.ng.html',
                controller: 'HomeCtrl',
                ncyBreadcrumb: {
                    label: 'Home'
                },
                resolve: {
                    'currentUser': ['$meteor', function ($meteor) {
                        return $meteor.requireUser();
                    }]
                }
            });
        $translateProvider.translations('en', {}).translations('vi', {}).preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');
        //angular google maps
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'places' // Required for SearchBox.
        });
        $breadcrumbProvider.setOptions({
            template: '<div class="breadcrum topbc">' +
            '<p style="margin-top:10px;padding: 0 10px;"><span ng-repeat="step in steps | limitTo:(steps.length-1)"><a style="color:inherit; font-weight:bolder" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel | translate}}</a> >&nbsp;</span>' +
            '<span ng-repeat="step in steps | limitTo:-1" class="active">{{step.ncyBreadcrumbLabel | translate}}</span><p>' +
            '</div>'
        });
    })
    .provider('runtimeInit', function ($stateProvider, $translateProvider) {
        this.$get = function () {
            return {
                addState: function (name, state) {
                    $stateProvider.state(name, state);
                },
                createI18n: function (lang, obj) {
                    $translateProvider.translations(lang, obj);
                }
            };
        };
    })
    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];

            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });

            return output;
        };
    })
    .filter('moment', function () {
        return function (input) {
            if (typeof input == 'string') {
                input = parseInt(input);
            }
            var output = moment(input);
            return output;
        };
    })
    .directive('myCustomDropdown', function () {
        return {
            template: '<select class="form-control" ng-model="colFilter.term" ng-options="option.id as option.value for option in colFilter.options"></select>'
        };
    });
