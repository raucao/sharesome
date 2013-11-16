export default Ember.Route.extend({
  redirect: function() {
    if (!remoteStorage.connected)
      this.transitionTo('index');
  }
});
