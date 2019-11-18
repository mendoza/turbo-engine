
Meteor.publish('users.all', () => (Meteor.users.find()));