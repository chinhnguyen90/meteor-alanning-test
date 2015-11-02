Meteor.publish('allUsers', function () {
    return Meteor.users.find({});
});

Meteor.users.allow({
    insert: function(userId, doc){
        return true;
    },
    remove:function(userId, document) {
        if(document._id == userId){
            return false
        } else {
            return true
        }
    },
    update:function(userId, doc, fieldNames, modifier) {
        return true
    }
});
Meteor.methods({
    createUserPassword: function (user) {
        Accounts.createUser(user);
    },
    modifyChangePassword: function(user){
        Accounts.setPassword(user._id, user.password, {logout:false});
    }
});
Meteor.startup(function () {
    if (Meteor.users.find({}).count() === 0) {
        Meteor.users.insert({
            _id: '0',
            username: 'admin',
            emails: [
                {
                    address: 'pthuan92@gmail.com',
                    verified: false
                }
            ],
            profile:{
                permissions: []
            }
        });
        Accounts.setPassword('0', '12345678');
    }
});