import users from '../database/users.js';
import connection from '../database/mysqlconnection.js';

const usersRepository = {
    async getAllUsers() {
        const sql = 'SELECT * FROM tb_usuarios';
        try {
            const [rows] = await connection.promise().execute(sql);
            return rows;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    },
    async findUserByID(user_id) {
        const sql = `SELECT * FROM tb_usuarios WHERE id_usuario = ?;`;
        try {
            const [rows] = await connection.promise().execute(sql, [user_id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to check for existing user: ${error.message}`);
        }
    },
    async findUserByEmail(email) {
        const sql = `SELECT * FROM tb_usuarios WHERE email = ?;`;
        try {
            const [rows] = await connection.promise().execute(sql, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to check for existing email: ${error.message}`);
        }
    },
    async findUserByUsername(username) {
        const sql = 'SELECT * FROM tb_usuarios WHERE nome_usuario = ?;';
        try {
            const [rows] = await connection.promise().execute(sql, [username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to check for existing user: ${error.message}`);
        }
    },
    async getByStatus() {
        return users.filter(item => item.status === 1);
    },
    async create(data) {
        const newusers = {
            id: new Date().getTime().toLocaleString(),
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