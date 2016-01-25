import Ember from 'ember';

export default Ember.TextField.extend({

  type: 'file',

  change: function(event) {
    var input = event.target;
    var uploadController = this.get('parentView.controller');

    if (input.files && input.files[0]) {
      uploadController.handleInputFile( input.files[0] );
    }
    this.set('value', null);
  }

});
