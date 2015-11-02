app.controller('MemberCtrl',
    function($scope, $meteor, $state, Tab){

        $scope.groups = $meteor.collection(Groups).subscribe('groups');
        //console.log($scope.groups);
        $scope.load = function(){
            $scope.members = [];
            _.forEach($scope.groups ,function(group){
                if(group.users){
                    _.forEach(group.users ,function(user){
                        $scope.members.push({
                            userId: user._id,
                            groupId: group._id,
                            UserName: user.username,
                            //UserFullname: user.profile.firstName + ' ' + user.profile.lastName,
                            Email: user.emails[0].address,
                            GroupName: group.name,
                            GroupDisplayname: group.displayName
                        });
                    });
                }
            });
            $scope.gridOptions = {
                data: $scope.members,
                enableRowSelection: true,
                multiSelect: true,
                enableFiltering: true,
                columnDefs: [
                    { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false,
                        cellTemplate: '<a ng-click="grid.appScope.Delete(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                        '<i class="material-icons tiny" style="color:red;">close</i></a>'},
                    { field: 'UserName', displayName: 'UserName', filter: {placeholder: ' '}, enableColumnMenu: false},
                    //{ field: 'UserFullname', displayName: 'UserFullname'},
                    { field: 'Email', displayName: 'Email', filter: {placeholder: ' '}, enableColumnMenu: false},
                    { field: 'GroupName', displayName: 'GroupName', filter: {placeholder: ' '}, enableColumnMenu: false},
                    { field: 'GroupDisplayname', displayName: 'GroupDisplayname', filter: {placeholder: ' '}, enableColumnMenu: false}
                ],
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                    gridApi.selection.on.rowSelectionChanged($scope, function () {
                        if (gridApi.selection.getSelectedRows().length) {
                            $scope.allowRemove = true;
                        } else {
                            $scope.allowRemove = false;
                        }
                    });
                }
            };
        };
        $scope.load();

        $scope.$watch('groups', function (newValue, oldValue) {
            if (oldValue !== newValue) {
                $scope.load();
            }
        }, true);

        $scope.Create = function(){
            Tab.CreateTab('sys.form.members.create', 'memberForm');
        };

        $scope.Delete = function (row) {
            if (!confirm('Do you want to Delete?')) {
                return;
            }
            //console.log(row);
            Meteor.call('deleteMember', row.entity);
            sAlert.success('Delete success');
        };

        $scope.DeleteSelected = function(){
            if (!confirm('Do you want to Delete Selected?')) {
                return;
            }
            //console.log($scope.gridApi.selection.getSelectedRows());
            Meteor.call('deleteSelectedMember', $scope.gridApi.selection.getSelectedRows());
            sAlert.success('Delete success');
        };
    });