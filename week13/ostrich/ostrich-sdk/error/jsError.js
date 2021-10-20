import { monitor } from '../utils/monitor.js';

function jsError(options) {
  console.log('listen js error');

  const handleError = (event) => {
    console.log('js error: ', event);

    const { message, filename, lineno, colno, error } = event;

    const errorData = {
      message, filename, lineno, colno, error
    };

    monitor.recordError(options, errorData);
  };

  window.addEventListener('error', handleError, true);
}

export default jsError;
