const router = require('express').Router()
const uploadsController = require('../controllers/uploads')

router.post('/', uploadsController.upload)
router.post('/resize', uploadsController.resize)
router.post('/composition', uploadsController.composition)
router.post('/gifs', uploadsController.gifs)
router.post('/operations', uploadsController.operations)
router.post('/color', uploadsController.pop)

module.exports = router
