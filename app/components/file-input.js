import { isPresent } from '@ember/utils';
import Component from '@ember/component';

export default Component.extend({

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
    if (!isPresent(input.files)) { return; }

    this.readInputFile(input.files[0]);
  }

});
