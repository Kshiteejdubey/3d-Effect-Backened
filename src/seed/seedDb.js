
import 'dotenv/config'
import '../config/db.js'
import Product from '../models/Product.js'

const samples = [
  {
    name: 'Modern Chair',
    image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=800&auto=format&fit=crop',
    category: 'Furniture',
    price: 199.99,
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    description: 'A stylish modern chair with ergonomic design.'
  },
  {
    name: 'Table Lamp',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop',
    category: 'Lighting',
    price: 89.50,
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    description: 'Warm ambient light for cozy interiors.'
  },
  {
    name: 'Marble Tile',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop',
    category: 'Building Material',
    price: 14.99,
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    description: 'Premium marble tile with glossy finish.'
  }
]

const run = async ()=>{
  await Product.deleteMany({})
  await Product.insertMany(samples)
  console.log('Seeded products:', samples.length)
  process.exit(0)
}
run()
