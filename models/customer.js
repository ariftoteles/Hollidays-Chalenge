'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Account)
    }
  };
  Customer.init({
    identityNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Identity Number must be filled"
        },
        len: {
          args: [16,20],
          msg: "Identity Number minimum 16 characters and maximum 20 characters"
        },
        isUnique (value, next) {
          let id = this.id
          Customer.findOne({where: {identityNumber: value}})
          .then((data) => {
            if(data){
              if(data.id == id) next()
              else next('Duplicate Identity Number')
            } else {
              next()
            }
          })
        }
      }
    },
    fullName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Full name must be filled'
        }
      }
    },
    address: DataTypes.STRING,
    birthDate: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Birth date must be filled'
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        if(!instance.birthDate){
          instance.birthDate = '01-01-2000'
        }
      }
    },
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};