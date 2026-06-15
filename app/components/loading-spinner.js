import Component from '@ember/component';
import { Spinner } from 'spin.js';

export default Component.extend({
  spinner: null,

  didInsertElement() {
    this._super(...arguments);

    const el = this.element.querySelector('.spinner-wrapper');
    if (el) {
      el.style.height = `${this.height}px`;
      el.style.position = 'relative';

      const opts = {
        lines: this.lines || 13,
        length: this.length || 20,
        width: this.width || 10,
        radius: this.radius || 30,
        corners: this.corners || 1,
        rotate: this.rotate || 0,
        direction: this.direction || 1,
        color: this.color || '#000',
        speed: this.speed || 1,
        trail: this.trail || 60,
        shadow: this.shadow || false,
        className: 'spinner',
        zIndex: this.zIndex || 2e9,
        top: this.top || '50%',
        left: this.left || '50%'
      };

      const spinner = new Spinner(opts).spin(el);
      this.set('spinner', spinner);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.spinner) {
      this.spinner.stop();
    }
  }
});