const Product = require('../models/product.model');

module.exports = {
  getProducts: async (req, res) => {
    const { is_delete = false } = req.query;
    const products = await Product.find({ is_delete }).sort({
      createdAt: -1,
    });
    return res.status(200).json(products);
  },
  createProduct: async (req, res) => {
    const body = req.body;
    const newProduct = await Product.create(body);
    return res.status(201).json(newProduct);
  },
  updateProduct: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(200).json(updatedProduct);
  },
  deleteProduct: async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndUpdate(id, {
      is_delete: true,
    });
    return res.status(200).json(deletedProduct);
  },
};
