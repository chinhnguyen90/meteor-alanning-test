Meteor.publish('templates', function () {
    return Templates.find({});
});

Meteor.startup(function () {
    if (Templates.find({}).count() === 0) {
        Templates.insert({
            _id: '0',
            name: 'Default',
            mainColor: 'blue',
            components: {
                logo: 'blue lighten-5 black-text',
                topMenu: 'blue darken-1 white-text',
                topIcon: 'green darken-3 white-text',
                leftProfile: 'blue darken-1 white-text',
                toolbarView: 'grey lighten-2 black-text',
                content: 'blue lighten-5 black-text'
            },
            customComponent: [
                { id: 'logo', name: 'Logo', color: 'blue' },
                { id: 'topMenu', name: 'Top menu', color: 'blue' },
                { id: 'topIcon', name: 'Top icon', color: 'green' },
                { id: 'leftProfile', name: 'Left profile', color: 'blue' },
                { id: 'toolbarView', name: 'Toolbar Content', color: 'grey' },
                { id: 'content', name: 'Content', color: 'blue' }
            ],
            isActive: true
        });
    }
});
