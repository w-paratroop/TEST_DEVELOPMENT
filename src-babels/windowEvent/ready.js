/**
 * DOMContedLoaded callback
 */
function ready() {
  window.removeEventListener('DOMContentLoaded', ready);
}

export default ready;
