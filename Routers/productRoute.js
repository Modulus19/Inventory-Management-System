const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

//DEFINING ROUTES FOR PRODUCT CRUD OPERATIONS

// Create A Product
router.post("/createproduct", productController.createProduct);

// Update A Product
router.put("/updateproduct/:id", productController.updateProduct);

// Delete A Product
router.delete("/deleteproduct/:id", productController.deleteProduct);

// Get All Products
router.get("/allproducts", productController.getAllProducts);

// Get A Product By ID
router.get("/id/:id", productController.getProductById);

// Get A Product By Name
router.get("/name/:name", productController.getProductByName);

// Export the router to be used in other parts of the application
module.exports = router;