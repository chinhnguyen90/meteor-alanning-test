app.controller('UserCtrl', function($scope, $meteor, uiGridConstants, Tab){

        $scope.groupTree = [];
        $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
        $scope.groups = $meteor.collection(Groups, false).subscribe('groups');
        $scope.profiles = $meteor.collection(Profiles, false).subscribe('profiles');


        $scope.CreateUser = function(newUser){
            Tab.CreateTab('sys.form.users.create','userDetail', '', {userId:''});
        };
        $scope.gridOptions = {
            data: 'users',
            enableFiltering: true,
            //This is the template that will be used to render subgrid.
            expandableRowTemplate: '<div ui-grid="row.entity.subGridOptionUsers" style="height:100px;"></div>',
            //This will be the height of the subgrid
            expandableRowHeight: 100,
            //Variables of object expandableScope will be available in the scope of the expanded subgrid
            expandableRowScope:  {
                subGridVariable: 'subGridScopeVariable'
            },
            columnDefs: [
                { name: 'add', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Add(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:blue; font-size: 21px">add</i></a>'},
                { name: 'edit', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Edit(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:green; font-size: 21px">edit</i></a>'},
                { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Delete(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:red; font-size: 21px">remove</i></a>'},
                // { field: '_id', displayName: 'ID'},
                { field: 'username', displayName: 'User Name', filter: { placeholder: ' ' }},
                { field: 'emails[0].address', displayName: 'Email', filter: { placeholder: ' ' }}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApiUser = gridApi;
                gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                    if (row.isExpanded) {
                        row.entity.subGridOptionUsers = {
                            appScopeProvider: $scope,
                            columnDefs: [
                                { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.DeleteSub(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                                '<i class="material-icons tiny" style="color:red;">close</i></a>'},
                                { field: 'profile.profileName', displayName: 'Profile'},
                                { field: 'group.displayName', displayName: 'Group'},
                                { field: 'navigation.name', displayName: 'Menu'}
                            ],
                            data: row.entity.profile.permissions
                        };
                    }
                });
            }
        };
        $scope.Add = function(row){
            Tab.CreateTab('sys.form.usersProfile.create', 'userProfile', row.entity.username, {userId:row.entity._id, profileNum:''});
        };
        $scope.Edit = function (row) {
            Tab.CreateTab('sys.form.users.edit', 'userDetail', row.entity.username, {userId:row.entity._id});
        };
        $scope.Delete = function (row) {
            if (!confirm('Do you want to Delete?')) {
                return;
            }
            if(row.entity._id == '0'){
                sAlert.error('Not allow');
            } else {
                $meteor.collection(Meteor.users, false).remove(row.entity);
            }
        };
        $scope.DeleteSub = function (row) {
            Meteor.users.update({_id: row.grid.parentRow.entity._id},
                {
                    $pull: {
                        "profile.permissions": {
                            profile:{
                                id: row.entity.profile.id,
                                profileName: row.entity.profile.profileName
                            },
                            group: {
                                name: row.entity.group.name,
                                id: row.entity.group.id,
                                displayName: row.entity.group.displayName
                            },
                            navigation: {
                                name: row.entity.navigation.name,
                                id: row.entity.navigation.id
                            }
                        }
                    }
                });
            $scope.gridApiUser.expandable.collapseAllRows();
        };
    });
