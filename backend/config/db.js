const { Sequelize } = require('sequelize')

const db = new Sequelize('pagination_db', 'root', '', {
   host: 'localhost',
   dialect: 'mysql'
})

module.exports = db