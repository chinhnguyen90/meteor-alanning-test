app.controller('LoginCtrl',
    function($scope, $meteor, $state, $rootScope, $interval) {

        Meteor.logout();

        $scope.groups = $meteor.collection(Groups, false).subscribe('groups');
        $scope.profiles = $meteor.collection(Profiles, false).subscribe('profiles');

        $scope.clock = Date.now();
        $interval(function () {
            $scope.clock = Date.now();
        }, 1000);

        if (Meteor.isCordova){
            $state.go('mobile');
        }

        $scope.Login = function(username, password) {
            $meteor.loginWithPassword(username, password).then(function(){
                console.log('login success');
                //remove Roles
                if(Meteor.user().profile.permissions.length > 0){
                    __.forEach(Meteor.user().profile.permissions, function(item){
                        Roles.removeUsersFromRoles(Meteor.user()._id, $meteor.object(Profiles, item.profile.id).roles, item.group.id);
                    });
                    Meteor.users.update({_id:Meteor.user()._id}, {$set:{"roles":{}}});
                    //add Roles
                    Roles.addUsersToRoles(Meteor.user()._id, $meteor.object(Profiles, Meteor.user().profile.permissions[0].profile.id).roles, Meteor.user().profile.permissions[0].group.id);
                } else {
                    sAlert.warning('Chưa có profile');
                }
                if (Meteor.isCordova){
                    $state.go('mobile');
                } else {
                    $state.go('home');
                }
            }, function(err){
                sAlert.error(err);
            });
        };
    });