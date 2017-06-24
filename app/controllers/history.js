import Ember from 'ember';

export default Ember.Controller.extend({

  queryChanged: function() {
    this.set('filteredModel', this.get('model').filter( item => item.name.toLowerCase().includes(this.get('q'))).sort((a, b) => a <= b ? 1 : -1));
  }.observes('q', 'model'),
  q: '',

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      this.get('model').removeObject(item);
    }

  }

});
