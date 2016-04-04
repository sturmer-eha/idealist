// Latency compensated methods

Meteor.methods({
  proposeNewIdea: function (name) {
    this.unblock();

    check(name, String);

    if ( !Meteor.userId() )
      throw new Meteor.Error("Not logged in");

    // Trim it
    name = name.trim().substring(0, 255);

    if ( !name )
      throw new Meteor.Error("Good ideas can't be empty");

    // No duplicates
    var regexp = new RegExp(name, 'i');
    if ( Ideas.findOne({sessionId: null, name: regexp}) )
      throw new Meteor.Error("Already been proposed");

    var now = Meteor.isServer ? new Date() : null;

    return Ideas.insert({
              name: name, // never changes
              timestamp: now, // never changes
              score: 1, // it's like special olympics
              voters: [] // anonymous, remember?
            });
  },

  promoteIdea: function(ideaId, plusOne) {
    this.unblock();

    var userId = Meteor.userId();

    if (!userId)
      return throwError("Not logged in");

    if (typeof ideaId != "string" || Ideas.findOne(ideaId) == undefined)
      return throwError("Idea not found");

    // check whether the current user has already voted for this idea or not
    if (Ideas.findOne({_id: ideaId, voters: userId}))
      return throwError("You have already voted for this idea!");

    // TODO: add a random 1-5 sec delay between adding userId to voters and
    //       the actual voting to increase the anonymity (use Fibers)

    return Ideas.update({ _id: ideaId, voters: { $ne: userId } },
      { $inc: { score: plusOne ? 1 : 0 }, $push: { voters: userId } }
    );
  }
});
