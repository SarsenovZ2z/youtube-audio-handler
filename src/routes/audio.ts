import express from 'express'
import { uploads_dir } from '../utils/path'

const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: uploads_dir() })

const AudioController = require('../controllers/audio')

router.post('/upload', upload.single('file'), AudioController.handleUploadedAudio)

export default router