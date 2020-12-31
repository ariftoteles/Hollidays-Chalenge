'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Account Type must be filled"
        }
      }
    },
    balance: {
      type: DataTypes.FLOAT,
      validate: {
        minimumBalance(value){
          if(!this.id){
            if(value && value < 500000){
              throw new Error('Minimum balance for new Accout: Rp500.000')
            }
          }
        },
        checkBalance(value){
          if(this.id){
            if(value < 0){
              throw new Error('Insufficient balance')
            }
          }
        }
      }
    },
    CustomerId: DataTypes.INTEGER,
    accountNumber: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance) => {
        if(!instance.accountNumber){
          instance.accountNumber = String(new Date().valueOf()).split('').splice(3).join('')
        }
        if(!instance.balance){
          instance.balance = 500000
        } 
      }
    },  
    sequelize,
    modelName: 'Account',
  });
  return Account;
};