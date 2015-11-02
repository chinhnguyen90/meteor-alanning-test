var __ = lodash;
app.controller('ProfileFormCtrl',
    function($scope, $meteor, $state, $stateParams, uiGridConstants, Tab, $translate){
        $translate(__.find(Tab.tabs, {"id": Tab.currentTabId}).title).then(function(breadcrumb){
            $scope.breadcrumb = breadcrumb + __.find(Tab.tabs, {"id": Tab.currentTabId}).valuename;
        });

        console.log(Tab.currentTabId, Session.get(Tab.currentTabId));
        var listChecked = {},
            backup = {};
        if($stateParams.profileId){
            $scope.mode = 'edit';
            $scope.profile = $meteor.object(Profiles,$stateParams.profileId, false).getRawObject();
            _.forEach($scope.profile.roles, function(role){
                listChecked[role] = true;
            });
        } else {
            $scope.mode = 'create';
            $scope.profile = {};
        }

        if(Session.equals(Tab.currentTabId, undefined)){//chua co localStorage
            Session.set(Tab.currentTabId, $scope.profile);
        } else {//da co localStorage
            $scope.profile = Session.get(Tab.currentTabId);
        }

        $scope.listCheck = Roles.getAllRoles().fetch();

        $scope.isChecked = function(id){
            if(listChecked[id]){
                return true;
            } else {
                return false;
            }
        };
        $scope.Check = function(id){
            listChecked[id] = !listChecked[id];
        };

        $scope.CreatePermission = function(profile){
            if(!profile.roles){
                profile.roles = [];
            }
            var permission = {};
            _.forEach(listChecked, function(role, key){
                if(role){
                    permission = __.find($scope.listCheck, {'_id': key});
                    profile.roles.push(permission.name);
                }
            });
            $scope.$meteorCollection(Profiles).save(profile);
            Tab.RemoveTab({id: Tab.currentTabId});
        };

        $scope.UpdatePermission = function(profile){
            profile.roles = [];
            _.forEach(listChecked, function(role, key){
                if(role){
                    profile.roles.push(key);
                }
            });
            $scope.$meteorCollection(Profiles).save(profile);
            Tab.RemoveTab({id: Tab.currentTabId});
        };
        $scope.RollBack = function(){
            Tab.RemoveTab({id: Tab.currentTabId});
        };
        
        $scope.$watch('profile', function(newValue){
            if(newValue !== {}){
                Session.set(Tab.currentTabId, $scope.profile);
            }
        },true);
    });