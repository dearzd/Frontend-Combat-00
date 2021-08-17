const cluster = require('cluster');
const net = require('net');
const os = require('os');

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker: ${worker.process.pid} is created.`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  net.createServer()
    .on('connection', (socket) => {
      console.log(`Worker: ${process.pid} received connection.`);
      setTimeout(() => {
        socket.end('Process handled by worker: ' + process.pid);
      }, 1000);
    })
    .listen(8080);

  console.log(`Worker ${process.pid} started`);
}
