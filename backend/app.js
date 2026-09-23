const express = require('express');
const cors = require('cors');
const connection = require('./db');

const server = express();
server.use(cors());
server.use(express.json());

//Livros

//GET /livros
server.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM livro';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message});
        }
        return res.json(resultados);
    });
});

//GET /livros/ordenados
server.get('/livros/ordenados', (req, res) => {
    const sql = 'SELECT * FROM livro ORDER BY titulo';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

//GET /livros/:id
server.get('/livros/:id', (req, res) => {
    const sql = 'SELECT * FROM livro WHERE id_livro = ?';
    const { id } = req.params;

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//GET /livros/busca/:titulo
server.get('/livros/busca/:titulo', (req, res) => {
    const sql = 'SELECT * FROM livro WHERE titulo LIKE ?';
    const { titulo } = req.params;

    connection.query(sql, [`%${titulo}%`], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

//POST /livros
server.post('/livros', (req, res) => {
    const { titulo, autor, isbn, ano_publicacao, categoria, qtd
    } = req.body

     if (titulo == null || autor == null || isbn == null || ano_publicacao == null || categoria == null || qtd == null){
        return res.status(400).json({erro: 'Todos os campos obrigatórios devem ser preenchidos.'})
    }
    
    const sql = 'INSERT INTO livro (titulo, autor, isbn, ano_publicacao, categoria, qtd) VALUES (?, ?, ?, ?, ?, ?)';
    const livro = req.body;

    connection.query(sql, [titulo, autor, isbn, ano_publicacao, categoria, qtd], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.status(201).json({ id: resultados.insertId, ...livro });
    });
});

//PUT /livros/:id
server.put('/livros/:id', (req, res) => {
    const sql = 'UPDATE livro SET titulo = ?, autor = ?, isbn = ?, ano_publicacao = ?, categoria = ?, qtd = ? WHERE id_livro = ?';
    const { id } = req.params;
    const livro = req.body;

    connection.query(sql, [livro.titulo, livro.autor, livro.isbn, livro.ano_publicacao, livro.categoria, livro.qtd, id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }
        return res.json({ ...livro, id });
    });
});

//DELETE /livros/:id
server.delete('/livros/:id', (req, res) => {
    const sql = 'DELETE FROM livro WHERE id_livro = ?';
    const { id } = req.params;

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }
        return res.json({ mensagem: 'Livro removido com sucesso' });
    });
});

//______________________________________________________
//Usuários
//______________________________________________________

//GET /usuarios
server.get('/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

//GET /usuarios/:id
server.get('/usuarios/:id', (req, res) => {
    const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
    const { id } = req.params;

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//POST /usuarios
server.post('/usuarios', (req, res) => {
    const { nome, cpf, email, telefone } = req.body;

    if (nome == null || cpf == null || email == null || telefone == null) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const sql = 'INSERT INTO usuario (nome, cpf, email, telefone) VALUES (?, ?, ?, ?)';
    const usuario = req.body;

    connection.query(sql, [nome, cpf, email, telefone], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.status(201).json({ id: resultados.insertId, ...usuario });
    });
});

//PUT /usuarios/:id
server.put('/usuarios/:id', (req, res) => {
    const sql = 'UPDATE usuario SET nome = ?, cpf = ?, email = ?, telefone = ? WHERE id_usuario = ?';
    const { id } = req.params;
    const usuario = req.body;

    connection.query(sql, [usuario.nome, usuario.cpf, usuario.email, usuario.telefone, id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json({ ...usuario, id });
    });
});

//DELETE /usuarios/:id
server.delete('/usuarios/:id', (req, res) => {
    const sql = 'DELETE FROM usuario WHERE id_usuario = ?';
    const { id } = req.params;

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json({ mensagem: 'Usuário removido com sucesso' });
    });
});


//______________________________________________________
// Empréstimos
//______________________________________________________

//GET /emprestimos
server.get('/emprestimos', (req, res) => {
    const sql = 'SELECT * FROM emprestimo';

    connection.query(sql, (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
});

//GET /emprestimos/:id
server.get('/emprestimos/:id', (req, res) => {
    const sql = 'SELECT * FROM emprestimo WHERE id_emprestimo = ?';
    const { id } = req.params;

    connection.query(sql, [id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.length === 0) {
            return res.status(404).json({ erro: 'Empréstimo não encontrado' });
        }
        return res.json(resultados[0]);
    });
});

//POST /emprestimos
server.post('/emprestimos', (req, res) => {
    const { id_livro_emprestimo, id_usuario_emprestimo, data_emprestimo, 
        data_prevista_devolucao_emprestimo, data_devolucao, status, livro_id, usuario_id } = req.body;

    if (id_usuario_emprestimo == null || id_livro_emprestimo == null || data_emprestimo == null) {
        return res.status(400).json({ erro: 'Todos os campos obrigatórios devem ser preenchidos.' });
    }

    const sql = 'INSERT INTO emprestimo (usuario_id, livro_id, data_emprestimo, data_prevista_devolucao, data_devolucao, status) VALUES (?, ?, ?, ?, ?, ?)';
    const emprestimo = req.body;

    connection.query(sql, [usuario_id, livro_id, data_emprestimo, data_prevista_devolucao_emprestimo, data_devolucao, status], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        return res.status(201).json({ id: resultados.insertId, ...emprestimo });
    });
});

//PUT /emprestimos/:id
server.put('/emprestimos/:id', (req, res) => {
    const sql = 'UPDATE emprestimo SET usuario_id = ?, livro_id = ?, data_emprestimo = ?, data_prevista_devolucao = ?, data_devolucao = ?, status = ? WHERE id_emprestimo = ?';
    const { id } = req.params;
    const emprestimo = req.body;

    connection.query(sql, [emprestimo.usuario_id, emprestimo.livro_id, emprestimo.data_emprestimo, emprestimo.data_prevista_devolucao_emprestimo, 
        emprestimo.data_devolucao, emprestimo.status, id], (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ erro: 'Empréstimo não encontrado' });
        }
        return res.json({ ...emprestimo, id });
    });
});




const port = 3026;

server.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});