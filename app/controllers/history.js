import Ember from 'ember';

const {
  computed: { alias },
  inject: { service }
} = Ember;

export default Ember.Controller.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),

  sortProperties: ['name:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      this.get('model').removeObject(item);
    }

  }

});
