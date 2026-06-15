import { isPresent } from '@ember/utils';
import Component from '@ember/component';

export default class FileInputComponent extends Component {
  tagName = 'input';
  attributeBindings = ['type', 'multiple', 'disabled'];
  type = 'file';
  multiple = false;

  attachment = null;
  filename = null;
  disabled = null;
  maxFileSize = null;

  change(event) {
    let input = event.target;
    if (!isPresent(input.files)) { return; }

    this.readInputFile(input.files[0]);
  }
}