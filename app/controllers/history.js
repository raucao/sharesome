import Ember from 'ember';

export default Ember.Controller.extend({

  sortProperties: ['name:desc'],
  sortedModel: Ember.computed.sort('model', 'sortProperties'),

  itemCount: function() {
    return this.get('model').length;
  }.property('model.[]'),

  actions: {

    zoom: function(url) {
      let dialogContent;
      let isImage = url.match(/(jpg|jpeg|png|gif|webp)$/i);

      if (isImage) {
        dialogContent = "<img src='"+url+"' class='zoomed'>";
      } else {
        dialogContent = "No preview available.";
      }

      window.vex.dialog.alert(dialogContent);
    },

    share: function(url) {
      window.vex.dialog.alert("Direct URL:<p><input type='text' value='"+url+"'>");
      Ember.$('.vex-content input').first().select();
    },

    remove: function(name) {
      let item = this.get('model').findBy('name', name);
      item.set('isDeleting', true);

      remoteStorage.shares.remove(name).then(
        () => this.get('model').removeObject(item),
        error => {
          item.set('isDeleting', false);
          window.alert("Couldn't remove item. Please try again. Sorry!");
          console.log(error);
        }
      );
    }

  }
});
