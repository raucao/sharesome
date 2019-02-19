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
    return this.rs.shares.list().then(async (listing) => {
      const filenames = Object.keys(listing);
      const shares = [];

      for (const filename of filenames) {
        const url = await this.rs.shares.getFileURL(filename);

        const item = EmberObject.create({
          name: filename,
          url: url,
          isDeleting: false
        });
        shares.pushObject(item);
      }

      return shares;
    });
  }

});
