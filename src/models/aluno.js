const aluno = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
      
      nome: {
        type: DataTypes.STRING
      },
      cpf: {
        type: DataTypes.INTEGER
      },
      plano: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'aluno'
    })
  
    return Aluno
  }
  
  module.exports = aluno