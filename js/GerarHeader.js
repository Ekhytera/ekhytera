import { authUser } from "./auth.js";
let user;

function setThema() {
    const checkbox = document.querySelector('input[type="checkbox"]');
    const isChecked = checkbox.checked;

    if (isChecked) {
        document.querySelector('.slider').style.backgroundColor = '#79a7dd';
    } else {
        document.querySelector('.slider').style.backgroundColor = 'gray';
    }
}

function Header(item) {
    const header = `
        <nav class="icons">
            <a href="index.html"><img src="imgs/ekhyteralogo.png" alt="Logo Branca Ekhytera" class="logo"></a>
            <div>
                <img src="imgs/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" alt="Menu Icon" class="menuIcon">
            </div>
        </nav>

        <nav class="verticalNav">
            <div class="container-logo">
                <img src="imgs/logo_vazada1.png" alt="logo" id="logo">
            </div>
            <div class="contorno">
                <img src="imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" alt="foto" id="userFoto">
                <div id="infoUser">
                    <h1 id="userName">${item?.userName || 'Faça Login'}</h1>
                    <span id="CadatroInfo">${item?.email || ''}</span>
                </div>
                <img src="imgs/arrow_right.png" alt="arrow" id="seta">
            </div>

            <div id="infoConta">
                <h3>Minha conta</h3>
                ${item?.userName ?
            `<a href="#" onclick="Logout()">Sair da conta</a>
            <a href="trocarSenha.html">Trocar senha</a>`
            :
            `<a href="login.html">Fazer login</a>
            <a href="cadastrar.html">Cadastrar</a>`}
            </div>
            <hr>
            <ul id="menuVerticalNav">
                <li><a href="montagem.html">Montagem</a></li>
                <li><a href="educacao.html">Educação</a></li>
                <li><a href="forum.html">Fórum</a></li>
                <li><a href="catalogo.html">Catálogo</a></li>
                <li><a href="sobre_nos.html">Sobre nós</a></li>
                <hr>
            </ul>
            <div class="conf">
                <h3>Aparencia</h3>
                <div class="thema">
                    Modo claro
                    <label class="switch">
                        <input type="checkbox" onclick="setThema()">
                        <span class="slider"></span>
                    </label>
                </div>
                <hr>
                <h3>Opções</h3>
                <a href="config.html">Configurações</a>
                <p>Privacidade</p>
                <p>Termos de Serviço</p>
                <p>Ajuda</p>
            </div>
        </nav>

        <nav class="horizontalNav">
            <ul>
                <li><a href="montagem.html">Montagem</a></li>
                <li><a href="educacao.html">Educação</a></li>
                <li><a href="forum.html">Fórum</a></li>
                <li><a href="catalogo.html">Catálogo</a></li>
                <li><a href="sobre_nos.html">Sobre nós</a></li>
            </ul>
        </nav>

        <nav class="iconsNav menuIcon">
            <img src="https://img.icons8.com/?size=30&id=JFpp84FpjBA0&format=png&color=FFFFFF" alt="user icon">
            <p class="userNameLogged">
                ${item?.userName?.split(' ')[0] || ''}
            </p>
        </nav>
    `;
    document.querySelector('header').innerHTML = header;

    const iconsNav = document.querySelector('.iconsNav');
    const userNameLogged = document.querySelector('.userNameLogged');

    if (item?.userName) {
        iconsNav.style.borderRadius = '10px';
        userNameLogged.style.display = 'block';
    }
}

authUser().then(dados => {
    if (dados && dados.users) {
        user = dados.users;
        Header({
            email: user.email,
            userName: user.userName
        });
    } else {
        Header({});
    }

    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('headerLoaded'));
    }, 0);

});

function Logout() {
    localStorage.removeItem('token');
    window.location.reload(true);
}

window.setThema = setThema;
window.Logout = Logout;