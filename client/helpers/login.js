Template.loginTemplate.events({
  'submit form': function (event, instance) {
    event.preventDefault();

    Meteor.loginWithPassword(event.currentTarget.login.value.trim(),
      event.currentTarget.password.value.trim());
  }
});
