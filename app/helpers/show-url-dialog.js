import Ember from 'ember';
import { copyToClipboard } from 'sharesome/helpers/copy-to-clipboard';

export function showUrlDialog(url) {
  window.vex.dialog.alert(
    `Direct URL:
     <p><input type="text" value="${url}"></p>
     <p class="actions"><button class="icon copy-url" title="copy to clipboard"><img src="/assets/images/copy.svg" alt="copy"></button></p>`
  );
  Ember.$('.vex-content input').first().select();

  Ember.$('.vex-content button.copy-url').on('click', (e) => {
    e.preventDefault();
    copyToClipboard(Ember.$('.vex-content input').val());
    Ember.$('.vex-content button.copy-url img')
         .attr('src', '/assets/images/checkmark.svg');
    setTimeout(() => {
      window.vex.closeAll();
    }, 1000);
  });
}

export default Ember.Helper.helper(showUrlDialog);
