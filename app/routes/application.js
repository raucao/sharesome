import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {

  storage: service('remotestorage'),

  beforeModel () {
    this.get('storage.rs').on('error', (error) => {
      console.debug('rs.on error', error);
      if (error.name === 'Unauthorized') {
        this.handleUnauthorized();
      } else if (error.name === 'DiscoveryError') {
        // Do nothing, because the widget will handle it
      } else {
        alert('An unknown error occured. Please check the browser console for details.');
      }
    });
  },

  // We need to handle this here, so we can transitionTo
  // the connect route
  handleUnauthorized () {
    // Ignore additional unauthorized events after the
    // first one
    if (this.get('storage.unauthorized')) { return; }

    this.get('storage').setProperties({
      unauthorized: true,
      connecting: false,
      connected: false
    });

    this.transitionTo('connect');
  }

});
