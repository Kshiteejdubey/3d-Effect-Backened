
import jwt from 'jsonwebtoken'

export const protect = (req,res,next)=>{
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null
  if(!token) return res.status(401).json({message:'Not authorized'})
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  }catch(e){
    return res.status(401).json({message:'Token invalid'})
  }
}
