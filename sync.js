const cson = require('cson');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Synchronous version of `loadWhatever()`.
 * @param {String} file - Path to file.
 * @param {Object} [opts] - Options for `fs.readFile`.
 * @returns Parsed value.
 */
module.exports = function loadWhateverSync(file, opts) {
  if (typeof file !== 'string') {
    throw new Error('load-whatever: file must be a string.');
  }

  opts = opts || {};

  const extension = path.extname(file);
  const filePath = path.isAbsolute(file)
    ? file
    : path.join(process.cwd(), file);

  switch (extension) {
    case '.js':
    case '.json': {
      const module = require(filePath);
      if (typeof module === 'function') {
        try {
          return module();
        } catch (err) {
          throw new Error(`Executing the function inside ${filePath} resulted in this exception:\n${err.message}`);
        }
      } else {
        return module;
      }
    }
    case '.yml':
    case '.yaml':
      return yaml.safeLoad(fs.readFileSync(file, opts));
    case '.cson':
      return cson.parse(fs.readFileSync(file, opts));
    default:
      const contents = fs.readFileSync(file, opts);

      try {
        return JSON.parse(contents);
      }
      catch (e) {
        try {
          return yaml.safeLoad(contents);
        }
        catch (e) {
          throw new Error(`Could not parse ${file} as JSON or YAML.`);
        }
      }
  }
}
