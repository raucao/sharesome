Sharesome.ConnectedRoute = Ember.Route.extend({
  redirect: function() {
    if (!Sharesome.rsConnected)
      this.transitionTo('index');
  }
});
