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
    let hasChanges = false;

    // Verifica se há nova imagem
    if (file) {
        formData.append('file', file);
        hasChanges = true; // Nova imagem significa alteração
    }

    // Adiciona campos ao FormData e verifica alterações
    const fieldsToCheck = [
        { name: 'userName', value: user.userName, current: user.userName },
        { name: 'email', value: user.email, current: user.email },
        { name: 'descricao', value: userDescription.value, current: user.descricao },
        { name: 'num_telefone', value: telefoneInput.value, current: user.num_telefone },
        { name: 'genero', value: generoSelect.value, current: user.genero },
        { name: 'localizacao', value: localizacaoInput.value, current: user.localizacao },
        { name: 'dt_nascimento', value: dataNascimentoInput.value, current: user.dt_nascimento }
    ];

    fieldsToCheck.forEach(field => {
        formData.append(field.name, field.value);
        if (String(field.value || '').trim() !== String(field.current || '').trim()) {
            hasChanges = true;
        }
    });

    if (!hasChanges && !file) {
        createToast('Aviso', 'Nenhuma alteração encontrada', 'vermelho');
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