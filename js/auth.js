const token = localStorage.getItem('token');
let decoded = null;

if (token) {
    decoded = jwt_decode(token);
}

export async function authUser() {
    if (decoded) {
        const id = decoded.id;

        try {
            const resp = await fetch(`http://localhost:3000/usuarios/id/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            });

            const dados = await resp.json();

            if (!resp.ok) {
                console.error(`Erro: ${dados.message}`);
                return
            }

            return dados
        } catch (error) {
            console.error(error)
        }
    } 
}

if (token) {
    authUser();
}