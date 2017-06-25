import Ember from 'ember';

export default Ember.Controller.extend({

  sortProperties: ['name:desc'],
  queryParams: ['q'],
  q: '',
  sortedModel: Ember.computed.sort('model', 'sortProperties'),
  filteredModel: Ember.computed.filter('sortedModel', function(item, index, array) {
    return item.name.toLowerCase().includes(this.get('q'));
  }).property('q'),
  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      this.get('model').removeObject(item);
    }

  }

});
