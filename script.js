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

function swapToRegister() {
  container.innerHTML = `
    <h2>Cadastrar</h2>
    <form id="register-form">
      <div class="form-group">
        <label for="name">Nome</label>
        <input type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" required />
      </div>
      <div class="form-group">
        <label for="confirm-password">Repetir Senha</label>
        <input type="password" id="confirm-password" required />
        <span id="error-message" class="error"></span>
      </div>
      <button type="submit" class="btn">Cadastrar</button>
    </form>
    <div class="links">
      <a href="#" id="to-login">Já tem conta? Entrar</a>
    </div>
  `;
  document
    .getElementById("register-form")
    .addEventListener("submit", function (ev) {
      ev.preventDefault();
      const pwd = document.getElementById("password").value;
      const cpwd = document.getElementById("confirm-password").value;
      const err = document.getElementById("error-message");
      if (pwd !== cpwd) {
        err.textContent = "As senhas não coincidem.";
        return;
      }
      err.textContent = "";
      fetch("https://seu-backend.com/api/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: document.getElementById("name").value,
          email: document.getElementById("email").value,
          senha: pwd,
        }),
      })
        .then((r) =>
          r.ok
            ? (window.location.href = "/pagina-de-sucesso")
            : Promise.reject()
        )
        .catch((_) => (err.textContent = "Falha no cadastro."));
    });
  document.getElementById("to-login").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
}

document.getElementById("to-register").addEventListener("click", function (e) {
  e.preventDefault();
  swapToRegister();
});
document.getElementById("to-forgot").addEventListener("click", function (e) {
  e.preventDefault();
  container.innerHTML = `
    <h2>Recuperar Senha</h2>
    <form id="forgot-form">
      <div class="form-group">
        <label for="email-forgot">Digite seu email</label>
        <input type="email" id="email-forgot" required />
      </div>
      <button type="submit" class="btn">Enviar recuperação</button>
    </form>
    <div class="links">
      <a href="#" id="to-login">Voltar ao login</a>
    </div>
  `;
  document.getElementById("to-login").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
  document
    .getElementById("forgot-form")
    .addEventListener("submit", function (ev) {
      ev.preventDefault();
      const email = document.getElementById("email-forgot").value;
      console.log("Enviar recuperação para", email);
    });
});
