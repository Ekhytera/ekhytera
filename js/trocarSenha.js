import { authUser } from "./auth.js";

const formTrocarSenha = document.querySelector("#trocarSenha");
console.log(formTrocarSenha)

document.querySelector('#back').addEventListener('click', () => {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        window.location.href = 'login.html';
    }
});

let user;

authUser().then(dados => {
    if (dados && dados.users) {
        user = dados.users;
    }
});

async function trocarSenha(form) {
    const email = form.email.value;
    const senhaAtual = form.atualSenha.value;
    const senhaNova = form.senhaNova.value;
    const confSenhaNova = form.confSenhaNova.value;

    const data = {
        email: email,
        senhaAtual: senhaAtual,
        senhaNova: senhaNova,
        confSenha: confSenhaNova
    };

    const updateResponse = await fetch(`http://localhost:3000/usuarios/senha/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    });

    const result = await updateResponse.json();

    if (updateResponse.ok) {
        window.location.href = 'login.html';
        alert(result.message);
    } else {
        console.error('Erro ao atualizar informações:', result.message);
        alert('Erro: ' + result.message);
    }
}

formTrocarSenha.onsubmit = (e) => {
    e.preventDefault();
    trocarSenha(formTrocarSenha);
}