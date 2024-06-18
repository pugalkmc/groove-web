  import User from '../../database/models/user.js'
  import bcrypt from 'bcrypt'
  import jwt from "jsonwebtoken";
import Project from '../../database/models/project.js';
import { JWT_SECRET } from '../../config.js';
  
  // Function to validate email format (basic validation)
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  }


  const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate email and password
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }
  
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

  
      // Generate a JWT token
      const token = jwt.sign({...req.body, _id: user._id}, JWT_SECRET, { expiresIn: '1h' });

      req.body = { ...req.body, _id: user._id , token}
  
      // Return the token
      res.status(200).json(req.body);
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Validate name length
      if (name.length < 2 || name.length > 50) {
        return res.status(400).json({ error: 'Name must be between 2 and 50 characters.' });
      }
  
      // Validate email format (you can add more robust validation if needed)
      if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
      }
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists. please login to continue' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user object
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
  
      // Save user to database
      const response = await newUser.save();
      const newProject = new Project({
        manager: response._id
      })

      await newProject.save();
  
      // Return success response
      return res.status(200).json({ message: 'User registered successfully.'});
    } catch (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }

  export {
    login,
    register
  }