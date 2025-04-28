import { emailNode, passNode } from './senhas_e_privados.js'

// STATUS LOGIN
const userName = null;
document.getElementById("user-status").innerText = userName
    ? "Logado como:"
    : "Login";
document.getElementById("user-details").innerText = userName || "Convidado";
const container = document.getElementById("auth-container");

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Logando", document.getElementById("email-login").value);
});

//************************************REGISTRO DE SENHA****************************************************/
document.getElementById("register-form").addEventListener("submit", function (ev) {
    ev.preventDefault();
    const pwd = document.getElementById("password").value;
    const cpwd = document.getElementById("confirm-password").value;
    const err = document.getElementById("error-message");
    if (pwd !== cpwd) {
        err.textContent = "As senhas não coincidem.";
        return;
    }
})

document.getElementById("to-login").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
});
//************************************ FIM DO REGISTRO DE SENHA ********************************************/

//************************************RECUPERAR SENHA****************************************************/
const nodemailer = require('nodemailer');
// Configuração do transporte de email
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    // port: 587,
    port: 465,
    secure: true, // true para SSL
    auth: {
        user: emailNode,
        pass: passNode
    },
    tls: {
        rejectUnauthorized: false // Ignora certificados autoassinados
    }
});

// Endpoint para recuperação de senha
app.post('/recuperarSenha', async (req, res) => {
    const { email } = req.body;

    try {
        // Gerar senha aleatória (exemplo simples)
        const senhaAleatoria = generateRandomPassword();

        // Conectar ao banco de dados
        const pool = await sql.connect(connectDB);


        // Atualizar a senha no banco de dados
        const result = await pool.request()
            .input('email', sql.VarChar(250), email)
            .input('senha', sql.VarChar(50), senhaAleatoria)
            .query('UPDATE usuario SET senha = @senha WHERE email = @email');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Email não encontrado' });
        }

        // Enviar email com a senha provisória
        const mailOptions = {
            from: 'correifpj@gmail.com',
            to: email,
            subject: 'Recuperação de Senha',
            text: `Você solicitou a recuperação de senha. Sua nova senha é: ${senhaAleatoria}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erro ao enviar email:', error);
                return res.status(500).json({ message: 'Ocorreu um erro ao enviar o email. Tente novamente mais tarde.' });
            }
            res.json({ message: 'Email de recuperação de senha enviado com sucesso!' });
        });
    } catch (err) {
        console.error('Erro ao recuperar a senha:', err);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});

// Função para gerar senha aleatória alfanumérica
function generateRandomPassword() {
    const length = 8;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

//**********************************FIM RECUPERAR SENHA***************************************************/