'use strict';

var Utils = require('loader-utils'),
  SourceNode = require('source-map').SourceNode,
  SourceMapConsumer = require('source-map').SourceMapConsumer,
  FOOTER = '/*** EXPORTS FROM ng-name-loader ***/\n';

module.exports = function ngNameLoader (content, sourceMap) {
  if (this.cacheable) this.cacheable();

  var query = Utils.parseQuery(this.query);
  var keys = Object.keys(query);
  var exportList = [];

  if (keys.length === 1) {
    exportList.push('module.exports = (\''+ keys[0] +'\');');
  }
  if (sourceMap) {
    var currentRequest = Utils.getCurrentRequest(this);
    var node = SourceNode.fromStringWithSourceMap(content, new SourceMapConsumer(sourceMap));
    node.add('\n\n' + FOOTER + exportList.join('\n'));
    var result = node.toStringWithSourceMap({
      file: currentRequest
    });
    this.callback(null, result.code, result.map.toJSON());
    return;
  }
  return content + '\n\n' + FOOTER + exportList.join('\n');
};
