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
      initializeLazyLoader();
      startSpinner();
    });
  },


});

function initializeLazyLoader() {
  new Blazy({
    success: function(elem) {
      Ember.$(elem).children('.spinner').remove();
    }
  });
}

function startSpinner() {
  let el = Ember.$('.b-lazy');

  el.spin({
    length    : 10,
    width     : 5,
    radius    : 15,
    className : 'spinner',
    top       : '70',
    left      : '70'
  });
}
