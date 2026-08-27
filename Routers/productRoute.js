const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const { protect } = require("../Midddleware/auth"); // Import authentication middleware to protect routes
const { authorize } = require("../Midddleware/role"); // Import authorization middleware to check user roles

//DEFINING ROUTES FOR PRODUCT CRUD OPERATIONS

// Create A Product
router.post(
  "/createproduct",
  protect,
  authorize("superadmin"),
  productController.createProduct,
);

// Update A Product
router.put(
  "/updateproduct/:id",
  protect,
  authorize("superadmin", "storeowner"),
  productController.updateProduct,
);

// Delete A Product
router.delete(
  "/deleteproduct/:id",
  protect,
  authorize("superadmin", "storeowner"),
  productController.deleteProduct,
);

// Get All Products
router.get("/allproducts", productController.getAllProducts);

// Get A Product By ID
router.get("/id/:id", productController.getProductById);

// Get A Product By Name
router.get("/name/:name", productController.getProductByName);

// Export the router to be used in other parts of the application
module.exports = router;
