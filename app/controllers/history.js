import Ember from 'ember';

export default Ember.Controller.extend({

  sortProperties: ['name:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    removeItem(item) {
      console.log('CALLED FROM CONTROLLER YO');
      this.get('model').removeObject(item);
      return true;
    }

  }

});
