import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const loginSuccess = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not Authenticated' });

  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('token', token, { httpOnly: true }).json({ user: req.user, token });
};