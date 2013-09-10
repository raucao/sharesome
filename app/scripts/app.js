var Sharesome = window.Sharesome = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_ACTIVE_GENERATION: true
});

Ember.RSVP.configure('onerror', function(e) {
  console.log(e.message);
  console.log(e.stack);
});

if (window.location.hash.match(/#access_token=.+/)) {
  Sharesome.deferReadiness();
}

Sharesome.initializer({
  name: 'remoteStorage',
  initialize: function(container, application) {
    remoteStorage.access.claim('shares', 'rw');
    remoteStorage.displayWidget('remotestorage-connect',
                                { redirectUri: window.location.href });
  }
});

remoteStorage.on('ready', function() {
  Sharesome.advanceReadiness();
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/components/*');
