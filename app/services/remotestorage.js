import Ember from 'ember';
import RemoteStorage from 'npm:remotestoragejs';
import Widget from 'npm:remotestorage-widget';
import Shares from 'npm:remotestorage-module-shares';

export default Ember.Service.extend({

  rs: null, // remoteStorage instance
  connected: false,
  connecting: false,

  setup: function() {
    let remoteStorage = new RemoteStorage({
      cache: false,
      requestTimeout: 90000,
      modules: [Shares.default]
    });

    remoteStorage.access.claim('shares', 'rw');

    new Widget(remoteStorage, {
      redirectUri: window.location.href
    });

    remoteStorage.on('ready', () => {
      console.log('RS ready');
      this.setProperties({
        'connecting': false,
        'connected': true
      });
    });
    remoteStorage.on('not-connected', () => {
      console.log('RS not-connected');
      this.setProperties({
        'connecting': false,
        'connected': false
      });
    });
    remoteStorage.on('connected', () => {
      console.log('RS connected');
      this.setProperties({
        'connecting': false,
        'connected': true
      });
    });
    remoteStorage.on('disconnected', () => {
      console.log('RS disconnected');
      this.setProperties({
        'connecting': false,
        'connected': false
      });
    });
    remoteStorage.on('connecting', () => {
      console.log('RS connecting');
      this.setProperties({
        'connecting': true,
        'connected': false
      });
    });
    remoteStorage.on('authing', () => {
      console.log('RS authing');
      this.setProperties({
        'connecting': true,
        'connected': false
      });
    });

    this.set('rs', remoteStorage);
  }.on('init')

});
