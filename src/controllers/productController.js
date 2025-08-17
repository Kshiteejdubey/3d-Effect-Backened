
import Product from '../models/Product.js'

export const listProducts = async (req,res)=>{
  const { q, category, minPrice, maxPrice } = req.query
  const filter = {}
  if(category) filter.category = category
  if(minPrice || maxPrice){
    filter.price = {}
    if(minPrice) filter.price.$gte = Number(minPrice)
    if(maxPrice) filter.price.$lte = Number(maxPrice)
  }
  let query = Product.find(filter).sort('-createdAt')
  if(q){
    query = Product.find({ $text: { $search: q }, ...filter })
  }
  const items = await query.limit(100)
  res.json(items)
}

export const getProduct = async (req,res)=>{
  const item = await Product.findById(req.params.id)
  if(!item) return res.status(404).json({ message: 'Product not found' })
  res.json(item)
}

export const createProduct = async (req,res)=>{
  const { name, image, category, price, modelUrl, description } = req.body
  const item = await Product.create({ name, image, category, price, modelUrl, description })
  res.status(201).json(item)
}
