import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Route.extend({

  remotestorage: service(),
  rs: alias('remotestorage.rs'),
  rsConnected: alias('remotestorage.connected'),

  beforeModel() {
    if (!this.rsConnected) {
      this.transitionTo('index');
    }
  },

  model() {
    return this.rs.shares.list().then((listing) => {
      let filenames = Object.keys(listing);
      let shares = [];

      filenames.forEach((filename) => {
        let item = EmberObject.create({
          name: filename,
          url: this.rs.shares.getFileURL(filename),
          isDeleting: false
        });
        shares.pushObject(item);
      });

      return shares;
    });
  }

});
