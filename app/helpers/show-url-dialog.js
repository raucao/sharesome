import $ from 'jquery';
import { helper } from '@ember/component/helper';
import { run } from '@ember/runloop';
import { copyToClipboard } from 'sharesome/helpers/copy-to-clipboard';

export function showUrlDialog(url) {
  window.vex.dialog.alert(
    `Direct URL:
     <p><input type="text" value="${url}"></p>
     <p class="actions"><button class="icon copy-url" title="copy to clipboard"><img src="/assets/images/copy.svg" alt="copy"></button></p>`
  );
  $('.vex-content input').first().select();

  $('.vex-content button.copy-url').on('click', (e) => {
    run(() => {
      e.preventDefault();
      copyToClipboard($('.vex-content input').val());
      $('.vex-content button.copy-url img')
           .attr('src', '/assets/images/checkmark.svg');
      setTimeout(() => {
        window.vex.closeAll();
      }, 1000);
    })
  });
}

export default helper(showUrlDialog);
