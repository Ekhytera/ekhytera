const token = localStorage.getItem('token');

export async function authUser() {
    if (token) {
        try {
            const resp = await fetch(`http://localhost:3000/usuarios/token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const dados = await resp.json();

            if (!resp.ok) {
                console.error(`Erro: ${dados.message}`);
                return null;
            }

            return dados.user;
        } catch (error) {
            console.error('Erro ao autenticar o usuário:', error);
            return null;
        }
    } else {
        console.warn('Token não encontrado no localStorage');
        return null;
    }
}

if (token) {
    authUser().then(user => {
        if (user) {
            console.log('Usuário autenticado:', user);
        } else {
            console.warn('Falha na autenticação do usuário.');
        }
    });
}