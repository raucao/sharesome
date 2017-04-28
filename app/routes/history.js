/* global Blazy */
import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel() {
    if (!this.rs.connected) {
      this.transitionTo('index');
    }
  },

  model() {
    return remoteStorage.shares.list().then((listing) => {
      let filenames = Object.keys(listing);
      let shares = [];

      filenames.forEach((filename) => {
        let item = Ember.Object.create({
          name: filename,
          url: remoteStorage.shares.getFileURL(filename),
          isDeleting: false
        });
        shares.pushObject(item);
      });

      return shares;
    });
  },

  setupController() {
    this._super(...arguments);

    Ember.run.scheduleOnce('afterRender', function() {
      new Blazy(); // initialize image lazy loading library
    });
  }

});
