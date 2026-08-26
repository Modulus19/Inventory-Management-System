const product = require("../Models/products.model");

// Create A Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, size, price, quantity } = req.body;
    const newProduct = new product({
      name,
      description,
      size,
      price,
      quantity,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product Created Successfully✅", product: newProduct });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Creating Product❌", error: error.message });
  }
};

//Update A Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, size, price, quantity } = req.body;
    const updatedProduct = await product.findByIdAndUpdate(
      id,
      { name, description, size, price, quantity },
      { new: true },
    );
    res.status(200).json({
      message: "Product Updated Successfully✅",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Updating Product❌", error: error.message });
  }
};

//Delete A Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product Deleted Successfully✅" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Deleting Product❌", error: error.message });
  }
};

//Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product.find();
    res
      .status(200)
      .json({ message: "Products Retrieved Successfully✅", products });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Retrieving Products❌", error: error.message });
  }
};

//Get A Product By ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "❌Product Not Found❌" });
    }
    res
      .status(200)
      .json({ message: "Product Retrieved Successfully✅", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Retrieving Product❌", error: error.message });
  }
};

//Get A Product By Name
exports.getProductByName = async (req, res) => {
  try {
    const { name } = req.params;
    const product = await product.findOne({ name });
    if (!product) {
      return res.status(404).json({ message: "❌Product Not Found❌" });
    }
    res
      .status(200)
      .json({ message: "Product Retrieved Successfully✅", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Retrieving Product❌", error: error.message });
  }
};
