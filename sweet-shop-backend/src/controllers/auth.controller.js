
const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.registerUser = async (req, res, next) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5️⃣ Success response
    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    // 6️⃣ Centralized error handling
    next(error);
  }
};


exports.loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({message : "invalid credetials"});
        }
        

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({message : "Invalid credentials"});
        }

        const token = jwt.sign(
            {id : user._id, role : user.role },
            process.env.JWT_SECRET,
            {expiresIn : "1h"}
        );

        res.status(200).json({token})
    }
    catch(error) {
        res.status(500).json({message : "Server error"});
    }
};





