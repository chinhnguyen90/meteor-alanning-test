var __=lodash;
app.controller('MemberFormCtrl',
    function($scope, $meteor, $state, Tab, $translate){
        $translate(__.find(Tab.tabs, {"id": Tab.currentTabId}).title).then(function(breadcrumb){
            $scope.breadcrumb = breadcrumb + __.find(Tab.tabs, {"id": Tab.currentTabId}).valuename;
        });

        $scope.groups = $meteor.collection(Groups).subscribe('groups');
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.member = {
            group: '',
            user: ''
        };

        $scope.Create = function(member){
            //console.log(member);
            member.group = JSON.parse(member.group);
            member.user = JSON.parse(member.user);
            Meteor.call('createMember', member);
            sAlert.success('Create success');
            Tab.RemoveTab({id: Tab.currentTabId});
        };

        $scope.RollBack = function(){
            Tab.RemoveTab({id: Tab.currentTabId});
        }
    });