const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = require('../database/sequelize');

class Measurement extends Model {}

Measurement.init(
  {
    locale: {
      type: Sequelize.STRING
    },
    ip: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    weight: {
      type: Sequelize.FLOAT
    }
  },
  {
    sequelize: sequelize,
    tableName: 'measurements',
    timestamps: false
  }
)

module.exports = Measurement;