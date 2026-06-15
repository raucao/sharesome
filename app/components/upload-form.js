import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberObject from '@ember/object';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';
import { isPresent } from '@ember/utils';

export default class UploadFormComponent extends Component {
  @service remotestorage;

  @tracked file = null;
  @tracked isUploading = false;

  get rs() {
    return this.remotestorage.rs;
  }

  get hasFileToUpload() {
    return this.file !== null;
  }

  get fileIsImage() {
    return this.file?.type?.match('image.*');
  }

  get simpleFileType() {
    let type = this.file?.type;
    if (type && type !== '') {
      return type.replace('/', '-');
    }
    return "unknown";
  }

  get isSmallScreen() {
    return window.innerWidth <= 640;
  }

  @action
  readInputFile(inputFile) {
    let file = EmberObject.create({
      name: inputFile.name,
      type: inputFile.type,
      size: inputFile.size,
      binary: null,
      base64: null
    });

    this.file = file;

    if (inputFile.type.match('image.*')) {
      let fileReaderBase64 = new FileReader();
      fileReaderBase64.onload = () => {
        this.file.set('base64', fileReaderBase64.result);
      };
      fileReaderBase64.readAsDataURL(inputFile);
    }

    let fileReaderBinary = new FileReader();
    fileReaderBinary.onload = () => {
      this.file.set('binary', fileReaderBinary.result);
    };
    fileReaderBinary.readAsArrayBuffer(inputFile);
  }

  @action
  cancelFileUpload() {
    this.file = null;
  }

  @action
  submitFileUpload() {
    let file = this.file;
    this.isUploading = true;

    const filetype = isPresent(file.get('type')) ? file.get('type') : 'application/octet-stream';

    this.rs.shares.storeFile(filetype, file.get('name'), file.get('binary')).then(url => {
      this.file = null;
      this.isUploading = false;
      showUrlDialog(url);
    }, error => {
      this.isUploading = false;
      window.vex.dialog.alert({ unsafeMessage: 'Something bad happened during upload.<br />Please try again.' });
      console.error(error);
    });
  }
}