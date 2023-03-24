const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

const users = data.users;

exports.createProduct = (req, res) => {
  users.push(req.body);
  res.status(201).json(req.body);
};

exports.getAllProducts = (req, res) => {
  res.json(users);
};

exports.getProductById = (req, res) => {
  const { id } = req.params;
  const product = users.find((p) => p.id === +id);
  res.json(product);
};

exports.replaceProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = users.findIndex((p) => p.id === +id);

  users.splice(productIndex, 1, { ...req.body, id: +id });

  res.status(200).json({ msg: 'updated' });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = users.findIndex((p) => p.id === +id);
  const product = users[productIndex];

  users.splice(productIndex, 1, { ...product, ...req.body });

  res.status(200).json({ msg: 'updated' });
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const productIndex = users.findIndex((p) => p.id === +id);

  users.splice(productIndex, 1);

  res.status(200).json({ msg: 'deleted' });
};
