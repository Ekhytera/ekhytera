import { authUser } from './auth.js';

const currentUserName = document.getElementById('currentUserName');
const currentUserEmail = document.getElementById('currentUserEmail');

const userDescription = document.getElementById('userDescription');
const telefoneInput = document.getElementById('telefone');
const localizacaoInput = document.getElementById('localizacao');
const generoSelect = document.getElementById('genero');
const dataNascimentoInput = document.getElementById('dataNascimento');
const saveButton = document.getElementById('saveButton');

let currentUserId = null;

authUser().then(userData => {
    if (userData && userData.users) {
        const user = userData.users;
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
        email: currentUserEmail.textContent,
        descricao: userDescription.value,
        num_telefone: telefoneInput.value,
        localizacao: localizacaoInput.value,
        genero: generoSelect.value,
        dt_nascimento: dataNascimentoInput.value,
    };

    try {
        const response = await fetch(`http://localhost:3000/usuarios/update/${currentUserId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Informações atualizadas com sucesso!');
        } else {
            console.error('Erro ao atualizar informações:', result.message);
            alert('Erro ao atualizar informações: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar atualização:', error);
        alert('Erro ao enviar atualização.');
    }
});