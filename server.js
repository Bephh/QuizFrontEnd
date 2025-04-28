const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//CONFIGURAR A CONEXAO COM O BANCO
const connection = mysql.createConnection(
    {
        host:'127.0.0.1',
        user: 'root',
        password:'aluno',
        database:'AULA',
        port: 3302
    }
)

connection.connect(err => { 
    if(err){
        console.error('Erro ao conectar ao banco. ', err);
        return;
    }
    console.log('Conectado ao banco de dados!!!');
  });

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
 });    


//PROCESSAR DADOS DO FORMULARIO
 app.post('/inserirCliente', (req, res)=>{
    const{ nome, email, telefone, endereco } = req.body;
    const sql = 'CALL inserirCliente(?,?,?,?)';
    connection.query(sql, [nome, email, telefone, endereco], (err, results) => {
        if(err){
            console.error("Erro ao inserir cliente", err);
            res.end("Erro ao inserir cliente");
            return;
        }
        res.redirect("/?mensagem=sucesso");
    });
});

 //ROTA PARA CONSULTAR CLIENTES
 app.post('/consultarCliente', (req, res)=>{ 
    const {nome} = req.body;

    const sql = 'CALL consultarCliente(?)';

    connection.query(sql, [nome], (err, results)=>{ 
        if(err){
            console.error('Erro ao consultar cliente: ', err);
            res.send('Erro ao consultar cliente');
            return;
        }
        const clientes = results[0];
        res.send(`            
            <script>
                localStorage.setItem('clientes','${JSON.stringify(clientes)}');
                localStorage.setItem('consultaRealizada', 'true');
                window.location.href = '/consultarCliente.html';
            </script>
            
            `);
     });
     
   });


//ROTA PARA EDITAR

app.post('/editarCliente', (req, res)=>{
    const {id, nome, email, telefone, endereco} = req.body;
    const sql = 'CALL atualizarCliente(?,?,?,?,?)';

    connection.query(sql, [id, nome, email, telefone, endereco ],
         (err, results)=>{
            if(err){
                console.error('Erro ao editar cliente: ' , err);
                res.send('Erro ao editar cliente. ');
                return;
            }
            res.redirect('/consultarCliente.html?mensagem=editado');
         });
   });

// ROTA DELETAR
app.post('/deletarCliente', (req, res)=>{
    const { id } = req.body;
    const sql = 'CALL deletarCliente(?)';

    connection.query(sql, [id], (err,results)=>{
        if(err){
            console.error('Erro ao deletar cliente', err);
            res.send('Erro ao deletar cliente');
            return;
        }
        res.redirect('/consultarCliente.html?mensagem=deletado');
    });
});

// INICIAR O SERVIDOR
app.listen(port, () => {
    console.log(`Servidor iniciando http://localhost:${port}`)
});