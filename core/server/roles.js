Meteor.publish(null, function (){
    return Meteor.roles.find({});
});
Meteor.roles.allow({
    insert: function(){
        return true;
    },
    remove:function(userId, document) {
        return true;
    },
    update:function(userId, doc, fieldNames, modifier) {
        return true;
    }
});