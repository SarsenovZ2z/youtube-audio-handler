import express from 'express'

const router = express.Router()

const AuthController = require('../controllers/auth')

router.get('/uid', AuthController.getDeviceUid)

export default router