// Importando módulos necessários
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 4000;

// Middleware para interpretar JSON e servir arquivos estáticos da pasta 'docs'
app.use(express.json());
app.use(express.static(path.join(__dirname, 'docs'))); // Tudo dentro de 'docs' é acessível via navegador

// Conectando ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message); // Exibe erro caso a conexão falhe
  } else {
    console.log('✅ Conectado ao banco de dados SQLite.');
  }

  // Criação da tabela 'usuarios' com todos os campos necessários
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    como_conheceu TEXT,
    conteudo TEXT,
    sugestao TEXT,
    classificacao TEXT,
    genero TEXT,
    resumo TEXT
  )`);
});

// Rota raiz — serve o arquivo HTML principal da aplicação
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index.html'));
});

// Rota para adicionar usuários — recebe os dados e salva no banco
app.post('/usuarios', (req, res) => {
  const { nome, email, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;

  // Comando SQL para inserir novo usuário
  const sql = `INSERT INTO usuarios (nome, email, como_conheceu, conteudo, sugestao, classificacao, genero, resumo)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Executa inserção e redireciona para página de agradecimento
  db.run(sql, [nome, email, como_conheceu, conteudo, sugestao, classificacao, genero, resumo], function(err) {
    if (err) {
      console.error("Erro ao inserir dados:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.redirect('/agradecimento.html'); // Certifique-se que esse arquivo existe em 'docs'
  });
});

// Rota para consultar todos os usuários cadastrados
app.get('/usuarios', (req, res) => {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // Retorna os dados como JSON
  });
});

// Rota para consultar um usuário específico por ID
app.get('/usuarios/:id', (req, res) => {
  db.get(`SELECT * FROM usuarios WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Rota para atualizar dados de um usuário
app.put('/usuarios/:id', (req, res) => {
  const { nome, email, como_conheceu, conteudo, sugestao, classificacao, genero, resumo } = req.body;

  const sql = `UPDATE usuarios SET nome = ?, email = ?, como_conheceu = ?, conteudo = ?, sugestao = ?, classificacao = ?, genero = ?, resumo = ? WHERE id = ?`;

  db.run(sql, [nome, email, como_conheceu, conteudo, sugestao, classificacao, genero, resumo, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: `Usuário com ID ${req.params.id} atualizado com sucesso` });
  });
});

// Rota para excluir usuário
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