const express = require('express');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const morgan = require('morgan');

const app = express();
const port = 8080;

app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan('tiny'));

app.use(express.static('public')); ////make static hosting

// app.use((req, res, next) => {
//   console.log(
//     req.ip,
//     req.method,
//     req.hostname,
//     new Date(),
//     req.get('User-Agent')
//   );
//   next();
// });

//type of middleware
// Application-level middleware
// Router-level middleware
// Error-handling middleware
// Built-in middleware
// Third-party middleware

const auth = (req, res, next) => {
  console.log(req.query);
  if (req.body.password === '123') {
    next();
  } else {
    res.sendStatus(401);
  }
};

// app.use(auth);  this method is for whole application

app.get('/', auth, (req, res) => {
  res.json({ type: 'GET' });
});

app.post('/', auth, (req, res) => {
  console.log(req.body);

  res.status(201).json({ type: 'post' });
});

// app.get('/', (req, res) => {
//   // res.send('<h1>hello</h1>');
//   // res.sendFile('C:/Users/91860/Desktop/node-app/index.html');  for this absolut path required or file module path system
//   // res.json(data);
//   // res.sendStatus(404);
//   // res.status(201).send('<h1>hello</h1>');
// });

app.listen(port, () => console.log('server is running' + ' ' + port));
