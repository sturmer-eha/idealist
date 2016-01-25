Session.set("currSessionId", null);
Session.set("bulletTimeActive", false);

Meteor.startup(function () {
  var gSubSessions = null;
  var gSubIdeas = null;

  Tracker.autorun(function(){
    var isLoggedIn = null != Meteor.userId(); // The reactive source

    if (isLoggedIn) // The reactive source
      gSubSessions = Meteor.subscribe("Sessions");
    else
      if (gSubSessions) {
        gSubSessions.stop(); // Unsubscribe
        gSubSessions = null;
      }
  });

  Tracker.autorun(function(){
    var isLoggedIn = null != Meteor.userId(); // The reactive source

    if (isLoggedIn) // The reactive source
      gSubIdeas = Meteor.subscribe("Ideas", Session.get("currSessionId"));
    else
      if (gSubIdeas) {
        gSubIdeas.stop(); // Unsubscribe
        gSubIdeas = null;
      }
  });
});
