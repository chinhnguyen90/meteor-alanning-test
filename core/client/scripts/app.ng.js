app.controller('MainCtrl',
    function ($rootScope, $scope, $meteor, $state, $window, runtimeInit, $timeout, $translate, $mdSidenav, hotkeys, Tab) {
        console.log('app load');

        var w = angular.element($window),
            states = [],
            i18n = [];
        __ = lodash;
        $rootScope.Tab = Tab;
        $rootScope.gridState = {};
        $rootScope.tabMode = true;
        $scope.currentTab = 0;
        $scope.tabs = [];
        $rootScope.navigation = {
            nav: []
        };
        sAlert.audio = new Audio('/sounds/bell2.mp3');

        $scope.$meteorSubscribe('notifications');
        $scope.$meteorSubscribe('chats');
        $scope.$meteorSubscribe('allUsers');

        $rootScope.notifications = $scope.$meteorCollection(Notifications, false);
        $scope.chats = $scope.$meteorCollection(Chats, false);
        $scope.users = $scope.$meteorCollection(Meteor.users, false);

        var query = Notifications.find();
        $scope.newNotify = false;

        var handle = query.observeChanges({
            added: function() {
                if (Meteor.user()) {
                    sAlert.closeAll();
                    sAlert.warning('New notification!');
                    $scope.newNotify = true;
                }
            }
        });

        $meteor.subscribe('profiles').then(function (subscriptionHandle) {
            $scope.profiles = $meteor.collection(Profiles, false);
            //Init templates
            $meteor.subscribe('templates').then(function (subscriptionHandle) {
                $rootScope.templates = $meteor.collection(Templates, false);
                $rootScope.template = $scope.$meteorObject(Templates, {isActive: true}, false);
                $rootScope.setting = Meteor.settings.public;
                $scope.ReloadMenu();
            });
        });
        //catch change $state to add Tab and login
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $('.button-collapse').sideNav('hide');
                if(toParams.tabId == 'parentBC'){
                    var existTab = __.findLast(Tab.tabs, {'state': toState.name});
                    if(existTab){
                        Tab.tabs.splice(__.findLastIndex(Tab.tabs, {'params': fromParams}),1);
                        Tab.SelectTab(existTab);
                    } else {
                        Tab.tabs.splice(__.findLastIndex(Tab.tabs, {'params': fromParams}),1);
                        Tab.CreateTab(toState.ncyBreadcrumbLabel, toState);
                    }
                }
                if (fromState.name == 'login' || fromState.name == 'default') {
                    $scope.onLoad();
                }
            });

        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                event.preventDefault();
                if (error == "AUTH_REQUIRED") {
                    console.log($state.get('default'));
                    // console.log(event, toState, toParams, fromState, fromParams, error);
                    if ($state.get('default')) {
                        $state.go('default');
                    } else {
                        // Init States
                        $meteor.subscribe('states').then(function (subscriptionHandle) {
                            console.log('init state');
                            // Bind all the todos to $scope.todos
                            var states = $meteor.collection(States);
                            states.forEach(function (item) {
                                if (!$state.get(item.name)) {
                                    runtimeInit.addState(item.name, item.state);
                                }
                            });
                            // You can use the subscription handle to stop the subscription if you want
                            subscriptionHandle.stop();
                            $state.go('default');
                        });
                    }
                }
            });
        $rootScope.widthScreen = window.innerWidth;
        $rootScope.heightScreen = window.innerHeight;
        $scope.clock = Date.now();

        //Load UserDetail
        $scope.onLoad = function () {
            sAlert.config({
                effect: 'jelly',
                position: 'bottom-right',
                timeout: 4000,
                html: false,
                onRouteClose: true,
                stack: true,
                offset: 0
            });
            if (Meteor.user()) {
                if (Meteor.user().profile.permissions.length > 0) {
                    $rootScope.currentProfile = Meteor.user().profile.permissions[0];
                    $rootScope.navigation = $meteor.object(Navigations, {_id: Meteor.user().profile.permissions[0].navigation.id}, false).subscribe('navigations');
                } else {
                    if (Meteor.user()._id == '0') {//admin
                        $rootScope.navigation = $meteor.object(Navigations, {_id: '1'}, false).subscribe('navigations');
                    } else {//users
                        $rootScope.navigation = $meteor.object(Navigations, {_id: '2'}, false).subscribe('navigations');
                    }
                    sAlert.warning('Chưa có profile');
                }
                $timeout(function () {
                    $(document).ready(function () {
                        $('.collapsible').collapsible({
                            accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });
                        if ($rootScope.template.components) {
                            $('md-ink-bar').attr('class', $rootScope.template.components.topIcon);
                        }
                    });
                }, 1000);
                $scope.user = Meteor.user();
            } else {
                Meteor.logout();
                console.log('logout');
            }
            Session.set("MeteorToys_display", true);
        };
        $scope.onLoad();

        $scope.ToggleNotification = function() {
            $mdSidenav('notification').toggle();
        };

        $scope.ToggleChatRoom = function() {
            $mdSidenav('chat-room').toggle();
        };

        $scope.Go = function (route, params) {
            if (route) {
                $state.go(route, params);
            }
        };
        $scope.ChangeLanguage = function (lang) {
            $translate.use(lang);
        };
        $scope.ChangeModeScreen = function(){
            if(!$rootScope.classMode){
                $(".button-collapse").sideNav('hide');
            }
            $rootScope.classMode = !$rootScope.classMode;
        };
        $scope.ChangeTabMode = function(){
            $rootScope.tabMode = !$rootScope.tabMode;
        };
        $scope.ChangePassword = function(){
            Tab.CreateTab('sys.form.users.changePassword', 'userDetail', '', {userId:Meteor.user()._id});
        };
        $scope.ChangeProfile = function (profile) {
            console.log('change profile');
            Roles.removeUsersFromRoles($scope.user._id, $meteor.object(Profiles, $scope.currentProfile.profile.id).roles, $scope.currentProfile.group.id);
            Meteor.users.update({_id: $scope.user._id}, {$set: {"roles": {}}});
            //add Roles
            Roles.addUsersToRoles($scope.user._id, $meteor.object(Profiles, profile.profile.id).roles, profile.group.id);
            $rootScope.navigation = $meteor.object(Navigations, {_id: profile.navigation.id}, false).subscribe('navigations');
            $rootScope.currentProfile = profile;
            $scope.ReloadMenu();
            Tab.tabs = [];
        };
        $scope.Logout = function () {
            $meteor.logout().then(function() {
                console.log('Logout success');
                Tab.tabs = [];
                if ($state.get('login')) {
                    $state.go('login');
                } else {
                    $state.go('default');
                }
            }, function (err) {
                console.log('logout error - ', err);
            });
        };
        $(window).resize(function () {
            $rootScope.widthScreen = window.innerWidth;
            $rootScope.heightScreen = window.innerHeight;
            $('#slide-out').width(260);
            console.log('width:' + $rootScope.widthScreen, 'height:' + $rootScope.heightScreen);
        });
        $scope.ReloadMenu = function () {
            $timeout(function () {
                $(document).ready(function () {
                    $('.collapsible').collapsible({
                        accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    });
                    if ($rootScope.template.components) {
                        $('md-ink-bar').attr('class', $rootScope.template.components.topIcon);
                    }
                });
            }, 500);
        };

        /*========== CHAT ==========*/
        $scope.chatTabs = [];
        $scope.chat = [];

        $scope.ScrollBottom =function(id) {
            var element = document.getElementById(id);
            if (element.scrollHeight > element.clientHeight) {
                element.scrollTop = element.scrollHeight - element.clientHeight;
            }
        };

        $scope.CreateChatTab = function(user) {
            if(!__.find($scope.chatTabs, {_id: user._id})) {
                $scope.chatTabs.push(user);
            } else {
                return;
            }
        };

        $scope.RemoveChatTab = function(index) {
            $scope.chatTabs.splice(index, 1);
        };

        $scope.FilterUser = function(user) {
            if(Meteor.user()) {
                if(user._id !== Meteor.user()._id) {
                    return user;
                }
            }
        };

        $scope.FilterChat = function(user) {
            if(Meteor.user()) {
                return function(ch) {
                    if((ch.from == Meteor.user().username && ch.to == user.username) || (ch.from == user.username && ch.to == Meteor.user().username)) {
                        return ch;
                    }
                }
            }
        };

        $scope.Send = function(chat, id, index) {
            if(chat.comment !== '') {
                if(id == 'public') {
                    chat.type = 'public';
                    chat.from = Meteor.user().username;
                    chat.fromId = Meteor.user()._id;
                    chat.to = 'all';
                    chat.time = moment().valueOf();
                    $scope.chats.save(chat).then(function() {
                        $scope.chat[-1] = {};
                        $scope.ScrollBottom('chat-box-public');
                    });
                } else {
                    chat.type = 'private';
                    chat.from = Meteor.user().username;
                    chat.fromId = Meteor.user()._id;
                    chat.to = id.username;
                    chat.toId = id._id;
                    chat.time = moment().valueOf();
                    $scope.chats.save(chat).then(function() {
                        $scope.chat[index] = {};
                        $scope.ScrollBottom('chat-box-private');
                    });
                }
            }
        };

        $scope.$watchCollection('chats', function(newValue, oldValue) {
            if(newValue !== oldValue) {
                if(newValue[newValue.length-1].type == 'public') {
                    if(!$mdSidenav('chat-room').isOpen()) {
                        if(Meteor.user()) {
                            if(newValue[newValue.length-1].fromId !== Meteor.user()._id) {
                                sAlert.audio.play();
                                sAlert.warning('Có tin nhắn từ ' + newValue[newValue.length - 1].from);
                            }
                        }
                    }
                } else {
                    if(Meteor.user()) {
                        if(newValue[newValue.length-1].toId == Meteor.user()._id) {
                            if($mdSidenav('chat-room').isOpen()) {
                                if(!__.find($scope.chatTabs, {_id: newValue[newValue.length-1].fromId})) {
                                    $scope.chatTabs.push($scope.$meteorObject(Meteor.users, newValue[newValue.length-1].fromId, false));
                                } else {
                                    return;
                                }
                            } else {
                                sAlert.audio.play();
                                var notify = 'Bạn có tin nhắn từ ' + newValue[newValue.length-1].from;
                                sAlert.warning(notify);
                            }
                        }
                    }
                }
            }
        });

    });
