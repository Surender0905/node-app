const fs = require('fs');

const { Product } = require('../models/product');

exports.createProduct = (req, res) => {
  const product = new Product(req.body);

  product
    .save()
    .then(() => res.status(201).json(req.body))
    .catch((err) => res.status(201).json(err));
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find(); // greater the price 900
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
};

exports.replaceProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Product.findOneAndDelete(
      { _id: id },
      {
        new: true,
      }
    );
    res.status(200).json(doc);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
