export const api = {
  report: (options, data) => {
    const { url } = options;

    const sendData = () => {
      const headers = {
        type: 'application/json'
      };

      const blob = new window.Blob([JSON.stringify({ options, data })], headers);
      navigator.sendBeacon(url, blob);
    };

    window.requestIdleCallback(sendData);
  }
};
