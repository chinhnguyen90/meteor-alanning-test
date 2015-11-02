Chats = new Mongo.Collection('chats');
Chats.allow({
    insert: function () {
        // the user must be logged in, and the document must be owned by the user
        return true;
    },
    update: function () {
        // can only change your own documents
        return true;
    },
    remove: function () {
        // can only remove your own documents
        return true;
    }
});
Meteor.methods({
    DeleteChat: function (chatId) {
        if (!Chats.findOne(chatId)) {
            throw new Meteor.Error(404, "No such chat");
        } else {
            Chats.remove(chatId);
        }
        return;
    }
});
