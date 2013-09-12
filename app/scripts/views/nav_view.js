Sharesome.NavView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['active'],

  active: function() {
    return Sharesome.get('currentPath') === this.get('path');
  }.property('path')
});
