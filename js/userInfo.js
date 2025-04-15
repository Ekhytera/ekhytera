import { authUser } from './auth.js';
import createToast from './toast.js';

const currentUserName = document.getElementById('currentUserName');
const currentUserEmail = document.getElementById('currentUserEmail');

const userDescription = document.getElementById('userDescription');
const telefoneInput = document.getElementById('telefone');
const localizacaoInput = document.getElementById('localizacao');
const generoSelect = document.getElementById('genero');
const dataNascimentoInput = document.getElementById('dataNascimento');
const saveButton = document.getElementById('saveButton');
const deleteButton = document.getElementById('deleteButton');
const confirmButton = document.getElementById('confirm');
const modal = document.querySelector('.confirmModal');

let user;
let currentUserId = null;

authUser().then(userData => {
    if (userData && userData.users) {
        user = userData.users;
        currentUserId = user.id;

        currentUserName.textContent = user.userName || 'Usuário';
        currentUserEmail.textContent = user.email || 'Email não disponível';

        userDescription.value = user.descricao || '';
        telefoneInput.value = user.num_telefone || '';
        localizacaoInput.value = user.localizacao || '';
        generoSelect.value = user.genero || '';
        dataNascimentoInput.value = user.dt_nascimento || '';
    } else {
        currentUserName.textContent = 'Usuário não logado';
        currentUserEmail.textContent = '';
    }
}).catch(error => {
    console.error('Erro ao carregar informações do usuário:', error);
    currentUserName.textContent = 'Erro ao carregar usuário';
    currentUserEmail.textContent = '';
});

saveButton.addEventListener('click', async () => {
    if (!currentUserId) {
        console.error('Usuário não logado ou ID não encontrado.');
        return;
    }

        const updatedData = {
            userName: user.userName,
            email: user.email,
            foto: user.foto,
            descricao: userDescription.value,
            num_telefone: telefoneInput.value,
            genero: generoSelect.value,
            localizacao: localizacaoInput.value,
            dt_nascimento: dataNascimentoInput.value,
            status: user.status,
            cargo: user.cargo
        };

        const updateResponse = await fetch(`http://localhost:3000/usuarios/update/${currentUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedData),
        });

        const result = await updateResponse.json();

        if (updateResponse.ok) {
            createToast('Informação','Informações atualizadas com sucesso!','padrao');
        } else {
            console.error('Erro ao atualizar informações:', result.message);
            alert('Erro ao atualizar informações: ' + result.message);
        }
});

deleteButton.addEventListener('click', () => {
    if(modal.classList.contains('hide')){
        modal.classList.remove('hide');
    } else {
        deleteButton.classList.add('hide');
    }
})

modal.addEventListener('click', () =>{modal.classList.add('hide')});

document.querySelector('#cancel').addEventListener('click', () =>{
    modal.classList.add('hide')
})

confirmButton.addEventListener('click', async () => {
    const updateResponse = await fetch(`http://localhost:3000/usuarios/delete/${currentUserId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const result = await updateResponse.json();

    if (updateResponse.ok) {
        window.location.href = 'index.html'
        localStorage.removeItem('token');
    } else {
        console.error('Erro ao atualizar informações:', result.message);
        alert('Erro ao atualizar informações: ' + result.message);
    }
})