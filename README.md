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

- A JavaScript with `module.exports`.
- A JSON file.
- A YAML file.
- A CSON file.

The contents of the file will be parsed based on its extension. If the file has no extension, it will be parsed as JSON first, and if that doesn't work, as YAML next.

- **file** (String): Path of file to load.
- **options** (Object or String): *Optional.* Options for `fs.readFile`.

Returns a promise containing the value. Rejects if there's an error in reading the file, parsing its contents, or if a file without an extension can't be parsed as JSON or YAML.

### load.sync(file[, options])

Synchronous version of `load()`. Returns the parsed value of the file.

## Local Development

```bash
git clone https://github.com/spacedoc/load-whatever
cd load-whatever
npm install
npm test
```

## License

MIT &copy; [Geoff Kimball](http://geoffkimball.com)
