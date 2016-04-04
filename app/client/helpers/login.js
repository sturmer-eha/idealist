Template.loginTemplate.helpers({
  noUsers: function () {
    return Session.get("noUsers");
  }
});

Template.loginTemplate.events({
  'submit form': function (event, instance) {
    event.preventDefault();

    var login = event.currentTarget.login.value.trim();
    var password = event.currentTarget.password.value.trim();

    if ( Session.get("noUsers") )
      Meteor.call("userCreateFirst", login, password, function (error, response) {
        Meteor.loginWithPassword(login, password);
      });
    else
      Meteor.loginWithPassword(login, password);
  }
});
