const user = require("../Models/users.model");
const bcrypt = require("bcryptjs");

// Create A User
exports.createUser = async (req, res) => {
  try {
    //Request body
    const { name, gender, phone, email, password, hasAdminAccess, role } =
      req.body;

    //check if all required fields are provided
    if (!name || !gender || !phone || !email || !password) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    //check if email already exists
    const existingUser = await user.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    //check if phone number already exists
    const existingPhone = await user.findOne({ phone: phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "User with this phone number already exists" });
    }

    //Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new user({
      name: name,
      gender: gender,
      phone: phone,
      email: email,
      hasAdminAccess: hasAdminAccess || false,
      role: role || "user",
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating User", error: error.message });
  }
};

//Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if all required fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    //check if user exists
    const existingUser = await user.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    //Generate JWT token
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res
      .status(200)
      .json({ message: "Login Successful", token: token, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Error Logging In", error: error.message });
  }
};

// Update A User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, phone, email, hasAdminAccess, role, password } =
      req.body;
    const updates = { name, gender, phone, email, hasAdminAccess, role };

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({
      message: "User Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Updating User", error: error.message });
  }
};

// Delete A User
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Deleting User", error: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json({ message: "Users Retrieved Successfully", users });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Retrieving Users", error: error.message });
  }
};

// Get A User By ID
exports.getUserById = async (req, res) => {
  try {
    const foundUser = await user.findById(req.params.id);
    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ message: "User Retrieved Successfully", user: foundUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Retrieving User", error: error.message });
  }
};

// Get A User By Name
exports.getUserByName = async (req, res) => {
  try {
    const foundUser = await user.findOne({ name: req.params.name });
    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ message: "User Retrieved Successfully", user: foundUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Retrieving User", error: error.message });
  }
};
