import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'input',
  attributeBindings: ['type', 'accept', 'multiple', 'disabled'],
  type: 'file',
  accept: 'image/*',
  multiple: false,

  attachment: null,
  filename: null,
  disabled: null,
  maxFileSize: null,

  change: function(event) {
    let input = event.target;
    if (!Ember.isPresent(input.files)) { return; }

    this.sendAction('readInputFile', input.files[0]);
  }

});
