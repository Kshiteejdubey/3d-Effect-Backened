
import { Router } from 'express'
import { listProducts, getProduct, createProduct } from '../controllers/productController.js'
import { protect } from '../middleware/auth.js'
const router = Router()
router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', protect, createProduct)
export default router
