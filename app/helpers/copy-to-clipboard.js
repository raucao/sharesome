import { helper } from '@ember/component/helper';

// Has to be called from within a user action handler, e.g. 'click'
export function copyToClipboard(text) {
  // Create temporary element with input value
  // (has to be visible, so we move it out of view)
  let tmpEl = document.createElement('div');
  Object.assign(tmpEl.style, {
    position: 'absolute',
    left: '-1000px',
    top: '-1000px'
  });
  tmpEl.textContent = text;
  document.body.appendChild(tmpEl);

  // Create range and selection
  let range = document.createRange();
  let selection = window.getSelection();

  // Clear selection from any previous data.
  selection.removeAllRanges();

  // Make the range select the entire content of the contentHolder paragraph.
  range.selectNodeContents(tmpEl);

  // Add that range to the selection.
  selection.addRange(range);

  // Copy the selection to clipboard.
  let result = document.execCommand('copy');

  // Clear selection if you want to.
  selection.removeAllRanges();

  // Remove temporary element
  tmpEl.remove();

  // Return copy action result
  return result;
}

export default helper(copyToClipboard);