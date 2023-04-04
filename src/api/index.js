const express = require('express')

const alunosRouter = require('./alunos')


const router = express.Router()

router.get('/', (req, res) => {
  res.send('App online!')
})

router.use('/alunos', alunosRouter)


module.exports = router