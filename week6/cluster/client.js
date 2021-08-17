const net = require('net');

const connectionCount = 20;

for (let i = 0; i < connectionCount; i++) {
  console.log(i);
  net.createConnection({ port: 8080 }).on('data', (data) => {
    console.log('Receive data: ', data.toString());
  });
}
