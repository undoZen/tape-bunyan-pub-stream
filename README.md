# tape-bunyan-pub-stream
Send tape test result to [bunyan-hub](http://www.npmjs.org/package/bunyan-hub).

## install
npm i --save tape tape-bunyan-pub-stream tape

## usage

```js
var tape = require('tape');
require('tap-bunyan-pub-stream')('you-app-name'); // name field will be "tape-result"
```

or

```js
var tape = require('tape');
require('tap-bunyan-pub-stream')({
    app: 'you-app-name',
    name: 'custom-name-field-instead-of-tape-result'
});
```

## license
[MIT](http://mit-license.org/undozen)
