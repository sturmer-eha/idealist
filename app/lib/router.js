// Idealistic routes

Router.route('/', function() {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    this.redirect('/login');
  } else {
    this.redirect('/session');
  }
});

Router.route('/login', function() {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    this.render('loginTemplate');
  } else {
    this.next();
  }
});

// Accessible to anyone
// Possible to vote and create new ideas here
Router.route('/session', function() {
  Session.set("currSessionId", null);
  var items = Ideas.find({ sessionId: null }).fetch(); // current ideas
  this.render('sessionTemplate', { data: { ideas: items } });
});

// Accessible to anyone
// Not possible to vote or create new ideas here
Router.route('/session/:_id', function() {
  var sessionId = this.params._id;
  var session = Sessions.findOne();

  Session.set("currSessionId", sessionId);

  var items = Ideas.find({ sessionId: sessionId }).fetch();
  this.render('sessionTemplate', { data: { _id: sessionId/*, ideas: items*/ } });
});

Router.route('/admin', function() {
  this.render('adminTemplate');
});

Router.route('/(.*)', function () {
  this.redirect('/');
});

Router.onBeforeAction(function () {
  if (!Meteor.user() && !Meteor.loggingIn()) {
    this.redirect('/login');
  } else {
    // required by Iron to process the route handler
    this.next();
  }
}, {
  except: ['login']
});
