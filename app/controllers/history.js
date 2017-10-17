import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';

export default Controller.extend({

  sortProperties: ['name:desc'],
  sortedModel: sort('model', 'sortProperties'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      this.get('model').removeObject(item);
    }

  }

});
