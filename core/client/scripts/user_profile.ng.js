var __ = lodash;
app.controller('UserProfileCtrl',
    function($scope, $meteor, $state, $stateParams, Tab, $translate){
        $translate(__.find(Tab.tabs, {"id": Tab.currentTabId}).title).then(function(breadcrumb){
            $scope.breadcrumb = breadcrumb + __.find(Tab.tabs, {"id": Tab.currentTabId}).valuename;
        });
        console.log(Tab.currentTabId, Session.get(Tab.currentTabId));

        $scope.user = $meteor.object(Meteor.users, {_id: $stateParams.userId}, false).getRawObject();
        $scope.groups = $meteor.collection(Groups, false).subscribe('groups');
        $scope.profiles = $meteor.collection(Profiles, false).subscribe('profiles');
        $scope.navigations = $meteor.collection(Navigations).subscribe('navigations');

        /*if(Session.equals(Tab.currentTabId, undefined)){//chua co localStorage
            // Session.set(Tab.currentTabId, $scope.profile);
        } else {
            //da co localStorage
            groupChecked = Session.get(Tab.currentTabId);
        }*/

        $scope.CreatePer = function(user, profile, nav, group){
            profile = JSON.parse(profile);
            nav = JSON.parse(nav);
            group = JSON.parse(group);
            Meteor.users.update(
                {_id: user._id},
                    {$push:{"profile.permissions":{
                        profile:{
                            id: profile._id,
                            profileName: profile.profileName
                        },
                        group: {
                            name: group.name,
                            id: group._id,
                            displayName: group.displayName
                        },
                        navigation: {
                            name: nav.name,
                            id: nav._id
                        }
                }}}
            );
            Tab.RemoveTab({id: Tab.currentTabId});
        };

        $scope.RollBack = function(){
            Tab.RemoveTab({id: Tab.currentTabId});
        };
    });
