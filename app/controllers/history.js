import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({

  queryInput: '',

  sortProperties: ['name:desc'],
  sortedModel: sort('filteredModel', 'sortProperties'),

  queryChanged: function() {
    let model = this.get('model');
    let queryInput = this.get('queryInput');

    if (queryInput !== '') {
      model = model.filter(i => i.name.toLowerCase().includes(queryInput));
    }

    this.set('filteredModel', model);
  }.observes('queryInput', 'model'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      this.get('model').removeObject(item);
    }

  }

});
