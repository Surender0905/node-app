const express = require('express');

const {
  createProduct,
  getAllProducts,
  getProductById,
  replaceProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

//Api - end point -route CRUD
const router = express.Router();
router
  .post('/', createProduct)
  .get('/', getAllProducts)
  .get('/:id', getProductById)
  .put('/:id', replaceProduct)
  .patch('/:id', updateProduct)
  .delete('/:id', deleteProduct);

exports.routes = router;
