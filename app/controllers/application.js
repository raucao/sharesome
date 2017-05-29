import Ember from 'ember';

const {
  computed: { alias },
  inject: { service }
} = Ember;

export default Ember.Controller.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),

});
