app.controller('TemplateCtrl',
    function($rootScope, $scope, $meteor, Tab){

        $scope.gridOptions = {
            data: $rootScope.templates,
            enableFiltering: true,
            columnDefs: [
                { name: 'active', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false,
                    cellTemplate: '<a ng-click="grid.appScope.Active(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                    '<i class="material-icons tiny" style="color:blue; font-size: 21px">keyboard_return</i></a>'},
                { name: 'edit', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false,
                    cellTemplate: '<a ng-click="grid.appScope.Edit(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                    '<i class="material-icons tiny" style="color:green; font-size: 21px">edit</i></a>'},
                { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false,
                    cellTemplate: '<a ng-click="grid.appScope.Delete(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                    '<i class="material-icons tiny" style="color:red; font-size: 21px">remove</i></a>'},
                { field: 'name', displayName: 'Name', filter: { placeholder: ' '}, enableColumnMenu: false},
                { field: 'isActive', displayName: 'Active', filter: { placeholder: ' '}, enableColumnMenu: false}
            ],
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
            }
        };
        $scope.Active = function(row) {
            $rootScope.templates.forEach(function(template) {
                template.isActive = false;
                $rootScope.templates.save(template);
            });
            row.entity.isActive = true;
            $rootScope.template = row.entity;
            $rootScope.templates.save(row.entity);
        };
        $scope.Edit = function(row) {
            Tab.CreateTab('sys.form.template.edit', 'templateForm', row.entity.name, {id: row.entity._id});
        };
        $scope.Delete = function(row) {
            if (!confirm('Do you want to delete?')) {
                return;
            }
            if (row.entity.isActive) {
                sAlert.error('Template is activating');
                return;
            }
            $meteor.call('DeleteTemplate', row.entity._id).then(
                function() {
                    sAlert.success('Template deleted!');
                },
                function(err) {
                    console.log(err);
                    sAlert.error('Failed!');
                }
            );
        };
    });