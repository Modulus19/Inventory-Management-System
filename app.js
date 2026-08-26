const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./Config/databaseConfig");

const productRoute = require("./Routers/productRoute");
const userRoute = require("./Routers/userRoute");

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

app.use(express.json()); // Middleware to parse JSON request bodies

app.use("/products", productRoute); // Use the product routes for any requests to /products
app.use("/users", userRoute); // Use the user routes for any requests to /users
// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
