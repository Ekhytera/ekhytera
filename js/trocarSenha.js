import { authUser } from "./auth.js";

const formTrocarSenha = document.querySelector("#trocarSenha");
const erroEmail = document.querySelector('#emailNaoEnc');
const erroSenhaAtual = document.querySelector('#erroSenhaAtual');
const erroSenhaNova = document.querySelector('#senhaInv');
const erroConfSenha = document.querySelector('#senhaDiferentes');

document.querySelector('#back').addEventListener('click', () => {
    if (document.referrer) {
        window.location.href = document.referrer;
    } else {
        window.location.href = 'login.html';
    }
});

let user;

authUser().then(dados => {
    if (dados) {
        user = dados;
    }
});

async function trocarSenha(form) {
    const email = form.email.value;
    const senhaAtual = form.atualSenha.value;
    const senhaNova = form.senhaNova.value;
    const confSenhaNova = form.confSenhaNova.value;

    erroEmail.textContent = '';
    erroSenhaAtual.textContent = '';
    erroSenhaNova.textContent = '';
    erroConfSenha.textContent = '';

    const data = {
        email: email,
        senhaAtual: senhaAtual,
        senhaNova: senhaNova,
        confSenha: confSenhaNova
    };

    if(!data.email) {
        erroEmail.textContent = 'O campo email é obrigatório';
        return
    }
    if(!data.senhaAtual) {
        erroSenhaAtual.textContent = 'O campo senha atual é obrigatório';
        return
    }
    if(!data.senhaNova) {
        erroSenhaNova.textContent = 'O campo nova senha é obrigatório';
        return
    }
    if(!data.confSenha) {
        erroConfSenha.textContent = 'O campo de confirmação da senha é obrigatório';
        return
    }

    if(data.senhaNova.length < 6) {
        erroSenhaNova.textContent = 'A senha deve possuir no mínimo 6 caracteres';
        return
    }

    if(data.senhaNova !== data.confSenha) {
        erroConfSenha.textContent = 'As senhas não conferem';
        return
    }

    try{
        const updateResponse = await fetch(`http://localhost:3000/usuarios/senha/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        });
    
        const result = await updateResponse.json();
    
        if(!result.ok){
            if(result.message === 'Email incorreto'){
                erroEmail.textContent = result.message;
                return
            }
            if(result.message === 'Senha incorreta'){
                erroSenhaAtual.textContent = result.message;
                return
            }
            if(result.message === 'A senha nova é igual a atual'){
                erroSenhaNova.textContent = result.message;
                return
            }
        }

        window.location.href = 'login.html'

    } catch (error){
        console.log(error);
    }
}

formTrocarSenha.onsubmit = (e) => {
    e.preventDefault();
    trocarSenha(formTrocarSenha);
}