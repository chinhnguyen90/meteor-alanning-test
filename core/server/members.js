Meteor.methods({
    createMember: function (member) {
        //console.log('createMember', member);
        //update group
        if(!member.group.users){
            member.group.users = {};
        }
        if(!member.group.users[member.user._id]){
            member.group.users[member.user._id] = {
                _id: member.user._id,
                username: member.user.username,
                emails: member.user.emails
            };
            Groups.update(
                {_id: member.group._id},
                {$set: {
                    users: member.group.users
                }}
            );
        }
        //update user
        if(!member.user.profile.groups){
            member.user.profile.groups = {};
        }
        if(!member.user.profile.groups[member.group._id]){
            member.user.profile.groups[member.group._id] = {
                _id: member.group._id,
                displayName: member.group.displayName,
                name: member.group.name
            };
            Meteor.users.update(
                {_id: member.user._id},
                {$set: {
                    "profile.groups": member.user.profile.groups
                }}
            );
        }
    },
    deleteMember: function (row) {
        //console.log(row);
        //delete group
        if(Groups.findOne({_id: row.groupId})){
            var group = Groups.findOne({_id: row.groupId});
            if(group.users[row.userId]){
                delete group.users[row.userId];
                Groups.update(
                    {_id: row.groupId},
                    {$set: {
                        users: group.users
                    }}
                );
            }
        }
        //delete user
        if(Meteor.users.findOne({_id: row.userId})){
            var user = Meteor.users.findOne({_id: row.userId});
            if(user.profile.groups[row.groupId]) {
                delete user.profile.groups[row.groupId];
                Meteor.users.update(
                    {_id: row.userId},
                    {
                        $set: {
                            "profile.groups": user.profile.groups
                        }
                    }
                );
            }
        }
    },
    deleteSelectedMember: function (rows) {
        //console.log(rows);
        //delete group
        _.forEach(rows, function(row){
            if(Groups.findOne({_id: row.groupId})){
                var group = Groups.findOne({_id: row.groupId});
                if(group.users[row.userId]) {
                    delete group.users[row.userId];
                    Groups.update(
                        {_id: row.groupId},
                        {
                            $set: {
                                users: group.users
                            }
                        }
                    );
                }
            }
            //delete user
            if(Meteor.users.findOne({_id: row.userId})){
                var user = Meteor.users.findOne({_id: row.userId});
                if(user.profile.groups[row.groupId]) {
                    delete user.profile.groups[row.groupId];
                    Meteor.users.update(
                        {_id: row.userId},
                        {
                            $set: {
                                "profile.groups": user.profile.groups
                            }
                        }
                    );
                }
            }
        });
    }
});