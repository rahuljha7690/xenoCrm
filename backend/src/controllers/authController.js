import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginSuccess = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not Authenticated' });

  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'lax',
  });

  // 🔄 Redirect to frontend dashboard
  res.redirect('http://localhost:5173/dashboard');
};
