import EmberObject from '@ember/object';
import Route from '@ember/routing/route';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Route.extend({

  router: service(),
  remotestorage: service(),
  rs: alias('remotestorage.rs'),
  rsConnected: alias('remotestorage.connected'),

  beforeModel() {
    if (!this.rsConnected) {
      this.router.transitionTo('index');
    }
  },

  async model() {
    let listing = await this.rs.shares.list();
    let filenames = Object.keys(listing);

    let promises = filenames.map(async (filename) => {
      let url = await this.rs.shares.getFileURL(filename);
      return EmberObject.create({
        name: filename,
        url: url,
        isDeleting: false
      });
    });

    let sharesArray = await Promise.all(promises);
    return A(sharesArray);
  }

});