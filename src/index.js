const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const log = require('fancy-log');
const mapStream = require('map-stream');
const tempWrite = require('temp-write');
const CleanCSS = require('clean-css');
const PluginError = require('plugin-error');

module.exports = (minifyOptions = {}, pluginOptions = {}) => mapStream(async (file, cb) => {
  if (file.isNull()) return cb(null, file);

  if (file.isStream()) {
    return cb(new PluginError('gulp-cssmin', 'Streaming not supported'));
  }

  if (['.css'].indexOf(path.extname(file.path)) === -1) {
    log(`gulp-cssmin: Skipping unsupported file ${chalk.blue(file.relative)}`);
    return cb(null, file);
  }
  try {
    const tempFile = await tempWrite(file.contents, path.basename(file.path));
    const data = await fs.readFile(tempFile, { encoding: 'UTF-8' });
    const minimized = new CleanCSS(minifyOptions).minify(data).styles;

    if (pluginOptions.log) {
      log('gulp-cssmin:', chalk.green('✔ ') + file.relative);
    }
    // eslint-disable-next-line
    file.contents = Buffer.from(minimized);
    return cb(null, file);
  } catch (error) {
    return cb(new PluginError('gulp-cssmin', error));
  }
});
