const path = require('path');
const archiver = require('archiver');

function zipCode(res) {
  const archive = archiver('zip');

  archive.on('error', function(err) {
    res.status(500).send({error: err.message});
  });

  //on stream closed we can end the request
  archive.on('end', function() {
    console.log('Archive wrote %d bytes', archive.pointer());
  });

  //set the archive name
  res.attachment('code.zip');

  //this is the streaming magic
  archive.pipe(res);

  archive.directory(path.resolve(__dirname, 'cache/sourceCode'), false);

  archive.finalize();
}

module.exports = zipCode;
