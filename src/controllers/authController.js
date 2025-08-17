
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const sign = (user)=> jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

export const register = async (req,res)=>{
  const { name, email, password } = req.body
  const exists = await User.findOne({ email })
  if(exists) return res.status(400).json({ message: 'Email already registered' })
  const user = await User.create({ name, email, password })
  res.json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email } })
}

export const login = async (req,res)=>{
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user) return res.status(404).json({ message: 'User not found' })
  const ok = await user.comparePassword(password)
  if(!ok) return res.status(400).json({ message: 'Invalid credentials' })
  res.json({ token: sign(user), user: { id: user._id, name: user.name, email: user.email } })
}
