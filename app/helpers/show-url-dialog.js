import { helper } from '@ember/component/helper';
import { run } from '@ember/runloop';
import { copyToClipboard } from 'sharesome/helpers/copy-to-clipboard';

export function showUrlDialog(url) {
  window.vex.dialog.alert({
    unsafeMessage: `Direct URL:
     <p><input type="text" value="${url}"></p>
     <p class="actions"><button class="icon copy-url" title="copy to clipboard"><img src="/assets/images/copy.svg" alt="copy"></button></p>`
  });

  const input = document.querySelector('.vex-content input');
  if (input) {
    input.select();
  }

  const copyButton = document.querySelector('.vex-content button.copy-url');
  if (copyButton) {
    copyButton.addEventListener('click', (e) => {
      run(() => {
        e.preventDefault();
        const value = input ? input.value : '';
        copyToClipboard(value);
        const img = copyButton.querySelector('img');
        if (img) {
          img.setAttribute('src', '/assets/images/checkmark.svg');
        }
        setTimeout(() => {
          window.vex.closeAll();
        }, 1000);
      });
    });
  }
}

export default helper(showUrlDialog);