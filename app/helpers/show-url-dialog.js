import Ember from 'ember';
import { copyToClipboard } from 'sharesome/helpers/copy-to-clipboard';

export function showUrlDialog(url) {
  window.vex.dialog.alert(
    `Direct URL:<p><input type="text" value="${url}"> 
     <button class="copy-url"><img src="" alt="copy">cc</button></p>`
  );
  Ember.$('.vex-content input').first().select();

  Ember.$('.vex-content button.copy-url').on('click', (e) => {
    e.preventDefault();
    copyToClipboard(Ember.$('.vex-content input').val());
    Ember.$('.vex-content button.copy-url').html('&#10003; done');
    setTimeout(() => {
      window.vex.closeAll();
    }, 1000);
  });
}

export default Ember.Helper.helper(showUrlDialog);
