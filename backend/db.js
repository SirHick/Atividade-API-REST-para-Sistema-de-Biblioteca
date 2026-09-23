const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'biblioteca-api'
});

connection.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao Banco de Dados: ', erro);
        return;
    }
    console.log('Banco de Dados biblioteca-api conectado com sucesso!');
});

module.exports = connection;