'use strict';
var tape = require('tape');
var PubStream;
try {
    PubStream = require('bunyan-pub-stream');
} catch (e) {
    try {
        PubStream = require('bunyan-hub-logger/node_modules/bunyan-pub-stream');
    } catch (e) {}
} finally {
    if (!PubStream) {
        console.error('no bunyan-pub-stream module found');
        process.exit(1);
    }
}
module.exports = function changeTapeOutputStream(appNameOrOptions) {
    var options = typeof appNameOrOptions === 'string' ?
        {app: appNameOrOptions, name: 'test-result'}) :
        appNameOrOptions;
    var log = require('bunyan-hub-logger')(options);
    var ts = tape.createStream({objectMode: true});
    ts.on('data', function (row) {
        log[row.type === 'assert' && !row.ok ? 'warn' : 'info']({tap: row});
    });
    ts.on('end', function () {
        log.streams
            .map(function (obj) { return obj.stream; })
            .filter(function (stream) { return stream instanceof PubStream; })
            .forEach(function (pubStream) { pubStream.end(); });
    });
};
