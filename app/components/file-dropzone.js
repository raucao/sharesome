import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['file-dropzone content upload'],
  classNameBindings: ['hasFileToUpload'],

  dragEnter() {
    this.element.classList.add('drag-active');
    return false;
  },

  dragOver() {
    return false;
  },

  dragLeave() {
    this.element.classList.remove('drag-active');
    return false;
  },

  drop(e) {
    e.preventDefault();
    this.element.classList.remove('drag-active');

    if (e.stopPropagation) { e.stopPropagation(); }

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      this.readInputFile(e.dataTransfer.files[0]);
    }
  }
});