var __ = lodash;
app.controller('UserFormCtrl',
    function($scope, $meteor, $state, $stateParams, uiGridConstants, Tab, $translate){
        $translate(__.find(Tab.tabs, {"id": Tab.currentTabId}).title).then(function(breadcrumb){
            $scope.breadcrumb = breadcrumb + __.find(Tab.tabs, {"id": Tab.currentTabId}).valuename;
        });
        if($stateParams.userId){
            $scope.mode = 'edit';
            $scope.user = $meteor.object(Meteor.users, {_id: $stateParams.userId}, false).getRawObject();
            $scope.user.email = $scope.user.emails?$scope.user.emails[0].address:'';
        } else {
            $scope.mode = 'create';
            $scope.user = {
                profile: {
                    permissions: []
                }
            };
        }

        $scope.CreateUser = function(user){
            if(user.profile.firstName && user.profile.lastName) {
                user.profile.fullName = user.profile.lastName + ' ' + user.profile.firstName;
            } else if(user.profile.firstName) {
                user.profile.fullName = user.profile.firstName;
            } else {
                user.profile.fullName = user.profile.lastName;
            }
            Meteor.call('createUserPassword', user);
            sAlert.success('Created');
            Tab.RemoveTab({id: Tab.currentTabId});
        };

        $scope.UpdateUser = function(user){
            if(user.profile.firstName && user.profile.lastName) {
                user.profile.fullName = user.profile.lastName + ' ' + user.profile.firstName;
            } else if(user.profile.firstName) {
                user.profile.fullName = user.profile.firstName;
            } else {
                user.profile.fullName = user.profile.lastName;
            }
            Meteor.users.update({_id:user._id}, {$set:{"profile":user.profile}});
            Meteor.call('modifyChangePassword', user);
            sAlert.success('Updated');
            Tab.RemoveTab({id: Tab.currentTabId});
        };
        $scope.RollBack = function(){
            Tab.RemoveTab({id: Tab.currentTabId});
        }
    });
