var HistoryView = Ember.View.extend({

  didInsertElement: function() {
    this.controller.loadItems();
  }

});

export default HistoryView;
