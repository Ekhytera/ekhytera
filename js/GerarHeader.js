const token = localStorage.getItem('token');
let decoded = null;

if (token) {
    decoded = jwt_decode(token);
    console.log("Token decodificado:", decoded);
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
                    <h1 id="userName">${decoded ? item.nome : 'Faça Login'}</h1>
                    <span id="CadatroInfo">${item.email}</span>
                </div>
                <img src="imgs/arrow_right.png" alt="arrow" id="seta">
            </div>

            <div id="infoConta">
                <h3>Minha conta</h3>
                ${token ?
            `<a href="#" onclick="Logout()">${item.infoConta[2]}</a>
                    <a href="trocarSenha.html">${item.infoConta[3]}</a>`
            :
            `<a href="login.html">${item.infoConta[0]}</a>
                    <a href="cadastrar.html">${item.infoConta[1]}</a>`
        }
            </div>
            <hr>
            <ul id="menuVerticalNav">
                <li><a href="montagem.html">Montagem</a></li>
                <li><a href="educacao.html">Educação</a></li>
                <li><a href="forum.html">Fórum</a></li>
                <li><a href="catalogo.html">Catálogo</a></li>
                <!-- <li><a href="promocoes.html">Promoções</a></li> -->
                <li><a href="sobre_nos.html">Sobre nós</a></li>
                <hr>
            </ul>
            <div class="conf">
                <h3>Aparencia</h3>
                <p>
                    <span>Modo claro</span> <input type="checkbox" name="" id="">
                </p>
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
                <!-- <li><a href="promocoes.html">Promoções</a></li> -->
                <li><a href="sobre_nos.html">Sobre nós</a></li>
            </ul>
        </nav>

        <nav class="iconsNav menuIcon">
            <img src="https://img.icons8.com/?size=30&id=JFpp84FpjBA0&format=png&color=FFFFFF" alt="user icon">
            <p class="userNameLogged">
                ${item.nome ? item.nome.split(' ')[0] : ''}
            </p>
        </nav>
`
    document.querySelector('header').innerHTML = header;


    let iconsNav = document.querySelector('.iconsNav');
    let userNameLogged = document.querySelector('.userNameLogged');

    if (item.nome === decoded.userName) {
        iconsNav.style.borderRadius = '10px';
        userNameLogged.style.display = 'block';
    }
}

const headerHtml = Header({
    email: decoded ? decoded.email : '',
    nome: decoded ? decoded.userName : '',
    infoConta: ['Fazer login', 'Criar conta', 'Logout', 'Alterar senha'],
})


function Logout() {
    localStorage.removeItem('token')
    window.location.reload(true);
}
