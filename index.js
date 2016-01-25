export default Ember.Route.extend({
  renderTemplate: function() {
    this.render('upload', {
      controller: 'upload'
    });
  }
});
