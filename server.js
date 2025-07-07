// Importando módulos necessários
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 4000;

// Middleware para interpretar JSON e servir arquivos estáticos da pasta 'docs'
app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs')));

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('✅ Conectado ao banco de dados SQLite.');
  }

  // Cria tabela 'usuarios' sem campo email
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    como_conheceu TEXT,
    conteudo TEXT,
    sugestao TEXT,
    classificacao TEXT,
    genero TEXT,
    resumo TEXT
  )`);
});

// Rota raiz (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Rota POST: recebe dados do formulário e insere no banco
app.post('/usuarios', (req, res) => {
  const { nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;

  const sql = `INSERT INTO usuarios (nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo], function(err) {
    if (err) {
      console.error("Erro ao inserir dados:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ mensagem: "sucesso" }); // <-- Essa resposta será usada pelo frontend
  });
});

// Rota GET: consulta todos os usuários cadastrados
app.get('/usuarios', (req, res) => {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota GET por ID
app.get('/usuarios/:id', (req, res) => {
  db.get(`SELECT * FROM usuarios WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Rota PUT: atualiza dados de um usuário
app.put('/usuarios/:id', (req, res) => {
  const { nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;

  const sql = `UPDATE usuarios SET nome = ?, como_conheceu = ?, conteudo = ?, sugestao = ?, classificacao = ?, genero = ?, resumo = ? WHERE id = ?`;

  db.run(sql, [nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Usuário com ID ${req.params.id} atualizado com sucesso` });
  });
});

// Rota DELETE: exclui um usuário
app.delete('/usuarios/:id', (req, res) => {
  db.run(`DELETE FROM usuarios WHERE id = ?`, [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Usuário com ID ${req.params.id} excluído com sucesso` });
  });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${port}`);
});