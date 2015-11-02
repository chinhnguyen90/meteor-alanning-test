app.controller('HomeCtrl',
    function($rootScope, $scope, $meteor, $state, $timeout, Tab){
        console.log('home load');
        $timeout(function(){
            $(document).ready(function(){
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
                $( 'md-ink-bar' ).attr('class',$rootScope.template.components.topIcon);
            });
        }, 1000);
        $meteor.subscribe('navigations').then(function(subscriptionHandle){
            var currentNav = $meteor.object(Navigations, {_id: $rootScope.currentProfile? $rootScope.currentProfile.navigation.id: '1'}).getRawObject();
            if(currentNav.defaultTab && Tab.tabs.length==0){
                if(Meteor.user()){
                    Tab.CreateTab("sys.tabNames."+currentNav.defaultTab.name, currentNav.defaultTab.state);
                } else {
                    $state.go('default');
                }
            }
            subscriptionHandle.stop();
        });
    });