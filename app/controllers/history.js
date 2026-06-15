/* global IntersectionObserver */
import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
import { scheduleOnce } from '@ember/runloop';
import { action } from '@ember/object';

export default class HistoryController extends Controller {
  queryInput = '';
  sortProperties = Object.freeze(['name:desc']);

  @sort('filteredModel', 'sortProperties') sortedModel;

  queryChanged() {
    let model = this.model;
    let queryInput = this.queryInput;

    if (queryInput !== '') {
      model = model.filter(i => i.name.toLowerCase().includes(queryInput));
    }

    this.set('filteredModel', model);
  }

  get itemCount() {
    return this.model.length;
  }

  init() {
    super.init(...arguments);
    this.addObserver('queryInput', this, this.queryChanged);
    this.addObserver('model', this, this.queryChanged);
    scheduleOnce('afterRender', this, 'lazyLoadImages');
  }

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

    let observer = new IntersectionObserver((entries, self) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          preloadImage(entry.target);
          self.unobserve(entry.target);
        }
      });
    }, config);

    this.set('imagesIntersectionObserver', observer);
  }

  @action
  removeItem(item) {
    this.model.removeObject(item);
  }
}