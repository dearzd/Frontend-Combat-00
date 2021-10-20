import { monitor } from '../utils/monitor.js';

const SUCCESS_CODE = [200];

function fetchError(options) {
  const originFetch = window.fetch;

  const handleFetchError = (request, response) => {
    console.log('fetch error: ', request, response);

    const errorData = { request, response };

    monitor.recordError(options, errorData);
  };

  window.fetch = function() {
    console.log('do fetch', Array.from(arguments));

    const args = Array.from(arguments);
    let request;
    if (args.length === 1) {
      request = {
        url: args[0],
        method: 'GET'
      }
    } else {
      const params = args[1];
      request = {
        url: args[0],
        method: params.method || 'GET',
        body: JSON.parse(params.body)
      };
    }

    originFetch.apply(this, arguments).then((res) => {
      if (SUCCESS_CODE.indexOf(res.status) === -1) {
        const response = {
          status: res.status,
          responseText: res.statusText
        };
        handleFetchError(request, response);
      }
      return res;
    }, (err) => {
      const response = {
        message: err.stack || err
      };
      handleFetchError(request, response);
      return Promise.reject(err);
    });
  }
}

function xhrError() {
  // TODO
}

function ajaxError(options) {
  console.log('listen ajax error');
  fetchError(options);
  xhrError(options);
}

export default ajaxError;
