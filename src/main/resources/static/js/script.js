// Pega os elementos dos inputs
const inputEmail = document.querySelector("#inputEmail");
const inputSenha = document.querySelector("#inputSenha");

// Evento do botão
document.querySelector('#enviar').onclick = function () {
    login();
}
    function login() {
        const email = inputEmail.value;
        const senha = inputSenha.value;

        fetch(`/login/logar?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na requisição: " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Login OK:", data);
                // Exemplo: redirecionar para outra tela
                // window.location.href = "/html/home.html";
            })
            .catch(error => {
                console.error("Erro:", error);
                alert("Usuário ou senha inválidos!");
            });
    }
