# load-whatever

> Load and parse a file that might be a module, JSON, YAML, or CSON

[![Travis](https://img.shields.io/travis/spacedoc/load-whatever.svg?maxAge=2592000)](https://travis-ci.org/spacedoc/load-whatever) [![npm](https://img.shields.io/npm/v/load-whatever.svg?maxAge=2592000)](https://www.npmjs.com/package/load-whatever)

Sometimes you want to load and parse a file but don't care how the file is written. Who likes writing `switch` statements, anyway?

Loads JavaScript modules, JSON, YAML, and CSON.

## Installation

```bash
npm install load-whatever
```

## Usage

```js
const load = require('load-whatever');

load('config.js').then(res => {
  // res => {}
});

const config = load.sync('config.json'); // => {}
```

## API

### load(file[, options])

Load and parse the value of a file. It can be:

- A JavaScript file with `module.exports`.
  - If the value is a function, the function is executed, and the return value is used.
  - If the value is a Promise-returning function, the value inside the Promise is used.
- A JSON file.
- A YAML file.
- A CSON file.

The contents of the file will be parsed based on its extension. If the file has no extension, it will be parsed as JSON first, and if that doesn't work, as YAML next.

- **file** (String): Path of file to load.
- **options** (Object or String): *Optional.* Options for `fs.readFile`.

Returns a promise containing the value. Rejects on any of these conditions:

- There's an error reading the file.
- There's an error parsing the file based on its extension.
- A file with no extension can't be parsed as JSON or YAML.
- A JavaScript function encounters an error when it's run.

### load.sync(file[, options])

Synchronous version of `load()`. Returns the parsed value of the file. Supports all the same features as the asynchronous method **except for loading asynchronous functions**. Throws an error for any of the reasons outlined by the asynchronous `load()`, plus one more:

- A JavaScript function returns a Promise.

### load.supports

Array of strings containing the file extensions this library supports. Useful if you utilize glob matching to load files with this library.

## Local Development

```bash
git clone https://github.com/spacedoc/load-whatever
cd load-whatever
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
