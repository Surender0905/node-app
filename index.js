const lib = require('./lib');

const express = require('express');

const app = express();
const port = 8080;

console.log('hello');

app.listen(port, () => console.log('server is running' + ' ' + port));

// const fs = require('fs');

// const t1 = performance.now();
// fs.readFile('./demo.txt', 'utf-8', (error, txt) => {
//   console.log(txt);
// });

// const t2 = performance.now();

// console.log(t2 - t1, t1, t2);

// console.log('hello world');
// console.log(lib.sum(2, 4));
