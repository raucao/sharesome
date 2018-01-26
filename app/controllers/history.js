/* global IntersectionObserver */
import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';

export default Controller.extend({

  queryInput: '',

  sortProperties: ['name:desc'],
  sortedModel: sort('filteredModel', 'sortProperties'),

  queryChanged: function() {
    let model = this.get('model');
    let queryInput = this.get('queryInput');

    if (queryInput !== '') {
      model = model.filter(i => i.name.toLowerCase().includes(queryInput));
    }

    this.set('filteredModel', model);
  }.observes('queryInput', 'model'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

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
      this.get('model').removeObject(item);
    }

  }

});
