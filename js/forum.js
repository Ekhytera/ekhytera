import { authUser } from "./auth.js";
import createToast from "./toast.js"

const postInput = document.getElementById('writePostInput');
let cargo;
let userId;

document.addEventListener('DOMContentLoaded', function () {
    authUser().then(dados => {
        console.log(dados)
        if (dados) {
            cargo = dados.cargo;
            userId = dados.id_usuario;

            const fotoPerfil = document.querySelector('.writePostContainer .fotoPerfil');
            if (fotoPerfil) {
                if (dados.endereco_imagem) {
                    fotoPerfil.src = `http://localhost:3000/files/${dados.endereco_imagem}`;
                } else {
                    fotoPerfil.src = 'imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
                }
            }
        }
        console.log(dados)

        if (!userId) {
            postInput.setAttribute('readonly', 'true');
            postInput.setAttribute('placeholder', 'Faça login ou crie uma conta para fazer postagens.')
        }
    })
})


function hideMenu() {
    const postOptionsList = document.getElementsByClassName('postOptions');
    if (postOptionsList.length > 0) {
        Array.from(postOptionsList).forEach(element => {
            element.style.height = '0px';
            element.style.opacity = '0%';
            setTimeout(() => { element.remove(); }, 1000);
        });
    }
}

function listItem(text) {
    const li = document.createElement('li');
    li.innerHTML = text;
    return li;
}

async function handleDeletePost(id) {
    try {
        const deletePost = await fetch(`http://localhost:3000/delete-post/${id}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(deletePost)

        if (deletePost.ok == false) {
            throw new Error('Falha ao deletar post');
        } else {
            createToast("Informação", "Post deletado com sucesso.", "vermelho");
        }

    } catch (error) {
        console.log(error)
        createToast('Error', 'Erro ao deletar post', 'vermelho');
    }
}

export function showMenu(caller) {
    const postElement = caller.closest('article');
    const userPostId = postElement.dataset.id;
    const postId = postElement.dataset.post;
    console.log(postElement.dataset.post)

    const postOptionsList = document.getElementsByClassName('postOptions');
    if (postOptionsList.length > 0) {
        Array.from(postOptionsList).forEach(element => {
            element.remove();
        });
    }

    const clickOutArea = document.createElement('div');
    clickOutArea.style.display = 'block';
    clickOutArea.style.position = 'fixed';
    clickOutArea.style.top = '0';
    clickOutArea.style.left = '0';
    clickOutArea.style.width = '100vw';
    clickOutArea.style.height = '100vh';
    clickOutArea.addEventListener('mouseup', (e) => { e.target.remove(); hideMenu(); });
    document.body.appendChild(clickOutArea);

    let postOptions = document.createElement('div');
    postOptions.classList.add('postOptions');
    const ul = document.createElement('ul');

    ul.appendChild(listItem('Salvar'));
    ul.appendChild(document.createElement('hr'));
    ul.appendChild(listItem('Denunciar'));

    ul.children[0].addEventListener('click', () => {
        createToast('Erro', 'Função ainda não disponivel', 'vermelho')
    });

    ul.children[2].addEventListener('click', () => {
        createToast('Erro', 'Função ainda não disponivel', 'vermelho')
    });


    if (cargo === 'admin' || userId == userPostId) {
        const deleteOption = listItem('Deletar');
        const editOption = listItem('Editar');
        deleteOption.classList.add('delete');

        deleteOption.addEventListener('click', function () {
            if (deleteOption.innerHTML === 'Deletar') {
                deleteOption.innerHTML = 'Confirmar';
                deleteOption.removeEventListener('click', arguments.caller);
                deleteOption.addEventListener('click', function () {
                    const post = caller.closest('.postWrapper');
                    if (post) {
                        document.body.removeChild(clickOutArea);
                        post.remove();
                        hideMenu();
                        handleDeletePost(postId);
                    }
                });
            }
        });

        editOption.addEventListener('click', () => {
            document.body.removeChild(clickOutArea);
            hideMenu();
            const p = postElement.querySelector('#p-text');
            const divText = postElement.querySelector('.div-text');
            const text = document.createElement('textarea');
            text.id = 'text';
            text.value = p.innerHTML;
            divText.removeChild(p);
            divText.appendChild(text);
            text.focus();

            const textAntigo = text.value;

            text.addEventListener('blur', async () => {
                const p = document.createElement('p');
                p.id = 'p-text';
                p.innerText = text.value;
                divText.removeChild(text);
                divText.appendChild(p);

                if (!text.value) {
                    text.focus();
                    createToast('Erro', 'Valor invalido. Preencha o campo.', 'vermelho');
                } else {
                    try {
                        if (text.value != textAntigo) {
                            const response = await fetch(`http://127.0.0.1:3000/edit-post/${postId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                },
                                body: JSON.stringify({
                                    texto: text.value.trim()
                                })
                            });

                            const result = await response.json()

                            if (!result.ok) {
                                throw new Error('Erro ao editar');
                            } else {
                                createToast("Informação", "Post atualizado com sucesso!", "padrao");
                            }
                        } else {
                            createToast("Informação", "Nenhuma alteração encontrada!", "padrao");
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            });
        })

        ul.appendChild(document.createElement('hr'));
        ul.appendChild(editOption)
        ul.appendChild(document.createElement('hr'));
        ul.appendChild(deleteOption);
    }

    postOptions.appendChild(ul);
    document.getElementById('body').appendChild(postOptions);

    const buttonRect = caller.getBoundingClientRect();
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    postOptions.style.left = (buttonRect.left + scrollLeft - buttonRect.width * 4) + 'px';
    postOptions.style.top = (buttonRect.top + scrollTop + buttonRect.height) + 'px';

    postOptions.style.height = '';
    postOptions.style.opacity = '100%';
}

const button = document.getElementById('rascunho');
const texto = document.getElementById('writePostInput');

button.addEventListener('click', () => {
    localStorage.setItem('rascunho', texto.value);
});

if (localStorage.getItem('rascunho')) {
    texto.addEventListener('input', (e) => {
        if (!e.target.value) {
            localStorage.removeItem('rascunho')
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('rascunho')) {
        texto.value = localStorage.getItem('rascunho')
    }
});



document.querySelectorAll('.not-available').forEach(el => {
    el.addEventListener('click', () => {
        createToast('Erro', 'Função ainda não disponivel', 'vermelho')
    })
})





