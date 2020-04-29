if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

var express=require("express");
var router = express.Router();
var bcrypt=require("bcryptjs");
var config = require("../config");
var jwt = require("jsonwebtoken");
var auth = require("../middleware/auth");


// User Model
const User = require("../models/user");

// const { JWT_SECRET } = config;


/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(400).json({ msg: 'Invalid Password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    if (!token) res.status(400).json({ msg: 'Could not find the token' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      success:"success"
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
    return res.status(400).json({msg:"User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt)  return res.status(400).json({msg:"Something went wrong with bcrypt"});

    const hash = await bcrypt.hash(password, salt);
    if (!hash)  return res.status(400).json({msg:"Something went wrong while hashing the password"});

    const newUser = new User({
      name : name,
      email : email,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) return res.status(400).json({msg:"Something went wrong while saving the user"});


    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      },
      success:"success"
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */


router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log(user);
    if (!user) throw Error('User Does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});
// export default router;

module.exports = router;
