/* eslint-env mocha */

'use strict';

const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const load = require('.');

chai.use(chaiAsPromised);
const expect = chai.expect;
const expected = {kittens: true};

describe('load()', () => {
  it('parses JavaScript files', () => {
    return expect(load('fixtures/js.js')).to.eventually.eql(expected);
  });

  it('pares JavaScript files that are functions', () => {
    return expect(load('fixtures/func.js')).to.eventually.eql(expected);
  });

  it('parses JavaScript files that are asynchronous functions', () => {
    return expect(load('fixtures/async.js')).to.eventually.eql(expected);
  });

  it('parses JSON files', () => {
    return expect(load('fixtures/json.json')).to.eventually.eql(expected);
  });

  it('parses YAML (.yaml) files', () => {
    return expect(load('fixtures/yaml.yaml')).to.eventually.eql(expected);
  });

  it('parses YAML (.yml) files', () => {
    return expect(load('fixtures/yaml.yml')).to.eventually.eql(expected);
  });

  it('parses CSON files', () => {
    return expect(load('fixtures/cson.cson')).to.eventually.eql(expected);
  });

  it('parses files with no extension as JSON', () => {
    return expect(load('fixtures/.noext-json')).to.eventually.eql(expected);
  });

  it('parses files with no extension as YAML', () => {
    return expect(load('fixtures/.noext-yaml')).to.eventually.eql(expected);
  });

  it('handles absolute paths', () => {
    const filePath = path.join(__dirname, 'fixtures/js.js');
    return expect(load(filePath)).to.eventually.eql(expected);
  });

  it('rejects for non-string paths', () => {
    return expect(load(false)).to.eventually.be.rejected;
  });

  it('rejects on errors', () => {
    return expect(load('notfound.js')).to.eventually.be.rejected;
  });

  it('rejects if a JavaScript function throws an error', () => {
    return expect(load('fixtures/func-error.js')).to.eventually.be.rejected;
  });

  it('rejects if an async JavaScript function rejects', () => {
    return expect(load('fixtures/async-error.js')).to.eventually.be.rejected;
  });
});

describe('load.sync()', () => {
  it('parses JavaScript files', () => {
    expect(load.sync('fixtures/js.js')).to.eql(expected);
  });

  it('parses JavaScript files that are functions', () => {
    expect(load.sync('fixtures/func.js')).to.eql(expected);
  });

  it('parses JSON files', () => {
    expect(load.sync('fixtures/json.json')).to.eql(expected);
  });

  it('parses YAML (.yaml) files', () => {
    expect(load.sync('fixtures/yaml.yaml')).to.eql(expected);
  });

  it('parses YAML (.yml) files', () => {
    expect(load.sync('fixtures/yaml.yml')).to.eql(expected);
  });

  it('parses CSON files', () => {
    expect(load.sync('fixtures/cson.cson')).to.eql(expected);
  });

  it('parses files with no extension as JSON', () => {
    expect(load.sync('fixtures/.noext-json')).to.eql(expected);
  });

  it('parses files with no extension as YAML', () => {
    expect(load.sync('fixtures/.noext-yaml')).to.eql(expected);
  });

  it('handles absolute paths', () => {
    const filePath = path.join(__dirname, 'fixtures/js.js');
    expect(load.sync(filePath)).to.eql(expected);
  });

  it('throws for non-string paths', () => {
    expect(() => load.sync(false)).to.throw(Error);
  });

  it('throws errors', () => {
    expect(() => load.sync('notfound.js')).to.throw(Error);
  });

  it('throws an error encountered when loading a JavaScript function', () => {
    expect(() => load.sync('fixtures/func-error.js')).to.throw(Error);
  });

  it('throws an error if an async function is returned', () => {
    expect(() => load.sync('fixtures/async.js')).to.throw(Error);
  });
});

describe('supports', () => {
  it('is an array', () => {
    expect(load.supports).to.be.an('array');
  });
});
