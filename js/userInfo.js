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
const userFoto = document.getElementById('userFoto');
const foto = document.getElementById('profile-input');
let file;

foto.addEventListener('change', (e) => {
    file = e.target.files?.[0];

    if (file) {
        userFoto.src = URL.createObjectURL(file);
    }
});

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

        if(user.foto){
            userFoto.src = `http://localhost:3000/files/${user.foto}`;
        }
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

    const formData = new FormData();

    if(foto) {
        formData.append('file', file)
    }

    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('descricao', userDescription.value);
    formData.append('num_telefone', telefoneInput.value);
    formData.append('genero', generoSelect.value);
    formData.append('localizacao', localizacaoInput.value);
    formData.append('dt_nascimento', dataNascimentoInput.value);

    if (
        (formData.userName || '').trim() === (user.userName || '').trim() &&
        (formData.email || '').trim() === (user.email || '').trim() &&
        (formData.foto || '').trim() === (user.foto || '').trim() &&
        (formData.descricao || '').trim() === (user.descricao || '').trim() &&
        (formData.num_telefone || '').trim() === (user.num_telefone || '').trim() &&
        (formData.genero || '').trim() === (user.genero || '').trim() &&
        (formData.localizacao || '').trim() === (user.localizacao || '').trim() &&
        (formData.dt_nascimento || '').trim() === (user.dt_nascimento || '').trim()
    ) {
        alert('Nenhuma alteração detectada');
        return;
    }

    const updateResponse = await fetch(`http://localhost:3000/usuarios/update/${currentUserId}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
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
    if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    } else {
        deleteButton.classList.add('hide');
    }
})

modal.addEventListener('click', () => { modal.classList.add('hide') });

document.querySelector('#cancel').addEventListener('click', () => {
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