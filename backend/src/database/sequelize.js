const Sequelize = require('sequelize');

const DATABASE = process.env.DATABASE || 'database_mqtt';
const USER = 'asterisk';
const PASSWORD = '123456';

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 30,
        min: 10,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// sequelize.sync({ force: true });

module.exports = sequelize;