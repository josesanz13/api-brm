import { Sequelize } from 'sequelize'

const db = new Sequelize('BRM', 'root', 'tiger', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

export default db;