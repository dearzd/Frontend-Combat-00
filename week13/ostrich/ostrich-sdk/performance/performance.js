import { monitor } from '../utils/monitor.js';

function performance(options) {

  const handleAllLoad = () => {
    const entries = window.performance.getEntries();
    const navigation = entries.find((e) => e.entryType === 'navigation');
    const paint = entries.find((e) => e.entryType === 'paint');
    const resources = entries.filter((e) => e.entryType === 'resource');

    const navigationTime = {
      // 上一个页面卸载总耗时
      prevPage: navigation.fetchStart - navigation.startTime,
      // 上一个页面卸载时间
      prevUnload: navigation.unloadEventEnd - navigation.unloadEventStart,
      // 重定向时间
      redirectTime: navigation.redirectEnd - navigation.redirectStart,
      // DNS 缓存时间
      appcacheTime: navigation.domainLookupStart - navigation.fetchStart,
      // DNS 查询时间
      dnsTime: navigation.domainLookupEnd - navigation.domainLookupStart,
      // 读取页面第一个字节时间
      ttfbTime: navigation.requestStart - navigation.startTime,
      // tcp 链接时间
      tcpTime: navigation.connectEnd - navigation.connectStart,
      // 网络总耗时
      network: navigation.connectEnd - navigation.start,
      // 从发送请求到接受到请求时间
      send: navigation.responseStart - navigation.requestStart,
      // 接受数据用时
      receive: navigation.responseEnd - navigation.responseStart,
      // 请求总耗时
      request: navigation.responseEnd - navigation.requestStart,

      // 渲染
      // 解析 dom 树耗时
      analysisTime: navigation.domComplete - navigation.domInteractive,
      // 执行 onload 回调函数耗时
      onload: navigation.loadEventEnd - navigation.loadEventStart,
      // 前端总耗时
      frontend: navigation.loadEventEnd - navigation.domContentLoadedEventStart,

      // 白屏时间
      blankTime: navigation.domContentLoadedEventStart - navigation.startTime,
      // dom ready time
      domReadyTime: navigation.domContentLoadedEventEnd - navigation.startTime,
      // 页面加载完成时间
      loadPage: navigation.loadEventEnd - navigation.startTime,
      // 可操作时间
      domInteractive: navigation.domInteractive - navigation.start,

      // 首屏时间 ？？
      paint: paint.startTime + paint.duration
    };

    const resourcesTime = resources.map((item) => {
      return {
        name: item.name,
        initiatorType: item.initiatorType,
        nextHopProtocol: item.nextHopProtocol,
        dnsTime: item.domainLookupEnd - item.domainLookupEnd,
        tcpTime: item.connectEnd - item.connectStart,
        reqTime: item.responseEnd - item.requestStart,
        redirectTime: item.redirectEnd - item.redirectStart
      };
    });

    monitor.recordPerformance(options, navigationTime);
    monitor.recordPerformance(options, resourcesTime);
  }

  window.addEventListener('load', handleAllLoad);
}

export default performance;
