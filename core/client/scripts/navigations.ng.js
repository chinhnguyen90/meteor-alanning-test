var _= lodash;
app.controller('NavigationCtrl',
    function($scope, $meteor, $state, $timeout, Tab){

        var tabId = Tab.currentTabId.toString(),
            navigations = $meteor.collection(Navigations).subscribe('navigations');

    	$scope.CreateNav = function() {
            Tab.CreateTab('sys.form.navigations.create','navigationForm', '', {navId:''});
    	};

    	$scope.gridOptionNav = {
            data: navigations,
            saveOrder: true,
            saveScroll: true,
            saveFocus: true,
            saveSort: true,
            saveFilter: true,
            saveGroupingExpandedStates: true,
            enableFiltering: true,
            columnDefs: [
                { name: 'edit', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Edit(row)" class="waves-effect waves-blue btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:blue;">mode_edit</i></a>'},
                { name: 'delete', displayName: '', width: 34, enableFiltering: false, enableColumnMenu: false, cellTemplate: '<a ng-click="grid.appScope.Delete(row)" class="waves-effect waves-red btn-flat center-align" style="padding:0;width:100%;">' +
                '<i class="material-icons tiny" style="color:red;">close</i></a>'},
                { field: '_id', displayName: 'ID', filter: {placeholder: ' '}},
                { field: 'name', displayName: 'sys.form.navigations.name', filter: {placeholder: ' '}, headerCellFilter:'translate'}
            ],
            onRegisterApi: function (gridApi) {
                console.log('init api');
                if(!Session.equals(Tab.currentTabId, undefined)){
                    console.log('load api');
                    gridApi.saveState.restore($scope, Session.get(Tab.currentTabId));
                }
                $scope.gridApiNav = gridApi;
            }
    	};

    	$scope.Edit = function(row){
            if(row.entity._id == '0'){
                sAlert.error('Not allow');
            } else {
                Tab.CreateTab('sys.form.navigations.edit','navigationForm', row.entity.name, {navId:row.entity._id});
            }
    	};
    	$scope.Delete = function(row){
            if (!confirm('Do you want to Delete?')) {
                return;
            }
            if(row.entity._id == '0'){
                sAlert.error('Not allow');
            } else {
            	navigations.remove(row.entity);
                sAlert.Success('Deleted');
            }
    	};

        $scope.$on("$destroy", function() {
            Session.set(tabId, $scope.gridApiNav.saveState.save());
            console.log('save local');
        });
        $timeout(function(){
            if(!Session.equals(Tab.currentTabId, undefined)){
                console.log('load api');
                $scope.gridApiNav.saveState.restore($scope, Session.get(Tab.currentTabId));
            }
        },1000);
    });