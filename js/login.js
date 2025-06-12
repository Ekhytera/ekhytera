if (window.location.pathname === '/cadastrar.html') {
    const formCadastrar = document.getElementById('cadastrar');
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
            nome_usuario: form.newUserName.value,
            senha: form.addSenha.value
        }

        if (!data.email || !data.nome_usuario || !data.senha) {
            if (!data.email) {
                erroEmail.innerHTML = 'O campo e email é obrigatório'
            }

            if (!data.nome_usuario) {
                erroUserName.innerHTML = 'O compo nome é obrigatório'
            }

            if (!data.senha) {
                erroSenha.innerHTML = 'O compo senha é obrigatório'
            }
            return
        }
        if (data.senha.length < 6) {
            erroSenha.innerHTML = 'A senha deve conter no mínimo 6 caracteres.';
            return
        }


        try {
            console.log(data)
            const req = await fetch(`http://localhost:3000/cadastrar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const resp = await req.json();
            console.log(resp)

            if (resp.message === 'email já cadastrado') {
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
    const formLogin = document.getElementById('loginForm');
    async function login(form) {
        const erroSenha = document.getElementById('erroSenha');
        const erroEmail = document.getElementById('erroEmail');
        erroSenha.innerHTML = '';
        erroEmail.innerHTML = '';

        const data = {
            email: form.email.value,
            senha: form.senha.value
        }

        if (!data.email || !data.senha) {
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
                erroSenha.innerHTML = resp.message
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

