Meteor.publish("navigations", function () {
    return Navigations.find();
});

Meteor.startup(function () {
    if (Navigations.find({}).count() === 0) {
        var app = {
            _id: '0',
            name: 'default',
            nav: [
                { name: 'users', displayName: 'Users', state: 'users'},
                { name: 'groups', displayName: 'Groups', state: 'groups'},
                { name: 'members', displayName: 'Members', state: 'members'},
                { name: 'profiles', displayName: 'Profiles', state: 'profiles'},
                { name: 'navigations', displayName: 'Menu', state: 'navigations'},
                { name: 'templates', displayName: 'Templates', state: 'templates'},

                { name: 'dorm_dashboard', displayName: 'Dashboard', state: 'dorm_dashboard'},
                { name: 'dormitory', displayName: 'Domitory Manager', state: 'dormitory'},
                { name: 'permission_dorm', displayName: 'Dorm Permission', state: 'permission_dorm'}
            ]
        };
        Navigations.insert(app);
    }
});
