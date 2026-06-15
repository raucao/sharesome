import vex from 'vex-js';
import vexDialog from 'vex-dialog';

export function initialize() {
  try {
    vex.registerPlugin(vexDialog);
  } catch (e) {
    // Ignore double registration errors
  }
  vex.defaultOptions.className = 'vex-theme-flat-attack';
  window.vex = vex;
}

export default {
  name: 'vex',
  initialize
};