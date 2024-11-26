const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname))); // Servir arquivos estáticos

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Conectado ao banco de dados SQLite.');
});

// Criação da tabela usuários
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )`);
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Olá, LevelUp Reviews!');
});

// Endpoint para adicionar usuários (Create) com redirecionamento para a página de agradecimento
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const sql = `INSERT INTO usuarios (nome, email) VALUES (?, ?)`;
  db.run(sql, [nome, email], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/agradecimento.html');
  });
});

// Endpoint para obter todos os usuários (Read)
app.get('/usuarios', (req, res) => {
  const sql = `SELECT * FROM usuarios`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint para obter um usuário pelo ID (Read)
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM usuarios WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Endpoint para atualizar um usuário pelo ID (Update)
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const sql = `UPDATE usuarios SET nome = ?, email = ? WHERE id = ?`;
  db.run(sql, [nome, email, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Usuário com ID ${id} atualizado com sucesso` });
  });
});

// Endpoint para excluir um usuário pelo ID (Delete)
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM usuarios WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: `Usuário com ID ${id} excluído com sucesso` });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
