import Ember from 'ember';

export default Ember.Service.extend({

  connected: false,
  connecting: false,

  setup: function() {
    RemoteStorage.WireClient.REQUEST_TIMEOUT = 90000;

    remoteStorage.access.claim('shares', 'rw');
    remoteStorage.displayWidget({ redirectUri: window.location.href });

    remoteStorage.on('ready', () => {
      console.log('RS ready');
      this.set('connecting', false);
      this.set('connected', true);
    });
    remoteStorage.on('not-connected', () => {
      console.log('RS not-connected');
      this.set('connecting', false);
      this.set('connected', false);
    });
    remoteStorage.on('connected', () => {
      console.log('RS connected');
      this.set('connecting', false);
      this.set('connected', true);
    });
    remoteStorage.on('disconnected', () => {
      console.log('RS disconnected');
      this.set('connecting', false);
      this.set('connected', false);
    });
    remoteStorage.on('connecting', () => {
      console.log('RS connecting');
      this.set('connecting', true);
      this.set('connected', false);
    });
    remoteStorage.on('authing', () => {
      console.log('RS authing');
      this.set('connecting', true);
      this.set('connected', false);
    });
  }.on('init')

});
