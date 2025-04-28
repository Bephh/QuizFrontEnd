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
    })

document.getElementById("to-login").addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
});