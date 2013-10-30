Sharesome.HistoryController = Ember.ArrayController.extend({
  content        : [],
  sortProperties : ['name'],
  sortAscending  : false,

  loadItems: function() {
    this.set('content', []); //TODO this shouldn't be loaded on every insert

    var self = this;
    console.log('loading items');

    remoteStorage.shares.list().then(function(filenames){
      $.each(filenames, function(index, filename) {
        var item = Ember.Object.create({
          name: filename,
          url: remoteStorage.shares.getFileURL(filename)
        });
        self.pushObject(item);
      });
    });
  },

  itemCount: function() {
    return this.get('content').length;
  }.property('content.@each'),

  removeItem: function(propName, value) {
    var obj = this.findProperty(propName, value);
    this.removeObject(obj);
  },

  actions: {

    share: function(url) {
      window.vex.dialog.alert("Direct URL:<p><input type='text' value='"+url+"'>");
    },

    remove: function(name) {
      var self = this;

      remoteStorage.shares.remove(name).then(
        function() {
          self.removeItem('name', name);
        },
        function(e) {
          window.alert("Couldn't remove item. Please try again. Sorry!");
          console.log(e);
        }
      );
    }

  }
});
