// Server-only methods (no latency compensation)

Meteor.methods({
  // Admin-only methods
  archiveCurrentSession: function(sessionName) {
    this.unblock();

    if (!this.userId)
      return throwError("Not logged in");

    if (!Meteor.users.findOne(this.userId).admin)
      return throwError("Admin right required");

    if (Ideas.find({ sessionId: null }).count() == 0)
      return throwError("No ideas to archive");

    var obj = { timestamp: new Date() };

    if ("string" == typeof sessionName )
      if ("" != sessionName.trim())
        obj.name = sessionName;

    var newSessionId = Sessions.insert(obj);

    Ideas.update({ sessionId: undefined },
      { $set: { sessionId: newSessionId } }, { multi: true });

    return newSessionId;
  },

  userCreateFirst: function(login, password) {
    if (Meteor.users.findOne())
      return throwError("Not the first user");

    var account = Accounts.createUser({
      username: login,
      password: password
    });

    if (account)
      Meteor.users.update({_id: account}, {$set: {admin: true}});
  },

  userAdd: function(login, password, admin) {
    if (!Meteor.users.findOne(this.userId).admin)
      return throwError("Admin right required");

    var account = Accounts.createUser({
      username: login,
      password: password
    });

    if (admin && account)
      Meteor.users.update({_id: account}, {$set: {admin: true}});

    return account;
  }
});
