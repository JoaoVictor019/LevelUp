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

// Função para adicionar colunas se elas não existirem
const addColumnIfNotExists = (db, column) => {
  db.run(`ALTER TABLE usuarios ADD COLUMN ${column}`, [], function(err) {
    if (err && err.message.includes("duplicate column name")) {
      console.log(`Coluna ${column} já existe`);
    } else if (err) {
      console.error(`Erro ao adicionar a coluna ${column}:`, err.message);
    } else {
      console.log(`Coluna ${column} adicionada com sucesso`);
    }
  });
};

// Criação da tabela usuários e adição de colunas se necessário
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    como_conheceu TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    sugestao TEXT,
    classificacao TEXT NOT NULL,
    genero TEXT NOT NULL,
    resumo TEXT NOT NULL
  )`, [], function(err) {
    if (!err) {
      // Adiciona colunas que estão faltando (se necessário)
      addColumnIfNotExists(db, 'como_conheceu TEXT NOT NULL');
      addColumnIfNotExists(db, 'conteudo TEXT NOT NULL');
      addColumnIfNotExists(db, 'sugestao TEXT');
      addColumnIfNotExists(db, 'classificacao TEXT NOT NULL');
      addColumnIfNotExists(db, 'genero TEXT NOT NULL');
      addColumnIfNotExists(db, 'resumo TEXT NOT NULL');
    }
  });
});

// Adicionar um usuário manualmente
db.serialize(() => {
  const sql = `INSERT INTO usuarios (nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, ['João', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'jpsilva.cg@gmail.com'], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log('Usuário João adicionado com sucesso');
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.send('Olá, LevelUp Reviews!');
});

// Endpoint para adicionar usuários (Create) com redirecionamento para a página de agradecimento
app.post('/usuarios', (req, res) => {
  console.log("Dados recebidos:", req.body); // Logging dos dados recebidos
  const { nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;
  const sql = `INSERT INTO usuarios (nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.run(sql, [nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo], function(err) {
    if (err) {
      console.error("Erro ao inserir dados no banco de dados:", err.message); // Logging do erro
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
  const { nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;
  const sql = `UPDATE usuarios SET nome = ?, como_conheceu = ?, conteudo = ?, sugestao = ?, classificacao = ?, genero = ?, resumo = ? WHERE id = ?`;
  db.run(sql, [nome, como_conheceu, conteudo, sugestao, classificacao, genero, resumo, id], function(err) {
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
