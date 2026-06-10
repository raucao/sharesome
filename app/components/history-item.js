import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';

export default class HistoryItemComponent extends Component {
  tagName = 'li';
  @service remotestorage;

  overlayIsVisible = false;
  @alias('item.url') url;
  @alias('item.name') name;

  @computed('url')
  get isImage() {
    return this.url.match(/(jpg|jpeg|png|gif|webp)$/i);
  }

  @computed('name')
  get thumbnailUrl() {
    return this.remotestorage.shares.getThumbnailURL(this.name);
  }

  @computed('name')
  get nameWithoutTimestamp() {
    return this.name.substr(12);
  }

  get isSmallScreen() {
    return window.innerWidth <= 640;
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    const imgEl = this.element.querySelector('.image');
    if (imgEl) {
      this.imagesObserver.observe(imgEl);
    }
  }

  click() {
    if (this.isSmallScreen) {
      this.toggleProperty('overlayIsVisible');
    }
  }

  @action
  share(e) {
    e.stopPropagation();
    showUrlDialog(this.url);
  }

  @action
  zoom(e) {
    e.stopPropagation();
    let dialogContent;

    if (this.isImage) {
      dialogContent = "<img src='"+this.url+"' class='zoomed'>";
    } else {
      dialogContent = "No preview available.";
    }

    window.vex.dialog.alert({ unsafeMessage: dialogContent });
  }

  @action
  remove(e) {
    e.stopPropagation();
    this.set('item.isDeleting', true);

    this.remotestorage.shares.remove(this.name).then(
      () => {
        this.removeItem(this.item);
      },
      error => {
        this.set('item.isDeleting', false);
        window.alert("Couldn't remove item. Please try again. Sorry!");
        console.log(error);
      }
    );
  }
}