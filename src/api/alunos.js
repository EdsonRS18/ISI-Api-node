const express = require('express')
const router = express.Router()
const { aluno } = require('../models')
const AlunoService = require('../services/alunos')


const alunoService = new AlunoService(aluno)

router.get('/', async (req, res) => {
  const alunos = await alunoService.get()
  res.status(200).json(alunos)
})

router.post('/', async (req, res) => {
  const { nome, cpf, plano } = req.body  
  try {
  await alunoService.adicionar({ nome, cpf, plano })
  res.status(201).send('aluno adicionado com sucesso!')
} catch (erro) {
  res.status(400).send('Não foi possível adicionar o curso!')
}
})

module.exports = router