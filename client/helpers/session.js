Template.sessionTemplate.helpers({
  ideas_count: function(){
    return Ideas.find({ sessionId: Session.get("currSessionId") }).count();
  },
  ideas: function(){
    var bulletTime = Session.get('bulletTimeActive');

    console.log("ideas!")

    return Ideas.find({ sessionId: Session.get("currSessionId") },
            { sort: { score: -1, timestamp: -1 }, reactive: false }).fetch();
  },
  bulletTime: function(){
    return false;
    // return Session.get('bulletTimeActive');
  }
});

Template.sessionTemplate.events({
  'mouseenter #idea-box': function() {
    console.log('in');
    Session.set('bulletTimeActive', true);
  },
  'mouseleave #idea-box': function() {
    console.log('out');
    Session.set('bulletTimeActive', false);
  }
});


Template.ideaTemplate.helpers({
  canVote: function() {
    var instance = Template.instance();

    return instance.data.voters.indexOf(Meteor.userId()) < 0;
  }
});

Template.ideaTemplate.events({
  'click .plus-1': function(event, instance) {
    var ideaId = this._id;

    Meteor.call('promoteIdea', ideaId, true);
  },
  'click .plus-0': function(event, instance) {
    var ideaId = this._id;

    Meteor.call('promoteIdea', ideaId, false);
  }
});


Template.formTemplate.events({
  'submit form': function(event, instance) {
    event.preventDefault(); // don't actually submit the form
    var idea = event.currentTarget.idea.value.trim();

    Meteor.call("proposeNewIdea", idea, function(error, response){
      if (response) {
        event.currentTarget.idea.value = "";
      }
    });
  }
});
