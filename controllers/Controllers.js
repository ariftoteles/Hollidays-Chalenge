const {Account, Customer, Sequelize} = require('../models')
const currencyFormat = require('../helper/currencyFormat')
const dateFormat = require('../helper/dateFormat')
const {not} = Sequelize.Op;

class Controller{
    static renderHome(req, res){
        res.render('home')
    }

    static renderCustomers(req, res){
        Customer.findAll({
            order: [['fullName','ASC']]
        })
        .then(data => res.render('customers', {data}))
        .catch(err => res.send(err))
    }

    static renderRegister(req, res){
        res.render('form-register')
    }

    static handleRegister(req, res){
        let value = {
            identityNumber: req.body.identityNumber,
            fullName: req.body.fullName,
            address: req.body.address,
            birthDate: req.body.birthDate,
            gender: req.body.gender
        }
        Customer.create(value)
        .then(() => res.redirect('/customers'))
        .catch(err => {
            let errMsg = []
            err.errors.forEach(el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
    }
    
    static renderEditProfile(req, res){
        const id = +req.params.idCustomer
        Customer.findByPk(id)
        .then(data => res.render('form-edit', {data, dateFormat}))
        .catch(err => res.send(err))
    }

    static handleEditProfile(req, res){
        const id = +req.params.idCustomer
        let value = {
            id: id,
            identityNumber: req.body.identityNumber,
            fullName: req.body.fullName,
            address: req.body.address,
            birthDate: req.body.birthDate,
            gender: req.body.gender
        }
        Customer.update(value, {
            where: {id},
        })
        .then(() => res.redirect('/customers'))
        .catch(err => {
            let errMsg = []
            err.errors.forEach(el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
    }

    static renderAccounts(req, res){
        const id = +req.params.idCustomer
        Customer.findByPk(id,{
            include: [Account]
        })
        .then(data => res.render('form-account', {data, currencyFormat}))
        .catch(err => res.send(err))
    }

    static handleAddAccount(req, res){
        let value = {
            type: req.body.type === undefined ? "" : req.body.type,
            balance: req.body.balance,
            CustomerId: +req.params.idCustomer
        }
        Account.create(value)
        .then(() => res.redirect(`/customers/${value.CustomerId}/accounts`))
        .catch(err => {
            let errMsg = []
            err.errors.forEach(el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
    }

    static renderTransfer(req, res){
        let idAccount = +req.params.idAccount
        let account
        let allAccount
        Account.findByPk(idAccount,{include:[Customer]})
        .then(data => {
            account = data
            return Account.findAll({
                where: {
                    id: {
                        [not] : idAccount
                    }
                },
                include: [Customer],
                order: [
                    [Customer,'fullName', 'ASC'],
                    ['accountNumber', 'ASC']
                ]
            })
        })
        .then(data => {
            allAccount = data
            // res.send({account, allAccount})
            res.render('form-transfer', {account, allAccount, currencyFormat})
        })
        .catch(err => res.send(err))
    }

    static handleTransfer(req, res){
        let idCustomer = +req.params.idCustomer
        let idAccount = +req.params.idAccount
        let idReceiver = +req.body.idReceiver
        let amount = +req.body.amount

        Account.findByPk(idAccount)
        .then(data => {
            let value = {
                id: idAccount,
                balance: data.balance - amount
            }
            return Account.update(value, {
                where: {id: idAccount}
            })
        })
        .then(() => {
            return Account.findByPk(idReceiver)
        })
        .then(data => {
            let value = {
                id: idReceiver,
                balance: data.balance + amount
            }
            return Account.update(value, {
                where: {id: idReceiver}
            })
        })
        .then(() => res.redirect(`/customers/${idCustomer}/accounts`))
        .catch(err => {
            let errMsg = []
            err.errors.forEach(el => {
                errMsg.push(el.message)
            })
            res.send(errMsg)
        })
    }
}

module.exports = Controller;