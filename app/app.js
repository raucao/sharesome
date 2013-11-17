import Resolver from 'resolver';

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver.default,
  rsConnected: false,
  rsConnecting: false,
  isSmallScreen: function() {
    var result = window.innerWidth <= 640;
    return result;
  }.property()
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});

App.initializer({
  name: 'remoteStorage',
  initialize: function(container, application) {
    RemoteStorage.WireClient.REQUEST_TIMEOUT = 90000;
    remoteStorage.access.claim('shares', 'rw');
    remoteStorage.displayWidget('remotestorage-connect',
                                { redirectUri: window.location.href });

    remoteStorage.on('ready', function() {
      application.set('rsConnecting', false);
      application.set('rsConnected', true );
    });
    remoteStorage.on('disconnected', function() {
      application.set('rsConnecting', false);
      application.set('rsConnected', false );
    });
    remoteStorage.on('connecting', function() {
      application.set('rsConnecting', true);
      application.set('rsConnected', false );
    });
    remoteStorage.on('authing', function() {
      application.set('rsConnecting', true);
      application.set('rsConnected', false );
    });
  }
});

App.initializer({
  name: 'dialogs',
  initialize: function(container, application) {
    window.vex.defaultOptions.className = 'vex-theme-flat-attack';
  }
});

export default App;
