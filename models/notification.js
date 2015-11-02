Notifications = new Mongo.Collection('notifications');
Notifications.allow({
    insert: function (userId, doc) {
        console.log(doc);
        return true;
    },
    update: function (userId, doc) {
        console.log(doc);
        return true;
    },
    remove: function () {
        return true;
    }
});
Meteor.methods({
    DeleteNotification: function (notiId) {
        if (!Notifications.findOne(notiId)) {
            throw new Meteor.Error(404, "No such notification");
        } else {
            Notifications.remove(notiId);
        }
        return;
    }
});
