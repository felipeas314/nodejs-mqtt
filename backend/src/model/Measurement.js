const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../database/sequelize');

class Measurement extends Model {}

Measurement.init(
  // {
  //   locale: {
  //     type: Sequelize.STRING
  //   },
  //   ip: {
  //     type: Sequelize.STRING
  //   },
  //   date: {
  //     type: Sequelize.DATE,
  //     defaultValue: Sequelize.NOW
  //   },
  //   weight: {
  //     type: Sequelize.FLOAT
  //   }
  // },
  {
    localidade: {
      type: Sequelize.STRING
    },
    ip_de_origem: {
      type: Sequelize.STRING
    },
    data: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    peso: {
      type: Sequelize.FLOAT
    }
  },
  {
    sequelize: sequelize,
    tableName: 'registros',
    timestamps: false
  }
)

module.exports = Measurement;