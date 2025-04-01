import users from '../database/users.js';
import { v4 as uuidv4 } from 'uuid'

const uuid = uuidv4()

const usersRepository = {
    async getAll() {
        return users;
    },
    async getById(id) {
        return users.find(item => item.id === id);
    },
    async getByEmail(email) {
        return users.find(item => item.email.toLowerCase() === email.toLowerCase());
    },
    async getByName(nome) {
        return users.find(item => item.nome.toLowerCase() === nome.toLowerCase());
    },
    async getByStatus() {
        return users.filter(item => item.status === 1);
    },
    async create(data){
        const newusers = {
            id: uuid,
            ...data,
            cargo: 'users',
            status: 1,
            createdAt: new Date()
        }

        users.push(newusers);
        return newusers;
    },
    async update(id, data) {
        const index = users.findIndex(item => item.id === id);

        if(index >= 0){
            if(data.nome) users[index].nome = data.nome;
            if(data.email) users[index].email = data.email;
            if(data.senha) users[index].senha = data.senha;
            if(data.descricao) users[index].descricao = data.descricao;
            if(data.num_telefone) users[index].num_telefone = data.num_telefone;
            if(data.genero) users[index].genero = data.genero;
            if(data.localizacao) users[index].localizacao = data.localizacao;
            if(data.dt_nascimento) users[index].dt_nascimento = data.dt_nascimento;

            return users[index];
        }
        return false
    },
    async deleteUpdate(id) {
        const delteusers = users.find(item => item.id === id);

        if(delteusers) return delteusers.status = 0;

        return false
    }
}

export default usersRepository;