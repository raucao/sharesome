var Sharesome = window.Sharesome = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_ACTIVE_GENERATION: true,
  currentPath: '',
  rsConnected: false,
  rsConnecting: false
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
  Sharesome.set('rsConnecting', false);
  Sharesome.set('rsConnected', true );
  Sharesome.advanceReadiness();
});
remoteStorage.on('disconnected', function() {
  Sharesome.set('rsConnecting', false);
  Sharesome.set('rsConnected', false );
});
remoteStorage.on('connecting', function() {
  Sharesome.set('rsConnecting', true);
  Sharesome.set('rsConnected', false );
});
remoteStorage.on('authing', function() {
  Sharesome.set('rsConnecting', true);
  Sharesome.set('rsConnected', false );
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');
require('scripts/helpers/*');
require('scripts/components/*');
