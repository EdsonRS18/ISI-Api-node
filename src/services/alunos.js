class AlunoService {
    constructor (AlunoModel) {
      this.aluno = AlunoModel
    }
  
    async get () {
      const alunos = await this.aluno.findAll()
      return alunos
    }
  
    async adicionar (aluno) {
      // verifica se já existe curso com o mesmo nome
      try {
        await this.aluno.create(aluno)
      } catch (erro) {
        console.erro(erro.message)
        throw erro
      }
    }
  }
  
  module.exports = AlunoService