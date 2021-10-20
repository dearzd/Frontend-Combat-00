import { api } from '../http/api.js';

export const monitor = {
  recordPerformance: (options, data) => {
    api.report(options, data);
  },
  recordError: (options, data) => {
    api.report(options, data);
  }
};
