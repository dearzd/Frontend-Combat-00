const fs = require('fs');
const path = require('path');

const cacheFolder = path.resolve(__dirname, 'cache');
const sourceCodeFolder = path.resolve(__dirname, 'cache/sourceCode');
const entryFile = path.resolve(__dirname, 'cache/sourceCode/main.js');

function saveCode(code) {
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
  }

  if (!fs.existsSync(sourceCodeFolder)) {
    fs.mkdirSync(sourceCodeFolder);
  }

  // const existFiles = fs.readdirSync(sourceCodeFolder);

  const files = Object.keys(code);

  // console.log(existFiles);
  console.log(files);

  // delete useless files
  /*for (let name of existFiles) {
    if (files.indexOf(name) === -1) {
      fs.unlinkSync(path.resolve(sourceCodeFolder, name));
    }
  }*/

  // create new files
  /*for (let name of files) {
    if (existFiles.indexOf(name) === -1) {

    }
  }*/

  for (let name of files) {
    fs.writeFileSync(path.resolve(sourceCodeFolder, name), code[name]);
  }

  /*fs.writeFileSync(entryFile, code);*/
}

module.exports = saveCode;
