const fs = require('fs');
const path = require('path');

const cacheFolder = path.resolve(__dirname, 'cache');
const sourceCodeFolder = path.resolve(__dirname, 'cache/sourceCode');

function saveCode(code) {
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
  }

  if (!fs.existsSync(sourceCodeFolder)) {
    fs.mkdirSync(sourceCodeFolder);
  }

  const files = Object.keys(code);

  console.log(files);

  for (let name of files) {
    fs.writeFileSync(path.resolve(sourceCodeFolder, name), code[name]);
  }
}

module.exports = saveCode;
