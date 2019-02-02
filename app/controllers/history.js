/* global IntersectionObserver */
import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import { computed, observer } from '@ember/object';

export default Controller.extend({

  queryInput: '',

  sortProperties: Object.freeze(['name:desc']),
  sortedModel: sort('filteredModel', 'sortProperties'),

  queryChanged: observer('queryInput', 'model', function() {
    let model = this.model;
    let queryInput = this.queryInput;

    if (queryInput !== '') {
      model = model.filter(i => i.name.toLowerCase().includes(queryInput));
    }

    this.set('filteredModel', model);
  }),

  itemCount: computed('model.[]', function() {
    return this.model.length;
  }),

  init() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'lazyLoadImages');
  },

  lazyLoadImages() {
    const preloadImage = function(img) {
      const src = img.getAttribute('data-src');
      if (!src) { return; }
      img.style = `background-image:url('${src}');`;
    };

    const config = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    let observer = new IntersectionObserver(function (entries, self) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);

    this.set('imagesIntersectionObserver', observer);
  },

  actions: {

    removeItem(item) {
      this.model.removeObject(item);
    }

  }

});
