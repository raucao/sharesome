import { not } from '@ember/object/computed';
import Service from '@ember/service';
import { scheduleOnce } from '@ember/runloop';
import RemoteStorage from 'remotestoragejs';
import Widget from 'remotestorage-widget';
import Shares from 'remotestorage-module-shares';

export default Service.extend({

  rs: null, // remoteStorage instance
  shares: null,
  widget: null,
  connected: false,
  connecting: true,
  unauthorized: false,
  disconnected: not('connected'),

  init () {
    let remoteStorage = new RemoteStorage({
      cache: false,
      requestTimeout: 90000,
      modules: [Shares]
    });

    remoteStorage.access.claim('shares', 'rw');

    remoteStorage.setApiKeys({
      dropbox: '5cydb14w9641auf',
      // googledrive: 'your-client-id'
    });

    remoteStorage.on('ready', () => {
      console.debug('RS ready');
      // this.setProperties({
      //   'connecting': false,
      //   'connected': false
      // });
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
      // skipInitial: true
    });

    const attachWidget = () => {
      if (document.getElementById('rs-widget-container')) {
        widget.attach('rs-widget-container');
      } else {
        setTimeout(attachWidget, 50);
      }
    };

    scheduleOnce('afterRender', attachWidget);

    this.set('widget', widget);

    this._super();
  }

});
