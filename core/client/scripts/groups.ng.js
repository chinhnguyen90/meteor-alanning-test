var _ = lodash;
app.controller('GroupCtrl',
    function ($scope, $meteor, $state, uiGridConstants) {
        $scope.groups = $meteor.collection(Groups).subscribe('groups');
        $scope.newGroup = {};
        $scope.groupTree = [];

        function GetParentPath(id) {
            var group = $meteor.object(Groups, id);
            if (group) {
                if (group.parentId) {
                    return GetParentPath(group.parentId) + '/' + $meteor.object(Groups, group.parentId).name;
                } else {
                    return '';
                }
            } else {
                return '';
            }
        }

        function UpdateParentPath() {
            $scope.groups.forEach(function (group) {
                group.parentPath = GetParentPath(group._id);
                $scope.groups.save(group);
            })
        }

        function BuildTree(parentPath) {
            var groupTree = [];
            $scope.groups.forEach(function (group) {
                if (group.parentPath == parentPath) {
                    groupTree.push(group);
                    group.children = BuildTree(parentPath + '/' + group.name);
                }
            });
            return groupTree;
        }

        $scope.CreateGroup = function (group, parent) {
            if(parent){
                group.parentId = parent._id;
            }
            if(_.find($scope.groups, {"name": group.name})){
                sAlert.error('Duplicate Name');
                // if(notify.permissionLevel() == 'default'){
                //     notify.requestPermission();
                // }
                // notify.createNotification('Error');
                // console.log(notify);
                return true;
            } else {
                $scope.groups.save(group).then(function () {
                    UpdateParentPath();
                });
                $scope.newGroup = {};
                return false;
            }
        };

        $scope.EditGroup = function (eGroup) {
            if(_.find($scope.groups, {"name": eGroup.name})){
                sAlert.error('Duplicate Name');
                return true;
            } else {
                eGroup._id = eGroup.id;
                $scope.groups.save(eGroup);
                return false;
            }
        };

        $scope.Remove = function (group) {
            if (!confirm('Do you want to Delete?')) {
                return;
            }
            var hasChildren = false;
            $scope.groups.forEach(function (group0) {
                if (group0.parentId == group._id) {
                    hasChildren = true;
                }
            });
            if (!hasChildren && $scope.groups.length > 1) {
                $scope.groups.remove(group);
            } else {
                sAlert.error('Not allow');
            }
        };
        $scope.$watch('groups', function (newValue) {
            $scope.groupTree = BuildTree('');
        }, true);

        $scope.treeOptions = {
            accept: function(){
                return true;
            },
            dropped: function (event) {
                var group = event.source.nodeScope.$modelValue;
                if(event.dest.nodesScope.$nodeScope){
                    group.parentId = event.dest.nodesScope.$nodeScope.$modelValue._id;
                } else {
                    group.parentId = null;
                }
                $scope.groups.save(group);
                UpdateParentPath();
            },
            'data-drag-enabled': true,
            'data-max-depth': 0,
            'data-drag-delay': 0
        };
    });