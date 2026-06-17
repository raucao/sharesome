import Controller from '@ember/controller';
import { sort } from '@ember/object/computed';
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
  }

  @action
  removeItem(item) {
    this.model.removeObject(item);
  }
}