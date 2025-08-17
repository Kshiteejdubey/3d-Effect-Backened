
import mongoose from 'mongoose'

const uri = process.env.MONGO_URI
if(!uri){ console.error('MONGO_URI missing'); process.exit(1) }

mongoose.connect(uri).then(()=>{
  console.log('MongoDB connected')
}).catch(err=>{
  console.error('MongoDB connection error', err)
  process.exit(1)
})

export default mongoose
