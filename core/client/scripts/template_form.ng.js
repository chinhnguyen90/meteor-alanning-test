app.controller('TemplateFormCtrl',
    function($rootScope, $scope, $meteor, $stateParams, $translate, Tab) {

        $translate(__.find(Tab.tabs, {id: Tab.currentTabId}).title).then(function(breadcrumb){
            if(__.find(Tab.tabs, {id: Tab.currentTabId}).valuename) {
                $scope.breadcrumb = breadcrumb + ' ' + __.find(Tab.tabs, {id: Tab.currentTabId}).valuename;
            } else {
                $scope.breadcrumb = breadcrumb;
            }
        });

        $scope.currentTemplate = { name: '', mainColor: '', components: {}, customComponent: [], isActive: false };
        $scope.components = [
            { id: 'logo', name: 'Logo', color: '' },
            { id: 'topMenu', name: 'Top menu', color: '' },
            { id: 'topIcon', name: 'Top icon', color: '' },
            { id: 'leftProfile', name: 'Left profile', color: '' },
            { id: 'toolbarView', name: 'Toolbar Content', color: '' },
            { id: 'content', name: 'Content', color: '' }
        ];

        if(Session.equals(Tab.currentTabId, undefined)) {
            if($stateParams.id) {
                $scope.currentTemplate = $scope.$meteorObject(Templates, $stateParams.id, false).getRawObject();
                $rootScope.template = $scope.currentTemplate;
            }
            $scope.components = ($scope.currentTemplate.customComponent.length > 0) ? $scope.currentTemplate.customComponent : $scope.components;
            Session.set(Tab.currentTabId, {currentTemplate: $scope.currentTemplate, components: $scope.components});
        } else {
            $scope.currentTemplate = Session.get(Tab.currentTabId).currentTemplate;
            $rootScope.template = $scope.currentTemplate;
            $scope.components = Session.get(Tab.currentTabId).components;
        }

        $scope.mainColors = [
            { value: 'yellow', name: 'Yellow' },
            { value: 'amber', name: 'Amber' },
            { value: 'orange', name: 'Orange' },
            { value: 'deep-orange', name: 'Deep orange' },
            { value: 'red', name: 'Red' },
            { value: 'lime', name: 'Lime' },
            { value: 'light-green', name: 'Light green' },
            { value: 'green', name: 'Green' },
            { value: 'teal', name: 'Teal' },
            { value: 'cyan', name: 'Cyan' },
            { value: 'light-blue', name: 'Light blue' },
            { value: 'blue', name: 'Blue' },
            { value: 'pink', name: 'Pink' },
            { value: 'purple', name: 'Purple' },
            { value: 'deep-purple', name: 'Deep purple' },
            { value: 'indigo', name: 'Indigo' },
            { value: 'grey', name: 'Grey' },
            { value: 'blue-grey', name: 'Blue grey' }
        ];
        $scope.colorPalettes = {
            red: ['red lighten-5 black-text', 'red lighten-4 black-text', 'red lighten-3 black-text', 'red lighten-2 black-text', 'red lighten-1 black-text', 'red black-text', 'red darken-1 white-text', 'red darken-2 white-text', 'red darken-3 white-text', 'red darken-4 white-text', 'red accent-1 black-text', 'red accent-2 black-text', 'red accent-3 black-text', 'red accent-4 black-text'],
            pink: ['pink lighten-5 black-text', 'pink lighten-4 black-text', 'pink lighten-3 black-text', 'pink lighten-2 black-text', 'pink lighten-1 black-text', 'pink black-text', 'pink darken-1 white-text', 'pink darken-2 white-text', 'pink darken-3 white-text', 'pink darken-4 white-text', 'pink accent-1 black-text', 'pink accent-2 black-text', 'pink accent-3 black-text', 'pink accent-4 black-text'],
            lime: ['lime lighten-5 black-text', 'lime lighten-4 black-text', 'lime lighten-3 black-text', 'lime lighten-2 black-text', 'lime lighten-1 black-text', 'lime black-text', 'lime darken-1 white-text', 'lime darken-2 white-text', 'lime darken-3 white-text', 'lime darken-4 white-text', 'lime accent-1 black-text', 'lime accent-2 black-text', 'lime accent-3 black-text', 'lime accent-4 black-text'],
            yellow: ['yellow lighten-5 black-text', 'yellow lighten-4 black-text', 'yellow lighten-3 black-text', 'yellow lighten-2 black-text', 'yellow lighten-1 black-text', 'yellow black-text', 'yellow darken-1 white-text', 'yellow darken-2 white-text', 'yellow darken-3 white-text', 'yellow darken-4 white-text', 'yellow accent-1 black-text', 'yellow accent-2 black-text', 'yellow accent-3 black-text', 'yellow accent-4 black-text'],
            purple: ['purple lighten-5 black-text', 'purple lighten-4 black-text', 'purple lighten-3 black-text', 'purple lighten-2 black-text', 'purple lighten-1 black-text', 'purple black-text', 'purple darken-1 white-text', 'purple darken-2 white-text', 'purple darken-3 white-text', 'purple darken-4 white-text', 'purple accent-1 black-text', 'purple accent-2 black-text', 'purple accent-3 black-text', 'purple accent-4 black-text'],
            'deep-purple': ['deep-purple lighten-5 black-text', 'deep-purple lighten-4 black-text', 'deep-purple lighten-3 black-text', 'deep-purple lighten-2 black-text', 'deep-purple lighten-1 black-text', 'deep-purple black-text', 'deep-purple darken-1 white-text', 'deep-purple darken-2 white-text', 'deep-purple darken-3 white-text', 'deep-purple darken-4 white-text', 'deep-purple accent-1 black-text', 'deep-purple accent-2 black-text', 'deep-purple accent-3 black-text', 'deep-purple accent-4 black-text'],
            indigo: ['indigo lighten-5 black-text', 'indigo lighten-4 black-text', 'indigo lighten-3 black-text', 'indigo lighten-2 black-text', 'indigo lighten-1 black-text', 'indigo black-text', 'indigo darken-1 white-text', 'indigo darken-2 white-text', 'indigo darken-3 white-text', 'indigo darken-4 white-text', 'indigo accent-1 black-text', 'indigo accent-2 black-text', 'indigo accent-3 black-text', 'indigo accent-4 black-text'],
            teal: ['teal lighten-5 black-text', 'teal lighten-4 black-text', 'teal lighten-3 black-text', 'teal lighten-2 black-text', 'teal lighten-1 black-text', 'teal black-text', 'teal darken-1 white-text', 'teal darken-2 white-text', 'teal darken-3 white-text', 'teal darken-4 white-text', 'teal accent-1 black-text', 'teal accent-2 black-text', 'teal accent-3 black-text', 'teal accent-4 black-text'],
            green: ['green lighten-5 black-text', 'green lighten-4 black-text', 'green lighten-3 black-text', 'green lighten-2 black-text', 'green lighten-1 black-text', 'green black-text', 'green darken-1 white-text', 'green darken-2 white-text', 'green darken-3 white-text', 'green darken-4 white-text', 'green accent-1 black-text', 'green accent-2 black-text', 'green accent-3 black-text', 'green accent-4 black-text'],
            'light-green': ['light-green lighten-5 black-text', 'light-green lighten-4 black-text', 'light-green lighten-3 black-text', 'light-green lighten-2 black-text', 'light-green lighten-1 black-text', 'light-green black-text', 'light-green darken-1 white-text', 'light-green darken-2 white-text', 'light-green darken-3 white-text', 'light-green darken-4 white-text', 'light-green accent-1 black-text', 'light-green accent-2 black-text', 'light-green accent-3 black-text', 'light-green accent-4 black-text'],
            orange: ['orange lighten-5 black-text', 'orange lighten-4 black-text', 'orange lighten-3 black-text', 'orange lighten-2 black-text', 'orange lighten-1 black-text', 'orange black-text', 'orange darken-1 white-text', 'orange darken-2 white-text', 'orange darken-3 white-text', 'orange darken-4 white-text', 'orange accent-1 black-text', 'orange accent-2 black-text', 'orange accent-3 black-text', 'orange accent-4 black-text'],
            'deep-orange': ['deep-orange lighten-5 black-text', 'deep-orange lighten-4 black-text', 'deep-orange lighten-3 black-text', 'deep-orange lighten-2 black-text', 'deep-orange lighten-1 black-text', 'deep-orange black-text', 'deep-orange darken-1 white-text', 'deep-orange darken-2 white-text', 'deep-orange darken-3 white-text', 'deep-orange darken-4 white-text', 'deep-orange accent-1 black-text', 'deep-orange accent-2 black-text', 'deep-orange accent-3 black-text', 'deep-orange accent-4 black-text'],
            cyan: ['cyan lighten-5 black-text', 'cyan lighten-4 black-text black-text', 'cyan lighten-3 black-text', 'cyan lighten-2 black-text', 'cyan lighten-1 black-text', 'cyan black-text', 'cyan darken-1 white-text', 'cyan darken-2 white-text', 'cyan darken-3 white-text', 'cyan darken-4 white-text', 'cyan accent-1 black-text', 'cyan accent-2 black-text', 'cyan accent-3 black-text', 'cyan accent-4 black-text'],
            amber: ['amber lighten-5 black-text', 'amber lighten-4 black-text', 'amber lighten-3 black-text', 'amber lighten-2 black-text', 'amber lighten-1 black-text', 'amber black-text', 'amber darken-1 white-text', 'amber darken-2 white-text', 'amber darken-3 white-text', 'amber darken-4 white-text', 'amber accent-1 black-text', 'amber accent-2 black-text', 'amber accent-3 black-text', 'amber accent-4 black-text'],
            blue: ['blue lighten-5 black-text', 'blue lighten-4 black-text', 'blue lighten-3 black-text', 'blue lighten-2 black-text', 'blue lighten-1 black-text', 'blue black-text', 'blue darken-1 white-text', 'blue darken-2 white-text', 'blue darken-3 white-text', 'blue darken-4 white-text', 'blue accent-1 black-text', 'blue accent-2 black-text', 'blue accent-3 black-text', 'blue accent-4 black-text'],
            'light-blue': ['light-blue lighten-5 black-text', 'light-blue lighten-4 black-text', 'light-blue lighten-3 black-text', 'light-blue lighten-2 black-text', 'light-blue lighten-1 black-text', 'light-blue black-text', 'light-blue darken-1 white-text', 'light-blue darken-2 white-text', 'light-blue darken-3 white-text', 'light-blue darken-4 white-text', 'light-blue accent-1 black-text', 'light-blue accent-2 black-text', 'light-blue accent-3 black-text', 'light-blue accent-4 black-text'],
            grey: ['grey lighten-5 black-text', 'grey lighten-4 black-text black-text', 'grey lighten-3 black-text', 'grey lighten-2 black-text', 'grey lighten-1 black-text', 'grey black-text', 'grey darken-1 white-text', 'grey darken-2 white-text', 'grey darken-3 white-text', 'grey darken-4 white-text'],
            'blue-grey': ['blue-grey lighten-5 black-text', 'blue-grey lighten-4 black-text', 'blue-grey lighten-3 black-text', 'blue-grey lighten-2 black-text', 'blue-grey lighten-1 black-text', 'blue-grey black-text', 'blue-grey darken-1 white-text', 'blue-grey darken-2 white-text', 'blue-grey darken-3 white-text', 'blue-grey darken-4 white-text']
        };
        $scope.InitTemplate = function(currentColor) {
            if(!$rootScope.template.components) {
                $rootScope.template.components = {};
            }
            $rootScope.template.mainColor = currentColor;
            $rootScope.template.components.logo = $scope.colorPalettes[currentColor][0];
            $rootScope.template.components.topMenu = $scope.colorPalettes[currentColor][6];
            $rootScope.template.components.topIcon = $scope.colorPalettes[currentColor][8];
            $rootScope.template.components.leftProfile = $scope.colorPalettes[currentColor][6];
            $rootScope.template.components.content = $scope.colorPalettes[currentColor][0];
            $rootScope.template.components.toolbarView = $scope.colorPalettes[currentColor][3];
            $scope.currentTemplate.components = $rootScope.template.components;
            $scope.currentTemplate.mainColor = $rootScope.template.mainColor;
        };
        $scope.Save = function(template) {
            $rootScope.templates.forEach(function(item) {
                item.isActive = false;
                $rootScope.templates.save(item);
            });
            template.isActive = true;
            template.customComponent = $scope.components;
            template.components = $rootScope.template.components;
            $rootScope.templates.save(template);
            sAlert.success('Success!');
            Tab.RemoveTab({id: Tab.currentTabId});
        };
        $scope.SetColorForComponent = function(color) {
            $scope.currentTemplate.mainColor = color;
            __.forEach($scope.components, function(item) {
                item.color = color;
            });
        };

        $scope.$watch('currentTemplate', function(newValue, oldValue){
            if(newValue !== oldValue){
                Session.set(Tab.currentTabId, {currentTemplate: $scope.currentTemplate, components: $scope.components});
            }
        }, true);

    });
