const footer = document.createElement("footer")
const footerHTML = `
        <div class="box">
            <h3>Ajuda</h3>
            <a href="#">Nos contate</a>
            <a href="#">FAQ</a>
            <a href="#">Nos contate</a>
            <a href="#">FAQ</a>
        </div>
        <div class="box">
            <h3>A Empresa</h3>
            <a href="#">Sobre nós</a>
            <a href="#">Código de Ética</a>
            <a href="#">Política de Cookies e Privacidade</a>
            <a href="#">Informações Corporativas</a>
        </div>
        <div class="box">
            <h3>Newsletter</h3>
            <p>Se inscreva no nosso newsletter para receber novidades e notícias!</p>
            <div>
                <input type="text" id="newsletterEmail" placeholder="E-mail" title="email">
                <button type="button" id="newsletterEmailButton" class="button primario arredondado">Enviar</button>
            </div>
            <h3>País/Região</h3>
            <select name="paisregiao" title="País/Região">
                <option value="br">Brasil</option>
                <option value="usa">Estados Unidos</option>
                <option value="jp">Japão</option>
            </select>
        </div>
`
footer.innerHTML = footerHTML
document.body.appendChild(footer)
document.dispatchEvent(new CustomEvent('footerLoaded'));