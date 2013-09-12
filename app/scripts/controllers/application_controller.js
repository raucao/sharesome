Sharesome.ApplicationController = Ember.Controller.extend({
  updateCurrentPath: function() {
    Sharesome.set('currentPath', this.get('currentPath'));
  }.observes('currentPath')
});
