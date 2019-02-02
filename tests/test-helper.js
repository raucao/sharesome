import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

window.vex = { defaultOptions: {} };
window.RemoteStorage = {
  WireClient: {},
  log: () => { return true; }
};
window.remoteStorage = {};

start();
