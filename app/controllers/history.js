import Controller from '@ember/controller';
import { alias, sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),

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
