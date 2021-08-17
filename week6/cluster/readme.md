# Master/Worker 主从网络处理架构实现

## 描述
- 作业实现有2个版本，一个是用 child_process 实现的，一个是用 cluster 实现的。
- 作业实现 worker 异常退出重启功能。
- 用 child_process 实现的包含2个文件（master.js, worker.js），运行步骤：
  - `node master.js` 启动 master；
  - `node client.js` 运行客户端测试。
- 用 cluster 实现的包含1个文件（cluster.js），运行步骤：
  - `node cluster.js` 启动 cluster；
  - `node client.js` 运行客户端测试。
