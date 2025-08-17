
import path from 'path'
import multer from 'multer'
import mime from 'mime'
import { s3Uploader } from '../utils/s3.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'))
  },
  filename: function(req, file, cb) {
    const ext = mime.getExtension(file.mimetype) || 'bin'
    const name = Date.now() + '-' + Math.round(Math.random()*1e9) + '.' + ext
    cb(null, name)
  }
})

const fileFilter = (req, file, cb) => {
  const ok = ['model/gltf-binary','model/gltf+json','application/octet-stream'].includes(file.mimetype)
  if(ok) cb(null, true)
  else cb(new Error('Only .glb/.gltf allowed'))
}

const uploadLocal = multer({ storage, fileFilter })

export const uploadModel = (req,res)=>{
  const driver = process.env.STORAGE_DRIVER || 'local'
  if(driver === 's3') return s3Uploader(req,res)
  uploadLocal.single('model')(req,res,(err)=>{
    if(err) return res.status(400).json({ message: err.message })
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    res.json({ url })
  })
}
