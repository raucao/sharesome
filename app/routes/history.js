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
  const el = Ember.$('.b-lazy');
  const options = {
    length    : 20,
    height    : 200,
    width     : 4,
    radius    : 20,
    color     : '#eee',
    className : 'spinner',
    top       : 'auto',
    left      : 'auto'
  };

  // TODO use some method/property (was App.isSmallScreen)
  if (window.innerWidth <= 640) {
    options.height = 120;
    options.width = 3;
  }

  el.spin(options);
}
