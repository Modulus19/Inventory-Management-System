const product = require("../Models/products.model");
const sendEmail = require("../Midddleware/emailSender"); // Import the email sender function

// Create A Product
exports.createProduct = async (req, res) => {
  try {
    //check if all required fields are provided
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.size ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({ message: "❌All fields are required❌" });
    }
    const { name, description, size, price, quantity } = req.body;
    const newProduct = new product({
      name,
      description,
      size,
      price,
      quantity,
    });
    await newProduct.save();

    // Send an email notification to the admin when a new product is created
    const subject = "New Product Created";
    const text = `A new product has been created:\n\nName: ${name}\nDescription: ${description}\nSize: ${size}\nPrice: ${price}\nQuantity: ${quantity}`;
    await sendEmail("ugbohgrace769@gmail.com", subject, text);

    res
      .status(201)
      .json({ message: "Product Created Successfully✅", product: newProduct });
  } catch (error) {
    res
      .status(400)
      .json({ message: "❌Error Creating Product❌", error: error.message });
  }
};

//Create A Product With Image Upload
exports.createProductWithImage = async (req, res) => {
  try {
    //check if all required fields are provided
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.size ||
      !req.body.price ||
      !req.body.quantity
    ) {
      return res.status(400).json({ message: "❌All fields are required❌" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "❌Image file is required❌" });
    }

    const { name, description, size, price, quantity } = req.body;
    const newProduct = new product({
      name,
      description,
      size,
      price,
      quantity,
      image: req.file.path,
    });

    await newProduct.save();
    return res.status(201).json({
      message: "Product Created Successfully✅",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "❌Error Creating Product❌",
      error: error.message,
    });
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
