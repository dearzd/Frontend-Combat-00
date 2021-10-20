import jsError from './jsError.js';
import promiseError from './promiseError.js';
import ajaxError from './ajaxError.js';

function monitorError(options) {
  jsError(options);
  promiseError(options);
  ajaxError(options);
}

export default monitorError;
