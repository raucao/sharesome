import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

window.vex = { defaultOptions: {} };
window.RemoteStorage = {
  WireClient: {},
  log: () => { return true; }
};
window.remoteStorage = {};
