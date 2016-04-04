// Server-only methods (no latency compensation)

'use strict';

Meteor.methods({

  ////////////////////////
  // Admin-only methods //
  ////////////////////////

  archiveCurrentSession: function (sessionName) {
    this.unblock();

    if ( !this.userId )
      return throwError("Not logged in");

    if ( !Meteor.users.findOne(this.userId).admin )
      return throwError("Admin rights required");

    if ( Ideas.find({ sessionId: null }).count() === 0 )
      return throwError("No ideas to archive");

    var obj = { timestamp: new Date() };

    if ( typeof sessionName === "string" )
      if ( sessionName.trim() !== "" )
        obj.name = sessionName;

    var newSessionId = Sessions.insert(obj);

    Ideas.update({ sessionId: undefined },
      { $set: { sessionId: newSessionId } }, { multi: true });

    return newSessionId;
  },

  userAdd: function (login, password, admin) {
    this.unblock();

    check(login, String);
    check(password, String);

    if ( !Meteor.users.findOne(this.userId).admin )
      return throwError("Admin right required");

    var account = Accounts.createUser({
      username: login,
      password: password
    });

    if ( account && admin )
      Meteor.users.update({ _id: account }, { $set: { admin: true } });

    return account;
  },

  ////////////////////////////////////
  // Methods for unauthorized users //
  ////////////////////////////////////

  dontHaveAnyUsers: function () {
    return Meteor.users.find().count() === 0;
  },

  userCreateFirst: function (login, password) {
    check(login, String);
    check(password, String);

    if ( Meteor.users.findOne() )
      return throwError("Not the first user");

    var account = Accounts.createUser({
      username: login,
      password: password
    });

    if ( account )
      Meteor.users.update({ _id: account }, { $set: { admin: true } });

    return Boolean(account);
  }

});
