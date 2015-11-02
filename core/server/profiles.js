Meteor.publish("profiles", function () {
    return Profiles.find();
});