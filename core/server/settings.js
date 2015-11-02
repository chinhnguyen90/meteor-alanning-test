Meteor.publish("settings", function () {
    //console.log('settings', process.env.S2C);
    return Settings.find({_id: process.env.S2C});
});