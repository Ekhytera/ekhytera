const token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded', () => {
    if(!token) return

    const decoded = jwt_decode(token);
    console.log("Token decodificado:", decoded);

    let userAtual = decoded.userName;
    let userAtualEmail = decoded.email;
    let infoConta = document.getElementById('infoConta');
    let infoUser = document.getElementById('infoUser');
    let iconsNav = document.querySelector('.iconsNav');
    let userNameLogged = document.querySelector('.userNameLogged');

    if (!userAtual) {
        infoUser.innerHTML = '<h1 id="userName">Faça login!</h1>'
    }

    if (userAtual) {
        document.querySelectorAll('#userName').forEach(function (element) {
            element.innerHTML = userAtual;
        })
        document.querySelectorAll('#CadatroInfo').forEach(function (element) {
            element.innerHTML = userAtualEmail;
        })
        document.querySelectorAll('.userNameLogged').forEach(function (element, name) {
            name = userAtual.split(' ')[0]
            element.innerHTML = name
        })
        iconsNav.style.borderRadius = '10px';
        userNameLogged.style.display = 'block';

        infoConta.innerHTML = '<h3>Minha conta</h3> <p id="leave">Sair</p> <a href="trocarSenha.html">Alterar Senha</a>'

        document.querySelectorAll('#leave').forEach(function (element) {
            element.addEventListener('click', function () {
                localStorage.removeItem('token')
                window.location.reload(true);
            })
        })
    }
})