
import { Router } from 'express'
import { uploadModel } from '../controllers/uploadController.js'
import { protect } from '../middleware/auth.js'
const router = Router()
router.post('/model', protect, uploadModel)
export default router
