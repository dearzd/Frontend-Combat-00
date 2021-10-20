import monitorError from './error/index.js';
import monitorPerformance from './performance/index.js';

const ostrichMonitor = {
  startMonitorPerformance: ({ pageId, projectId, isPage, isResource, url }) => {
    monitorPerformance({ pageId, projectId, isPage, isResource, url });
  },
  startMonitorError: ({ pageId, projectId, type, url }) => {
    monitorError({ pageId, projectId, type, url });
  }
};

export { ostrichMonitor };
