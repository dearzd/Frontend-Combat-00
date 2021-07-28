const fs = require('fs');
const path = require('path');
const express = require('express');
const saveCode = require('./saveCode');
const buildPreview = require('./buildPreview');
const zipCode = require('./zipCode');
const multer  = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, 'cache/sourceCode/'))
    },
    filename: (req, file, cb) => {
      let originalName = file.originalname;
      cb(null, originalName);
    }
  })
});

const app = express();
const port = 8080;

app.use(express.static(path.resolve(__dirname, '../client')));
app.use('/node_modules', express.static(path.resolve(__dirname, '../node_modules')));
app.use('/sourceCode', express.static(path.resolve(__dirname, './cache/sourceCode')));

app.use(express.json());

app.get('/files', (req, res) => {
  const fileNames = fs.readdirSync(path.resolve(__dirname, 'cache/sourceCode'));
  console.log(fileNames);
  res.json(fileNames);
});

// Create file
app.post('/file', (req, res) => {
});

// Save code
app.put('/file/:id', (req, res) => {

});

// Delete file
app.delete('/file/:id', (req, res) => {
  const fileName = req.params.id;

  fs.unlinkSync(path.resolve(__dirname, 'cache/sourceCode', fileName));

  res.send('ok');
});

// Upload picture
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('ok');
});

// Export as zip
app.post('/download', (req, res) => {
  const code = req.body.code;

  // Save file to cache
  saveCode(code);

  // Zip and set res
  zipCode(res);
});

app.post('/preview', (req, res) => {
  const code = req.body.code;

  // Save file to cache
  saveCode(code);

  // Build preview bundle
  buildPreview()
    .then((stats) => {
      console.log('ok');
      res.status(200).send();
    })
    .catch((err) => {
      console.log('err', err);
      res.status(500).send(err[0].message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
