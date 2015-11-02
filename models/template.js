Templates = new Mongo.Collection('templates');
Templates.allow({
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
    DeleteTemplate: function (templateId) {
        if(Templates.find({}).count() == 1) {
            throw new Meteor.Error(505, "Template only one");
        } else {
            if (!Templates.findOne(templateId)) {
                throw new Meteor.Error(404, "No such template");
            } else {
                Templates.remove(templateId);
            }
        }
        return;
    }
});