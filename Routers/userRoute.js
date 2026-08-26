const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

//DEFINING ROUTES FOR USER CRUD OPERATIONS

// Create A User
router.post("/createuser", userController.createUser);
router.post("/users/login", userController.loginUser);

// Update A User
router.put("/updateuser/:id", userController.updateUser);

// Delete A User
router.delete("/deleteuser/:id", userController.deleteUser);

// Get All Users
router.get("/allusers", userController.getAllUsers);

// Get A User By ID
router.get("/id/:id", userController.getUserById);

// Get A User By Name
router.get("/name/:name", userController.getUserByName);

// Export the router to be used in other parts of the application
module.exports = router;
