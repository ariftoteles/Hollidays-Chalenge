const Controller = require('../controllers/Controllers')
const express = require('express')
const router = express.Router()
const customers = require('./customerRoutes')

router.get('/', Controller.renderHome)
router.use('/customers', customers)

module.exports = router;