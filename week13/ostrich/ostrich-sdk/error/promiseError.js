import { monitor } from '../utils/monitor.js';

function promiseError(options) {
  console.log('listen unhandledrejection promise error');

  const handleError = (event) => {
    console.log('promise error: ', event);

    const { promise, reason } = event;

    const errorData = { promise, reason };

    monitor.recordError(options, errorData);
  };

  window.addEventListener('unhandledrejection', handleError);
}

export default promiseError;
