import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';
import { Promise } from 'rsvp';

export default Route.extend({

  storage: service('remotestorage'),

  beforeModel() {
    return this.waitForConnectionState().then(() => {
      if (this.get('storage.connected')) {
        this.transitionTo('index');
      }
    });
  },

  waitForConnectionState() {
    let self = this;

    return new Promise(resolve => {
      function checkConnectingDone() {
        if (self.get('storage.connecting')) {
          later(checkConnectingDone, 20);
        } else {
          resolve();
        }
      }
      checkConnectingDone();
    });
  }

});
