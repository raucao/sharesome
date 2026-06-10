import Application from 'sharesome/app';
import config from 'sharesome/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start as qunitStart } from 'ember-qunit';

// Eagerly load all application files during tests so they are registered in the loader registry
import.meta.glob('../app/**/*.{js,ts}', { eager: true });

export function start() {
  setApplication(Application.create(config.APP));

  window.vex = { defaultOptions: {} };
  window.RemoteStorage = {
    WireClient: {},
    log: () => { return true; }
  };
  window.remoteStorage = {};

  qunitStart();
}