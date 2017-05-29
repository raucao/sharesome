import Ember from 'ember';

const {
  computed: {
    alias
  },
  inject: {
    service
  }
} = Ember;

export default Ember.Route.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),
  rsConnected: alias('remotestorage.connected'),

  beforeModel() {
    if (!this.get('rsConnected')) {
      this.transitionTo('index');
    }
  },

  model() {
    return this.get('rs').shares.list().then((listing) => {
      let filenames = Object.keys(listing);
      let shares = [];

      filenames.forEach((filename) => {
        let item = Ember.Object.create({
          name: filename,
          url: this.get('rs').shares.getFileURL(filename),
          isDeleting: false
        });
        shares.pushObject(item);
      });

      return shares;
    });
  }

});
