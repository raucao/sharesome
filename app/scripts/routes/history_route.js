Sharesome.HistoryRoute = Ember.Route.extend({
  model: function () {
    return remoteStorage.shares.list().then(function(filenames){
      return filenames.map(remoteStorage.shares.getFileURL);
    });
  }
});
