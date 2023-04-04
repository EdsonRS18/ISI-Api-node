const sequelize = require('../config/sequelize')
const Sequelize = require('sequelize')

const Aluno = require('./aluno')

const aluno = Aluno(sequelize, Sequelize.DataTypes)

const db = {
  aluno,
  sequelize
}

module.exports = db