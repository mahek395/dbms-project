const express = require('express')

const router = express.Router()

const controller = require('../controllers/registrations.controller')
const upload = require('../config/multer')

router.post(
  '/',
  upload.single('profile_photo'),
  controller.create
)

router.put(
  '/:id',
  upload.single('profile_photo'),
  controller.update
)

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

router.delete('/:id', controller.remove)

module.exports = router