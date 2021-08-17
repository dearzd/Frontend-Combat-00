const os = require('os');
const child_process = require('child_process');
const net = require('net');

let workers = [];

for (let i = 0; i < os.cpus().length; i++) {
  workers.push(child_process.fork('./worker.js'));
  console.log('worker process - ' + workers[i].pid);
}

const server = net.createServer();

server.on('error', (err) => {
  throw err;
});

server.listen(8080, () => {
  console.log('TCP server on port: 8080');
  for (let i = 0; i < workers.length; i++) {
    workers[i].send('server', server);

    workers[i].on('exit', () => handleExit(i));
  }
});

function handleExit(i) {
  console.log(`worker: ${workers[i].pid} exited.`);

  workers[i] = child_process.fork('./worker.js');
  workers[i].send('server', server);
  workers[i].on('exit', () => handleExit(i));

  console.log(`worker restarted with id: ${workers[i].pid}`);
}
