/*  FUNCIONAMENTO: -------
A função prepareToaster() é chamada automaticamente quando o 
script é importado em algum HTML. (conforme última linha)
Ela cria um elemento toast-container que irá conter todas as 
toasts e empilhar elas corretamente conforme novas toasts são
criadas.

A função createToast() deverá ser chamada com pelo menos o
título e a mensagem para que seja mostrada corretamente ao
usuário.

No HTML será necessário importar tanto este script como o
toast.css. Também é interessante adicionar data-bs-theme="dark"
na raiz do HTML para combinar com a temática do site.
*/

const toastDisappearDelayMs = 5000 /* tempo que levará até a toast desaparecer */
const toastTransitionMs = 1000 /* este valor tem que combinar com o transition no arquivo toast.css */
const corPadrao = "#79A7DD" /* cor customizável para as toasts */
const corVermelho = "#EB4B61" /* cor customizável para as toasts */

function prepareToaster() {
    const toaster = document.createElement('div')
    toaster.className = 'toast-container position-fixed'
    toaster.id = 'toaster'
    document.body.appendChild(toaster)
}

function createToast(title, message, color = null, subtitle = null) {
    const toaster = document.getElementById('toaster');
    if (!toaster) {
        console.warn('Toaster container não encontrado.');
        return;
    }

    const toastRoot = document.createElement('div');
    toastRoot.className = 'toast show';
    toastRoot.setAttribute('role', 'alert');
    toastRoot.setAttribute('aria-live', 'assertive');
    toastRoot.setAttribute('aria-atomic', 'true');

    const toastHeader = document.createElement('div');
    toastHeader.className = 'toast-header';

    const titleEl = document.createElement('strong');
    titleEl.className = 'me-auto';
    titleEl.innerHTML = title;

    const subtitleEl = document.createElement('small');
    subtitleEl.className = 'text-body-secondary';
    if (subtitle) subtitleEl.innerHTML = subtitle;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn-close';
    closeButton.setAttribute('data-bs-dismiss', 'toast');
    closeButton.setAttribute('aria-label', 'Close');

    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.innerHTML = message;

    toastHeader.appendChild(titleEl);
    if (subtitle) toastHeader.appendChild(subtitleEl);
    toastHeader.appendChild(closeButton);

    toastRoot.appendChild(toastHeader);
    toastRoot.appendChild(toastBody);

    toaster.appendChild(toastRoot);

    if (color) {
        toastRoot.style.borderLeft = `4px solid ${color === "padrao" ? corPadrao : color === "vermelho" ? corVermelho : color}`;
    }

    setTimeout(() => {
        toastRoot.style.opacity = '0'

        setTimeout(() => {
            toastRoot.style.display = 'none'
        }, toastDisappearDelayMs + toastTransitionMs)

    }, toastDisappearDelayMs)
}

// Essa função criará algumas toasts para fins de teste.
function selfTest() {
    prepareToaster()
    createToast('Teste 1', 'Olá mundo!', 'blue', 'agora')
    setTimeout(() => {
        createToast('Teste 2', 'Olá novamente!', 'red', 'agora')
    }, 1000)
    setTimeout(() => {
        createToast('Teste 3', 'Olá de novo!', 'green', 'agora')
    }, 1500)
    setTimeout(() => {
        createToast('Teste 4', 'Saudações!', 'yellow', 'agora')
    }, 2500)
}


// para testar as toasts, troque a função que está no event listener abaixo pela função self test.
window.addEventListener('load', prepareToaster)

export default createToast