
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import './src/config/db.js'
import productRoutes from './src/routes/productRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import uploadRoutes from './src/routes/uploadRoutes.js'
import { notFound, errorHandler } from './src/middleware/error.js'

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: '10mb' }))
app.use(morgan('dev'))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/', (req,res)=>{
  res.json({status:'ok', service:'arnxt-design247-backend'})
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/uploads', uploadRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 4000
app.listen(port, ()=> console.log('Server running on port', port))
