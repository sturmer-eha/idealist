MiniIdeas = new Mongo.Collection(null);

Session.setDefault("currSessionId", null);
Session.setDefault("bulletTimeActive", false);
Session.setDefault("noUsers", false);

Meteor.call("dontHaveAnyUsers", function (error, result) {
  Session.set("noUsers", result);
});

Meteor.subscribe("Me");

Meteor.startup(function () {
  var gSubSessions = null;
  var gSubIdeas = null;

  Meteor.autorun(function () {
    if ( Session.get("bulletTimeActive") )
      return;

    MiniIdeas.remove({});
    Ideas.find().forEach(function (idea) {
      MiniIdeas.insert(idea);
    });
  });

  Meteor.autorun(function () {
    var isLoggedIn = null != Meteor.userId();

    if ( isLoggedIn ) // The reactive source
      gSubSessions = Meteor.subscribe("Sessions");
    else
      if ( gSubSessions ) {
        gSubSessions.stop(); // Unsubscribe
        gSubSessions = null;
      }
  });

  Meteor.autorun(function () {
    var isLoggedIn = null != Meteor.userId();

    if ( isLoggedIn ) // The reactive source
      gSubIdeas = Meteor.subscribe("Ideas", Session.get("currSessionId"));
    else
      if ( gSubIdeas ) {
        gSubIdeas.stop(); // Unsubscribe
        gSubIdeas = null;
      }
  });
});
