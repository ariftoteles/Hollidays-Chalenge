const Controller = require('../controllers/Controllers')
const express = require('express')
const router = express.Router()

router.get('/', Controller.renderCustomers)
router.get('/register', Controller.renderRegister)
router.post('/register', Controller.handleRegister)
router.get('/:idCustomer/editProfile', Controller.renderEditProfile)
router.post('/:idCustomer/editProfile', Controller.handleEditProfile)
router.get('/:idCustomer/accounts', Controller.renderAccounts)
router.post('/:idCustomer/accounts', Controller.handleAddAccount)
router.get('/:idCustomer/accounts/:idAccount/transfer', Controller.renderTransfer)
router.post('/:idCustomer/accounts/:idAccount/transfer', Controller.handleTransfer)

module.exports = router