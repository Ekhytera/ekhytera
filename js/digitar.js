const texto = 'FAÇA A ESCOLHA CERTA!';
const title = document.getElementById('title');

title.innerHTML = texto
    .split('')
    .map(letra => `<span style="opacity:0">${letra}</span>`)
    .join('');

const spans = title.querySelectorAll('span');
let i = 0;

function digitar() {
    if (i < spans.length) {
        spans[i].style.opacity = 1;
        i++;
        setTimeout(digitar, 70);
    }
}



window.onload = () => digitar()