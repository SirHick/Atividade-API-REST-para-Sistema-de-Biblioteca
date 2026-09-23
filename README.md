# Atividade API REST para Sistema de Biblioteca

## 📌 Projeto
Atividade sobre API REST em contexto de biblioteca.

## 🎯 Objetivo do Sistema
Praticar o desenvolvimento do que foi visto em sala de aula, além de servir de treino para o SAEP.

## 🛠️ Tecnologias Utilizadas
- **Node.js**
- **Express**
- **MySQL** (`mysql2`)
- **CORS**
- **JavaScript** (ES6+)
- **Visual Studio Code**
- **Google Docs**

---

## 📋 Requisitos Funcionais

| ID | Requisito | Descrição |
|---|---|---|
| **RF01** | Cadastro de Livro | O sistema deve permitir cadastrar um novo livro. |
| **RF02** | Listagem de Livros | O sistema deve permitir consultar os livros cadastrados. |
| **RF03** | Consulta de Livro | O sistema deve permitir consultar um único livro por ID. |
| **RF04** | Pesquisa de Livro | O sistema deve permitir consultar um livro específico pelo título digitado pelo usuário. |
| **RF05** | Ordenação de Livros | O sistema deve permitir listar todos os livros cadastrados em ordem alfabética. |
| **RF06** | Edição de Livros | O sistema deve permitir editar os dados dos livros cadastrados. |
| **RF07** | Exclusão de Livros | O sistema deve permitir a exclusão de livros cadastrados no sistema. |
| **RF08** | Cadastro de Usuários | O sistema deve permitir cadastrar usuários. |
| **RF09** | Registro de Empréstimos | O sistema deve fornecer o registro de empréstimos efetuados. |
| **RF10** | Consulta de Empréstimos | O sistema deve permitir fazer consultas aos empréstimos realizados. |

---

## 🗄️ Como Configurar o Banco de Dados

Crie o banco de dados e as tabelas executando o seguinte script SQL no seu MySQL:

```sql
CREATE DATABASE IF NOT EXISTS `biblioteca-api`;
USE `biblioteca-api`;

-- Tabela de Livros
CREATE TABLE IF NOT EXISTS livro (
  id_livro INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  isbn VARCHAR(50) NOT NULL,
  ano_publicacao DATE NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  qtd INT NOT NULL
);

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(14) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL
);

-- Tabela de Empréstimos
CREATE TABLE IF NOT EXISTS emprestimo (
  id_emprestimo INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  livro_id INT NOT NULL,
  data_emprestimo DATE NOT NULL,
  data_prevista_devolucao_emprestimo DATE NOT NULL,
  data_devolucao_emprestimo DATE,
  status VARCHAR(50) NOT NULL,
  CONSTRAINT fk_emprestimo_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
  CONSTRAINT fk_emprestimo_livro FOREIGN KEY (livro_id) REFERENCES livro(id_livro)
);
```

---

## 🚀 Como Rodar o Projeto

Instale as dependências:

```bash
npm init -y
npm install cors mysql2 express
```

Inicie o servidor:

```bash
node app.js
```

---

## 🌐 Rotas Disponíveis

### 📚 Livros
| Método | Rota | Descrição |
|---|---|---|
| GET | `/livros` | Listar todos os livros cadastrados. |
| GET | `/livros/ordenados` | Listar livros em ordem alfabética. |
| GET | `/livros/:id` | Consultar um livro por ID. |
| GET | `/livros/busca/:titulo` | Buscar livros por parte do título. |
| POST | `/livros` | Cadastrar um novo livro. |
| PUT | `/livros/:id` | Atualizar os dados de um livro existente. |
| DELETE | `/livros/:id` | Remover um livro pelo ID. |

### 👤 Usuários
| Método | Rota | Descrição |
|---|---|---|
| GET | `/usuarios` | Listar todos os usuários cadastrados. |
| GET | `/usuarios/:id` | Consultar um usuário por ID. |
| POST | `/usuarios` | Cadastrar um novo usuário. |
| PUT | `/usuarios/:id` | Atualizar os dados de um usuário existente. |
| DELETE | `/usuarios/:id` | Remover um usuário pelo ID. |

### 🔄 Empréstimos
| Método | Rota | Descrição |
|---|---|---|
| GET | `/emprestimos` | Listar todos os empréstimos. |
| GET | `/emprestimos/:id` | Consultar um empréstimo por ID. |
| POST | `/emprestimos` | Registrar um novo empréstimo. |
| PUT | `/emprestimos/:id` | Atualizar um empréstimo existente. |

---

## 📦 Exemplos de Payloads

### Cadastro de Livro (`POST /livros`)
```json
{
  "titulo": "O Senhor dos Anéis: A Sociedade do Anel",
  "autor": "J. R. R. Tolkien",
  "isbn": "978-8595084759",
  "ano_publicacao": "1954-07-29",
  "categoria": "Fantasia",
  "qtd": 3
}
```

### Cadastro de Usuário (`POST /usuarios`)
```json
{
  "nome": "Alberto Silva",
  "cpf": "12345678999",
  "email": "alberto@email.com",
  "telefone": "988646722"
}
```

### Registro de Empréstimo (`POST /emprestimos`)
```json
{
  "usuario_id": 1,
  "id_usuario_emprestimo": 1,
  "livro_id": 1,
  "id_livro_emprestimo": 1,
  "data_emprestimo": "2026-09-01",
  "data_prevista_devolucao_emprestimo": "2026-09-15",
  "data_devolucao_emprestimo": null,
  "status": "Ativo"
}
```
