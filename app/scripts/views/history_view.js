Sharesome.HistoryView = Ember.View.extend({
  didInsertElement: function() {
    this.controller.loadItems();
  }
});
