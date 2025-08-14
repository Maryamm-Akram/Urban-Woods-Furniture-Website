const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticate = require('../auth');

 //endpoints
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role)
         {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
         {
      return res.status(400).json({ error: 'Email already in use.' });
    }

     // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name,email,password: hashedPassword, role, });

    // Save the user to the database
    const response = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: response });
  }
   catch (error) 
   {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password)
         {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) 
        {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) 
        {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Create a JWT token
    const userData = { id: user._id, role: user.role };
    const token = jwt.sign(userData, '1234_KEY');

    res.json({ message: 'Login successful', token });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    // Fetching the user profile using the id
    const user = await User.findById(req.user.id).select('-password');
    if (!user)
         {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ message: 'User profile fetched successfully', user });
  } 
  catch (error)
   {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
