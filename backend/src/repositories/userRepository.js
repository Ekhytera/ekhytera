import users from '../database/users.js';
import { v4 as uuidv4 } from 'uuid'

const uuid = uuidv4()

const usersRepository = {
    async getAll() {
        return users.filter(item => item.status === 1);
    },
    async getById(id) {
        return users.find(item => item.id === id && item.status === 1);
    },
    async getByEmail(email) {
        return users.find(item => item.email.toLowerCase() === email.toLowerCase() && item.status === 1);
    },
    async getByUserName(userName) {
        return users.find(item => item.userName.toLowerCase() === userName.toLowerCase() && item.status === 1);
    },
    async getByStatus() {
        return users.filter(item => item.status === 1);
    },
    async create(data) {
        const newusers = {
            id: uuid,
            ...data,
            foto: null,
            descricao: null,
            num_telefone: null,
            genero: null,
            localizacao: null,
            dt_nascimento: null,
            cargo: 'user',
            status: 1,
            createdAt: new Date()
        }

        users.push(newusers);
        return newusers;
    },
    async update(id, data) {
        const index = users.findIndex(item => item.id === id);

        if (index >= 0) {
            users[index] = { ...users[index], ...data }

            return users[index];
        }
        return false
    },
    async deleteUpdate(id) {
        const deleteUser = users.find(item => item.id === id);

        if (deleteUser) {
            deleteUser.status = 0;
            return true
        }
        return false
    }
}

export default usersRepository;