// Não funcional por enquanto...
import createToast from './toast.js'

// Adiciona função de simular envio do email para newsletter
function configureButton() {
    const botao = document.getElementById("newsletterEmailButton")
    botao.addEventListener("click", handleNewsletterEmailSubmit)
}
// Por enquanto essa função apenas finge que está enviando o email para algum lugar
function handleNewsletterEmailSubmit() {
    const campoEmail = document.getElementById("newsletterEmail")
    campoEmail.value = ""
    console.warn("Atenção: o envio de e-mails para newsletter ainda não foi implementado.")
    createToast("Informação", "Seu e-mail está registrado na nossa lista de transmissão!", "#79A7DD")
    alert("Informação: A adição de emails à newsletter do site ainda não foi implementada.")
}

window.addEventListener("load", configureButton)