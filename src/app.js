const express = require('express')
const routers = require('./api')
const { sequelize } = require('./models')
const cors = require('cors');
const { Pool } = require('pg');

const app = express()

app.use(cors());
app.use(express.json())
app.use('/', routers)


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pool',
  password: '123456789',
  port: 5432,
});

sequelize.sync().then(() => {
  console.log('conectado com o banco de dados.')
})

// Configura o CORS para permitir acesso apenas a partir do domínio da sua aplicação frontend




app.get('/alunos', async (req, res) => {
  try {
    const alunos = await pool.query('SELECT * FROM aluno');
    res.status(200).json(alunos.rows);
  } catch (err) {
    console.error('erro ao buscar alunos:', err);
    res.status(500).send('Erro ao buscar alunos');
  }
});

app.post('/alunos',async (req, res) => {
  const { nome, cpf, plano } = req.body;

  const newAlun = await pool.query(
    'INSERT INTO aluno (nome, cpf, plano) VALUES ($1, $2, $3) RETURNING *',
    [nome, cpf, plano]
    );
    
    res.status(201).json(newAlun.rows[0]);
    });

app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;

  const deletedAluno = await pool.query('DELETE FROM aluno WHERE id = $1 RETURNING *', [id]);

  if (deletedAluno.rows.length === 0) {
    res.status(404).json({ error: 'Aluno não encontrado' });
  } else {
    res.status(204).send();
  }
});

app.put('/alunos/:id', async(req, res) => {
  const {id} = req.params;
  const { nome, cpf, plano} = req.body;

  const updatedAluno = await pool.query(
    'UPDATE  aluno SET nome = $1, cpf = $2, plano = $3 WHERE id = $4 RETURNING *',
    [nome, cpf, plano, id]
    );
    
    if (updatedAluno.rows.length === 0) {
    res.status(404).json({ error: 'aluno não encontrado' });
    } else {
    res.status(200).json(updatedAluno.rows[0]);
    }
    });

app.listen(4000, () => {
  console.log('App online!')
}) 
