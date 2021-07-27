const webpack = require('webpack');
const config = require('./webpack.preview.config');

function buildPreview() {
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        // console.error(err.stack || err);
        if (err.details) {
          // console.error(err.details);
        }
        return reject(err.details);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        return reject(info.errors);
      }

      if (stats.hasWarnings()) {
        console.warn(info.warnings);
      }

      resolve(info);
    });
  });
}

module.exports = buildPreview;
