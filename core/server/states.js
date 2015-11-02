Meteor.publish("states", function () {
    return States.find();
});
