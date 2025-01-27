Template.header.helpers({
  brandLink() {
    let login = FlowRouter.path('login'),
      index = FlowRouter.path('index');
    return !Meteor.loggingIn() && !Meteor.userId() ? login : index;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout((error) => {
      if (error) {
        Bert.alert(error.reason, 'warning', 'fixed-bottom');
      } else {
        Bert.alert('Logged out!', 'success', 'fixed-bottom');
      }
    });
  }
});

Template.header.onCreated(function () {
});
