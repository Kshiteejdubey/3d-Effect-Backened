
import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  modelUrl: { type: String, required: true },
  description: { type: String, default: '' }
}, { timestamps: true })

productSchema.index({ name: 'text', category: 'text', description: 'text' })

export default mongoose.model('Product', productSchema)
