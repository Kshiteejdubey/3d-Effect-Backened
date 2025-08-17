
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'ap-south-1'
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const ext = file.originalname.split('.').pop()
      const name = 'models/' + Date.now() + '-' + Math.round(Math.random()*1e9) + '.' + ext
      cb(null, name)
    }
  })
})

export const s3Uploader = (req,res)=>{
  upload.single('model')(req,res,(err)=>{
    if(err) return res.status(400).json({ message: err.message })
    const url = process.env.PUBLIC_BASE_URL ? `${process.env.PUBLIC_BASE_URL}/${req.file.key}` : req.file.location
    res.json({ url })
  })
}
