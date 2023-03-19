const express = require('express');
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const products = data.products;
const morgan = require('morgan');

const app = express();
const port = 8080;

app.use(express.json());
// app.use(express.urlencoded());
app.use(morgan('tiny'));

app.use(express.static('public')); ////make static hosting

//Api - end point -route CRUD

//create api
app.post('/products', (req, res) => {
  const data = req.body;
  console.log(data);
  products.push(data);

  res.status(201).json(data);
});

//Products read api
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === +id);
  res.json(product);
});

//update api
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === +id);

  products.splice(productIndex, 1, { ...req.body, id: +id });

  res.status(200).json({ msg: 'updated' });
});

app.patch('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === +id);
  const product = products[productIndex];

  products.splice(productIndex, 1, { ...product, ...req.body });

  res.status(200).json({ msg: 'updated' });
});

//delete api

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === +id);

  products.splice(productIndex, 1);

  res.status(200).json({ msg: 'deleted' });
});

app.listen(port, () => console.log('server is running' + ' ' + port));
