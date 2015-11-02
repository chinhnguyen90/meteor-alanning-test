app.service('Tab', function ($state, $rootScope) {
    'use strict';
    this.tabs = [];
    this.currentTabId = '';
    this.currentTabIndex = 0;

    this.SelectTab = function (tab) {
        // var thisTab = angular.copy(tab);
        this.currentTabId = tab.id;
        tab.params.tabId = tab.id;
        $state.go(tab.state, tab.params);
    };
    this.CreateTab = function (title, state, valuename, params) {
        if(state){
            if($rootScope.tabMode){
                var exitsEditTab = __.find(this.tabs, {'params': params, state: state});
                if(exitsEditTab !== undefined){//exits edit form
                    this.SelectTab(exitsEditTab);
                } else {
                    var thisTab = {
                        id: this.randomId(),
                        title: title,
                        state: state,
                        valuename: valuename,
                        params: params? params: {}
                    };
                    this.tabs.push(thisTab);
                    this.SelectTab(thisTab);
                }
            } else {
                var existTab = __.findLast(this.tabs, {'state': state});
                if(existTab){
                    this.SelectTab(existTab);
                } else {
                    var thisTab = {
                        id: this.randomId(),
                        title: title,
                        state: state,
                        valuename: valuename,
                        params: params? params: {}
                    };
                    this.tabs.push(thisTab);
                    this.SelectTab(thisTab);
                }
            }
        }
    };
    this.RemoveTab = function (tab) {
        var idx = __.findIndex(this.tabs, {id: tab.id});
        if(this.tabs.length == 1){
            sAlert.error("Can't close!");
        } else {
            this.tabs.splice(idx, 1);
            Session.set(tab.id,undefined);
        }
    };
    this.randomId = function(){
        var randomChar = '',
            string = 'aAbBcCdDeEfFgGhHiIjJkKmMlLnNoOpPqQrRsStTuUvVwWxXyYzZ';
        for(var i=0; i<30; i++){
            randomChar += string.substr(Math.floor(Math.random()*string.length), 1);
        }
        return randomChar;
    };
});
