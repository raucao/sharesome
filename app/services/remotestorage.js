import Service from '@ember/service';
import RemoteStorage from 'npm:remotestoragejs';
import Widget from 'npm:remotestorage-widget';
import Shares from 'npm:remotestorage-module-shares';

export default Service.extend({

  rs: null, // remoteStorage instance
  shares: null,
  widget: null,
  connected: false,
  connecting: false,

  setup: function() {
    let remoteStorage = new RemoteStorage({
      cache: false,
      requestTimeout: 90000,
      modules: [Shares.default]
    });

    remoteStorage.access.claim('shares', 'rw');

    remoteStorage.on('ready', () => {
      console.debug('RS ready');
      this.setProperties({
        'connecting': false,
        'connected': true
      });
    });
    remoteStorage.on('not-connected', () => {
      console.debug('RS not-connected');
      this.setProperties({
        'connecting': false,
        'connected': false
      });
    });
    remoteStorage.on('connected', () => {
      console.debug('RS connected');
      this.setProperties({
        'connecting': false,
        'connected': true
      });
    });
    remoteStorage.on('disconnected', () => {
      console.debug('RS disconnected');
      this.setProperties({
        'connecting': false,
        'connected': false
      });
    });
    remoteStorage.on('connecting', () => {
      console.debug('RS connecting');
      this.setProperties({
        'connecting': true,
        'connected': false
      });
    });
    remoteStorage.on('authing', () => {
      console.debug('RS authing');
      this.setProperties({
        'connecting': true,
        'connected': false
      });
    });

    this.set('rs', remoteStorage);
    this.set('shares', remoteStorage.shares);

    let widget = new Widget(remoteStorage, {
      redirectUri: window.location.href
    });

    widget.attach();

    this.set('widget', widget);
  }.on('init')

});
