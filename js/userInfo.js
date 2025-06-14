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
const passwordModal = document.querySelector('.containerConfirmModal');

let file;
let fileChanged = false;

foto.addEventListener('change', (e) => {
    file = e.target.files?.[0];
    fileChanged = true;

    if (file) {
        userFoto.src = URL.createObjectURL(file);
    }
});

document.querySelector('.excluir').addEventListener('click', () => {
    file = '';
    fileChanged = true;
    userFoto.src = 'imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
})

let user;
let currentUserId = null;

function formatDateForInput(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

authUser().then(userData => {
    if (userData) {
        user = userData;
        currentUserId = user.id_usuario;

        currentUserName.textContent = user.nome_usuario || 'Usuário';
        currentUserEmail.textContent = user.email || 'Email não disponível';

        userDescription.value = user.descricao || '';
        telefoneInput.value = user.num_telefone || '';
        localizacaoInput.value = user.localizacao || '';
        generoSelect.value = user.genero || '';
        dataNascimentoInput.value = formatDateForInput(user.dt_nascimento) || '';

        if (user.endereco_imagem) {
            userFoto.src = `http://localhost:3000/files/${user.endereco_imagem}`;

            const imageUrl = `http://localhost:3000/files/${user.endereco_imagem}`;
            userFoto.src = imageUrl;

            fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                    const convertFile = new File([blob], user.foto, { type: blob.type });
                    file = convertFile
                })
                .catch(error => {
                    console.error('Erro ao converter imagem para File:', error);
                });
        } else {
            userFoto.src = 'imgs/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg';
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


async function editProfile(senha) {
    const formData = new FormData();

    if (!currentUserId) {
        console.error('Usuário não logado ou ID não encontrado.');
        return;
    }

    let hasChanges = false;

    if (file) {
        formData.append('file', file);
    }

    const fieldsToCheck = [
        { name: 'nome_usuario', value: user.nome_usuario, current: user.nome_usuario },
        { name: 'email', value: user.email, current: user.email },
        { name: 'descricao', value: userDescription.value, current: user.descricao },
        { name: 'num_telefone', value: telefoneInput.value, current: user.num_telefone },
        { name: 'genero', value: generoSelect.value, current: user.genero },
        { name: 'localizacao', value: localizacaoInput.value, current: user.localizacao },
        { name: 'dt_nascimento', value: dataNascimentoInput.value, current: formatDateForInput(user.dt_nascimento) }
    ];

    fieldsToCheck.forEach(field => {
        formData.append(field.name, field.value);
        if (String(field.value || '').trim() !== String(field.current || '').trim()) {
            hasChanges = true;
        }
    });

    formData.append('senha', senha)

    if (!hasChanges && !fileChanged) {
        createToast('Aviso', 'Nenhuma alteração encontrada', 'vermelho');
        return;
    }

    const updateResponse = await fetch(`http://localhost:3000/update-user`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
    });

    const result = await updateResponse.json();

    if (updateResponse.ok) {
        createToast('Informação', 'Informações atualizadas com sucesso!', 'padrao');
        passwordModal.classList.add('hide');

    } else {
        console.error('Erro ao atualizar informações:', result.message);
        alert('Erro ao atualizar informações: ' + result.message);
    }
}

saveButton.addEventListener('click', () => {
    passwordModal.classList.remove('hide');
});


document.querySelector('#confirmPass').addEventListener('click', () => {
    const input = document.querySelector('#confSenha');

    if (input.value.trim() === "") {
        console.log('O campo é obrigatório');
        return
    }

    editProfile(input.value);
})

document.querySelector('#cancelPass').addEventListener('click', () => {
    passwordModal.classList.add('hide');
})

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
    const updateResponse = await fetch(`http://localhost:3000/delete-user`, {
        method: 'PATCH',
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