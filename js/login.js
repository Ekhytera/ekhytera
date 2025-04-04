const formCadastrar = document.getElementById('cadastrar');
const formLogin = document.getElementById('loginForm')

if (window.location.pathname === '/cadastrar.html') {
    let timeOut;

    document.getElementById('newName').addEventListener('input', (e) => {
        const userName = e.target.value;
        const erroUserName = document.getElementById('erroUser');

        clearTimeout(timeOut);

        async function fetching() {
            if (!userName) {
                erroUserName.innerHTML = ''
                return
            }

            const resp = await fetch(`http://localhost:3000/usuarios/userName/${userName}`);
            const data = await resp.json();

            console.log(data)

            if (data.status == 200) {
                erroUserName.innerHTML = 'Esse nome de usuario já esta em uso'
            } else {
                erroUserName.innerHTML = ''
            }
        }

        timeOut = setTimeout(() => {
            fetching()
        }, 700)
    })


    async function cadastrar(form) {
        const erroSenha = document.getElementById('erroSenha');
        const erroEmail = document.getElementById('erroEmail');
        const erroUserName = document.getElementById('erroUser');
        erroSenha.innerHTML = '';
        erroEmail.innerHTML = '';
        erroUserName.innerHTML = '';

        const data = {
            email: form.newEmail.value,
            userName: form.newUserName.value,
            senha: form.addSenha.value
        }

        if (!data.email || !data.userName || !data.senha) {
            if (!data.email) {
                erroEmail.innerHTML = 'O campo e email é obrigatório'
            }

            if (!data.userName) {
                erroUserName.innerHTML = 'O compo nome é obrigatório'
            }

            if (!data.senha) {
                erroSenha.innerHTML = 'O compo senha é obrigatório'
            }

            if (data.senha.length < 6) {
                erroSenha.innerHTML = 'A senha tem q conter no minimo 6 caracteres'
            }
            return
        }


        try {
            const req = await fetch(`http://localhost:3000/cadastrar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const resp = await req.json();
            console.log(resp)

            if(resp.message === 'email já cadastrado'){
                erroEmail.innerHTML = resp.message;
                return
            }
            const auth = resp.user

            if (auth) {
                localStorage.setItem('auth', auth);
                location.href = 'login.html'
            }
        } catch (error) {
            console.log(error);
        }

    }

    formCadastrar.onsubmit = (e) => {
        e.preventDefault()
        cadastrar(formCadastrar)
    }
}


if (window.location.pathname === '/login.html') {
    async function login(form) {
        const erroSenha = document.getElementById('erroSenha');
        const erroEmail = document.getElementById('erroEmail');
        erroSenha.innerHTML = '';
        erroEmail.innerHTML = '';

        const data = {
            email: form.email.value,
            senha: form.senha.value
        }

        if(!data.email || !data.senha){
            if (!data.email) {
                erroEmail.innerHTML = 'O campo e email é obrigatório'
            }
            if (!data.senha) {
                erroSenha.innerHTML = 'O compo senha é obrigatório'
            }
            return
        }

        try {
            const req = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const resp = await req.json();

            if (resp.message === 'Usuario não encontrado') {
                erroEmail.innerHTML = resp.message
                return
            }

            if (resp.message === 'Senha inválida') {
                erroSenha.innerHTML = resp.senha
                return
            }

            const token = resp.token;

            if (token) {
                localStorage.setItem('token', token);
                location.href = 'index.html';
            }
        } catch (error) {
            console.log(error)
        }
    }

    formLogin.onsubmit = (e) => {
        e.preventDefault();
        login(formLogin);
    }
}


































































































// let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [
//     { id: 1, email: 'joao@gmail.com', userName: 'João', tipo: 'adm', senha: '123' },
//     { id: 2, email: 'henrique@gmail.com', userName: 'Henrique', senha: '123', tipo: 'adm' },
//     { id: 3, email: 'luiz@gmail.com', userName: 'Luiz', senha: '123', tipo: 'adm' },
//     { id: 4, email: 'pedro@gmail.com', userName: 'Pedro', senha: '123', tipo: 'adm' },
//     { id: 5, email: 'evelyn@gmail.com', userName: 'Evelyn', senha: '123', tipo: 'adm' },
//     { id: 6, email: 'savyo@gmail.com', userName: 'Sávyo', senha: '123', tipo: 'adm' },
//     { id: 7, email: 'rian@gmail.com', userName: 'Rian', senha: '123', tipo: 'adm' }
// ];

// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();
// })

// const erroEmail = document.querySelector('#erroEmail');
// const erroSenha = document.querySelector('#erroSenha');
// const erroUser = document.querySelector('#erroUser');

// function sair() {
//     sessionStorage.clear();
//     window.location.href = 'index.html';
// }

// function entrar() {
//     const inputEmail = document.querySelector('#email');
//     const inputSenha = document.querySelector('#senha');
//     let validateLogin = false;
//     let emailValido = false;
//     let senhaValida = false;

//     erroEmail.textContent = '';
//     erroSenha.textContent = '';
//     inputEmail.style.border = '';
//     inputSenha.style.border = '';

//     for (let i in allUsers) {
//         if (inputEmail.value === allUsers[i].email) {
//             emailValido = true;
//             if (inputSenha.value === allUsers[i].senha) {
//                 senhaValida = true;
//                 validateLogin = true;
//                 sessionStorage.setItem('userLogado', allUsers[i].userName);
//                 sessionStorage.setItem('userEmail', allUsers[i].email);
//                 sessionStorage.setItem('tipoUser', allUsers[i].tipo);
//                 sessionStorage.setItem('sair', '<li><button class="dropdown-item" id="leave">Sair</button></li>');
//                 window.location.href = 'index.html';
//                 break;
//             };
//         };
//     };

//     if (!validateLogin) {
//         if (!emailValido) {
//             erroEmail.textContent = 'E-mail não cadastrado.';
//             erroEmail.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//             inputEmail.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         }
//         if (emailValido && !senhaValida) {
//             erroSenha.textContent = 'Senha incorreta.';
//             erroSenha.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//             inputSenha.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         };
//     };
// };

// document.querySelector('#email').addEventListener('input', function () {
//     erroEmail.textContent = '';
//     this.style.border = '';
// });

// document.querySelector('#senha').addEventListener('input', function () {
//     erroSenha.textContent = '';
//     this.style.border = '';
// });

// function cadastrar() {
//     const inputEmail = document.querySelector('#newEmail');
//     const inputNome = document.querySelector('#newName');
//     const inputSenha = document.querySelector('#addSenha');
//     let emailExiste = false;
//     let valid = true;

//     erroEmail.textContent = '';
//     erroUser.textContent = '';
//     erroSenha.textContent = '';
//     inputEmail.style.border = '';
//     inputNome.style.border = '';
//     inputSenha.style.border = '';

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(inputEmail.value)) {
//         erroEmail.textContent = 'Formato de e-mail inválido';
//         erroEmail.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputEmail.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     for (let i in allUsers) {
//         if (inputEmail.value === allUsers[i].email) {
//             emailExiste = true;
//             break;
//         }
//     }

//     if (emailExiste) {
//         erroEmail.textContent = 'Este e-mail já está cadastrado';
//         erroEmail.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputEmail.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     if (inputNome.value.trim() === '') {
//         erroUser.textContent = 'Nome de usuário inválido';
//         erroUser.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputNome.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     if (inputSenha.value.length < 8) {
//         erroSenha.textContent = 'A senha deve ter pelo menos 8 caracteres';
//         erroSenha.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputSenha.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     if (valid) {
//         const newUser = {
//             id: allUsers.length + 1,
//             userName: inputNome.value,
//             email: inputEmail.value,
//             senha: inputSenha.value,
//             tipo: 'user'
//         };

//         allUsers.push(newUser);
//         localStorage.setItem('allUsers', JSON.stringify(allUsers));

//         window.location.href = 'login.html';
//     }
// }

// document.querySelector('#newEmail').addEventListener('input', function () {
//     erroEmail.textContent = '';
//     this.style.border = '';
// });

// document.querySelector('#newName').addEventListener('input', function () {
//     erroUser.textContent = '';
//     this.style.border = '';
// });

// document.querySelector('#addSenha').addEventListener('input', function () {
//     erroSenha.textContent = '';
//     this.style.border = '';
// });

// function trocarSenha() {
//     const inputEmail = document.querySelector('#emailTrocarSenha');
//     const inputSenha = document.querySelector('#senhaNova');
//     const inputConfSenha = document.querySelector('#confSenha');
//     const senhaDif = document.querySelector('#senhaDiferentes');
//     const emailNaoEnc = document.querySelector('#emailNaoEnc');
//     const senhaInv = document.querySelector('#senhaInv');

//     let usuarioEncontrado = false;
//     let valid = true;

//     emailNaoEnc.textContent = '';
//     senhaDif.textContent = '';
//     inputEmail.style.border = '';
//     inputSenha.style.border = '';
//     inputConfSenha.style.border = '';
//     senhaInv.textContent = '';

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(inputEmail.value)) {
//         emailNaoEnc.textContent = 'Formato de e-mail inválido';
//         emailNaoEnc.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputEmail.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     if (inputSenha.value.length < 8) {
//         senhaInv.textContent = 'A senha deve ter pelo menos 8 caracteres';
//         senhaInv.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputSenha.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }
//     if (inputSenha.value !== inputConfSenha.value) {
//         senhaDif.textContent = 'As senhas não coincidem';
//         senhaDif.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//         inputSenha.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         inputConfSenha.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         valid = false;
//     }

//     if (valid) {
//         for (let i in allUsers) {
//             if (inputEmail.value === allUsers[i].email) {
//                 usuarioEncontrado = true;
//                 allUsers[i].senha = inputSenha.value;
//                 localStorage.setItem('allUsers', JSON.stringify(allUsers));
//                 window.location.href = 'login.html';
//                 break;
//             }
//         }

//         if (!usuarioEncontrado) {
//             emailNaoEnc.textContent = 'Email não encontrado';
//             emailNaoEnc.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
//             inputEmail.style.border = '2px solid rgba(255, 0, 0, 0.7)';
//         }
//     }
// }

// document.querySelector('#emailTrocarSenha').addEventListener('input', function () {
//     emailNaoEnc.textContent = '';
//     this.style.border = '';
// });

// document.querySelector('#senhaNova').addEventListener('input', function () {
//     senhaDif.textContent = '';
//     this.style.border = '';
// });

// document.querySelector('#confSenha').addEventListener('input', function () {
//     senhaDif.textContent = '';
//     this.style.border = '';
// });