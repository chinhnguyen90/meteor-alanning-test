app.controller('ProfileCtrl',
    function($scope, $meteor, $state, uiGridConstants, Tab){

        $scope.profiles = $meteor.collection(Profiles);
        $scope.Create = function(){
            Tab.CreateTab('sys.form.profile.create','profileDetail', '', {profileId:''});
        };
        $scope.gridOptionProfiles = {
            enableFiltering: true,
            columnDefs: [
                { name: 'edit', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Edit(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:blue;">mode_edit</i></a>'},
                { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Delete(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:red;">close</i></a>'},
                { field: 'profileName', displayName: 'Profiles', filter: {placeholder: ' '}, enableCellEdit: true },
                { field: 'roles', displayName: 'Roles', filter: {placeholder: ' '}, enableCellEdit: true }
            ],
            data: $scope.profiles,
            onRegisterApi: function (gridApi) {
                $scope.gridApiProfiles = gridApi;
            }
        };
        $scope.Edit = function (row) {
            Tab.CreateTab('sys.form.profile.edit','profileDetail', row.entity.profileName, {profileId:row.entity._id});
        };
        $scope.Delete = function (row) {
            if (!confirm('Do you want to Delete?')) {
                return;
            }
            $scope.profiles.remove(row.entity);
        };
    });