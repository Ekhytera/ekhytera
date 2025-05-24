import users from '../database/users.js';
import connection from '../database/mysqlconnection.js';
import bcrypt from 'bcrypt';

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
        const sql = 'SELECT * FROM tb_usuarios WHERE status = 1;';
        try {
            const [rows] = await connection.promise().execute(sql);
            return rows;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    },
    async create(user) {
        const sql = `
        INSERT INTO tb_usuarios (nome_usuario, email, senha)
        VALUES (?, ?, ?);
    `;
        try {
            const [result] = await connection.promise().execute(sql, [
                user.nome_usuario,
                user.email,
                user.senha,
            ]);
            return { success: true, insertId: result.insertId };
        } catch (error) {
            throw new Error(`Failed to register user: ${error.message}`);
        }
    },
    async updateInfo(id, data, password) {
        const getPasswordSql = `SELECT senha FROM tb_usuarios WHERE id_usuario = ?;`;
        try {
            const [rows] = await connection.promise().execute(getPasswordSql, [id]);
            if (rows.length === 0) {
                throw new Error('Usuário não encontrado');
            }

            const currentPassword = rows[0].senha;

            const isPasswordValid = await bcrypt.compare(password, currentPassword);
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            const {
                nome_usuario = null,
                email = null,
                descricao = null,
                num_telefone = null,
                genero = null,
                localizacao = null,
                dt_nascimento = null,
                endereco_imagem = null
            } = data;

            const sql = `
            UPDATE tb_usuarios
            SET 
                nome_usuario = ?, 
                email = ?, 
                descricao = ?, 
                num_telefone = ?, 
                genero = ?, 
                localizacao = ?, 
                dt_nascimento = ?, 
                endereco_imagem = ?
            WHERE id_usuario = ?;
        `;
            const [result] = await connection.promise().execute(sql, [
                nome_usuario,
                email,
                descricao,
                num_telefone,
                genero,
                localizacao,
                dt_nascimento,
                endereco_imagem,
                id,
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
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