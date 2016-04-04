// A bunch of global idealistic functions shared
// between the server and the client

throwError = function(errorMessage) {
  if (Meteor.isClient)
    console.error(errorMessage);
  else
    throw new Meteor.Error(errorMessage);

  return false;
};
