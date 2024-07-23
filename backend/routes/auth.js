const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json( { msg: 'access denied'});
    }
    try{
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded.user
        next();
    }catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
};
router.post('/register', async (req, res) => {
    console.log('Register route hit');
    console.log('Request Body:', req.body);
    const { username, email, password } = req.body;
    try {
      if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }
  
      let user = await User.findOne({ email });
      console.log('User Found:', user);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        username,
        email,
        password,
      });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      console.log('Hashed Password:', user.password);
  
      await user.save();
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      jwt.sign(payload, 'secret', { expiresIn: 3000 }, (err, token) => {
        if (err) {
          console.error('JWT Error:', err);
          throw err;
        }
        console.log('Generated Token:', token);
        res.json({ token });
      });
    } catch (err) {
      console.error('Server Error:', err.message);
      res.status(500).send('Server error');
    }
});
router.post('/login', async (req, res) => {
    console.log('Login route hit');
    const {email, password} = req.body;
    try{
        let user = await User.findOne({ email }); 
        if(!user){
            return res.status(400).json({ msg: 'Invalid Email or Password'});
        }
        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({ msg: 'Invalid Email or Password'});
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, 'secret', { expiresIn: 3000}, (err, token) => {
            if (err) throw err;
            res.json({token});
        });
        } catch (err) {
            console.error(err.message);
            res.status (500).send('Server error');
        }
});

module.exports = router;