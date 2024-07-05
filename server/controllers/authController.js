import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';

export async function register(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = await hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).send('User registered');
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await findOne({ email });
  if (!user) return res.status(400).send('User not found');
  const isMatch = await compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = sign({ id: user._id }, 'your_jwt_secret');
  res.json({ token });
}
