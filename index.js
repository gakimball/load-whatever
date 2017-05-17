'use strict';

const fs = require('fs');
const path = require('path');
const cson = require('cson');
const yaml = require('js-yaml');

/**
 * Load the value of a JS, JSON, or YML file.
 * @param {String} file - Path to file.
 * @param {Object} [opts] - Options for `fs.readFile`.
 * @returns {Promise} Promise containing parsed value. Rejects on errors.
 */
module.exports = (file, opts) => new Promise((resolve, reject) => {
  if (typeof file !== 'string') {
    return reject(new Error('Input file must be a string.'));
  }

  opts = opts || {};

  // The extension determines how to parse
  const extension = path.extname(file);

  // Keep absolute paths as they are
  const filePath = path.isAbsolute(file) ?
    file :
    path.join(process.cwd(), file);

  // Parse based on file extension
  switch (extension) {
    // Node's `require()` function can parse a JS file with module.exports, or a JSON file
    case '.js':
    case '.json': {
      const module = require(filePath);
      if (typeof module === 'function') {
        try {
          resolve(module());
        } catch (err) {
          reject(new Error(`Executing the function inside ${filePath} resulted in this exception:\n${err.message}`));
        }
      } else {
        resolve(module);
      }
      break;
    }
    // For YML, the file is loaded and then parsed
    case '.yml':
    case '.yaml':
      fs.readFile(file, opts, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(yaml.safeLoad(res));
      });
      break;
    // For CSON, the file is loaded/parsed through the CSON library
    case '.cson':
      fs.readFile(file, opts, (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(cson.parse(res));
      });
      break;
    // For files with no extension, try to parse as JSON, then YAML
    default:
      fs.readFile(file, opts, (err, res) => {
        if (err) {
          return reject(err);
        }

        try {
          resolve(JSON.parse(res));
        } catch (e) {
          try {
            resolve(yaml.safeLoad(res));
          } catch (e) {
            throw new Error(`Could not parse ${file} as JSON or YAML.`);
          }
        }
      });
  }
});

module.exports.sync = require('./sync');

module.exports.supports = ['json', 'yaml', 'yml', 'cson', 'js'];
