Meteor.publish('Sessions', function(){
  if (this.userId)
    return Sessions.find({}, { limit: 5 });

  return [];
});

Meteor.publish('Ideas', function(sessionId){
  if (!this.userId)
    return [];

  // TODO: check() the ARG

  return Ideas.find({ sessionId: sessionId },
          { sort: { timestamp: -1 } });
});

Meteor.publish('Users', function(){
  if (!this.userId)
    return [];

  // TODO: For admins only

  return Meteor.users.find();
});
