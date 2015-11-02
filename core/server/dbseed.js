Meteor.startup(function () {
    // States
    var states = [
        // System
        { name: 'default', state: {url: '/login',templateUrl: 'core/client/views/login.ng.html',controller: 'LoginCtrl'} },
        { name: 'users', state: {url: '/users/:tabId',templateUrl: 'core/client/views/users.ng.html',controller: 'UserCtrl', ncyBreadcrumb: {label: 'sys.tabNames.users'}} },
        { name: 'userDetail', state: {url: '/userDetail/:tabId/:userId',templateUrl: 'core/client/views/user_form.ng.html',controller: 'UserFormCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'users({tabId:"parentBC"})'}} },
        { name: 'userProfile', state: {url: '/userProfile/:tabId/:userId/:profileNum',templateUrl: 'core/client/views/user_profile.ng.html',controller: 'UserProfileCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'users({tabId:"parentBC"})'}} },
        { name: 'groups', state: {url: '/groups/:tabId',templateUrl: 'core/client/views/groups.ng.html',controller: 'GroupCtrl', ncyBreadcrumb: {label: 'sys.tabNames.groups'}} },
        { name: 'profiles', state: {url: '/profiles/:tabId',templateUrl: 'core/client/views/profiles.ng.html',controller: 'ProfileCtrl', ncyBreadcrumb: {label: 'sys.tabNames.profiles'}} },
        { name: 'profileDetail', state: {url: '/profiles/:tabId/:profileId',templateUrl: 'core/client/views/profile_form.ng.html',controller: 'ProfileFormCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'profiles({tabId:"parentBC"})'}} },
        { name: 'members', state: {url: '/members/:tabId',templateUrl: 'core/client/views/members.ng.html',controller: 'MemberCtrl', ncyBreadcrumb: {label: 'sys.tabNames.members'}} },
        { name: 'memberForm', state: {url: '/memberForm/:tabId',templateUrl: 'core/client/views/member_form.ng.html',controller: 'MemberFormCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'members({tabId:"parentBC"})'}} },
        { name: 'templates', state: {url: '/templates/:tabId',templateUrl: 'core/client/views/template.ng.html',controller: 'TemplateCtrl', ncyBreadcrumb: {label: 'sys.tabNames.templates'}} },
        { name: 'templateForm', state: {url: '/templateForm/:tabId/:id',templateUrl: 'core/client/views/template_form.ng.html',controller: 'TemplateFormCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'templates({tabId:"parentBC"})'}} },
        { name: 'navigations', state: {url: '/navigations/:tabId',templateUrl: 'core/client/views/navigations.ng.html',controller: 'NavigationCtrl', ncyBreadcrumb: {label: 'sys.tabNames.navigations'}} },
        { name: 'navigationForm', state: {url: '/navigations/:tabId/:navId',templateUrl: 'core/client/views/navigation_form.ng.html',controller: 'NavigationFormCtrl', ncyBreadcrumb: {label: '{{breadcrumb}}', parent:'navigations({tabId:"parentBC"})'}} }
    ];
    states.forEach(function(item, key){
        States.upsert({_id: key.toString()}, item);
    });

    // Navigation
    var nav = [
        {
            name: 'default',
            nav: []
        },
        {
            name: 'repo',
            defaultTab: { name: 'dashboard', displayName: 'Dashboard', state: 'dashboard', icon: '' },
            nav: [
                { name: 'dashboard', displayName: 'Dashboard', state: 'dashboard', icon: '' },
                {
                    name: 'setup&customize',
                    displayName: 'Setup & Customize',
                    sub: [
                        { name: 'users', displayName: 'Users', state: 'users', icon: '' },
                        { name: 'groups', displayName: 'Groups', state: 'groups', icon: '' },
                        { name: 'members', displayName: 'Members', state: 'members', icon: '' },
                        { name: 'profiles', displayName: 'Profiles', state: 'profiles', icon: '' },
                        { name: 'navigations', displayName: 'Menu', state: 'navigations', icon: '' },
                        { name: 'templates', displayName: 'Templates', state: 'templates', icon: '' }
                    ],
                    icon: ''
                }
            ]
        }
    ];
    nav.forEach(function(item, key){
        Navigations.upsert({_id: key.toString()}, item);
    });

    Roles.deleteRole('admin');
    Roles.createRole('admin');
});
