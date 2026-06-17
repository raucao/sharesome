import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { showUrlDialog } from 'sharesome/helpers/show-url-dialog';
import { inject as service } from '@ember/service';
import { computed, action } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class HistoryItemComponent extends Component {
  tagName = 'li';
  @service remotestorage;

  overlayIsVisible = false;
  @alias('item.url') url;
  @alias('item.name') name;

  thumbnailUrl = null;
  isIntersected = false;

  @computed('name')
  get isImage() {
    return this.name && this.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  }

  @computed('isIntersected', 'thumbnailUrl')
  get imageStyle() {
    if (this.isIntersected && this.thumbnailUrl) {
      let url = this.thumbnailUrl;
      if (url.includes('dropbox.com')) {
        url = url.replace('dl=0', 'raw=1');
      }
      return htmlSafe(`background-image: url('${url}');`);
    }
    return htmlSafe('');
  }

  @computed('name')
  get nameWithoutTimestamp() {
    return this.name.substr(12);
  }

  get isSmallScreen() {
    return window.innerWidth <= 640;
  }

  async didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    if (this.name) {
      try {
        let url = await this.remotestorage.shares.getThumbnailURL(this.name);
        if (!this.isDestroying && !this.isDestroyed) {
          this.set('thumbnailUrl', url);
        }
      } catch (error) {
        console.error('Failed to load thumbnail URL', error);
      }
    }
  }

  didInsertElement() {
    super.didInsertElement(...arguments);
    const imgEl = this.element.querySelector('.image');
    if (imgEl) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.set('isIntersected', true);
            this.observer.disconnect();
          }
        });
      });
      this.observer.observe(imgEl);
    }
  }

  willDestroyElement() {
    if (this.observer) {
      this.observer.disconnect();
    }
    super.willDestroyElement(...arguments);
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
      let url = this.url;
      if (url && url.includes('dropbox.com')) {
        url = url.replace('dl=0', 'raw=1');
      }
      dialogContent = "<img src='"+url+"' class='zoomed'>";
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