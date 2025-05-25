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
    async findUserByToken(userId) {
        const sql = `SELECT * FROM tb_usuarios WHERE id_usuario = ?;`;
        try {
            const [rows] = await connection.promise().execute(sql, [userId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error(`Failed to find user by token: ${error.message}`);
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
    async updateInfo(id, data) {
        try {
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
    async logicalDelete(id) {
        const sql = `UPDATE tb_usuarios SET status = 0 where id_usuario = ?`;
        try {
            const [result] = await connection.promise().execute(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Failed to update status user: ${error.message}`);
        }
    }
}

export default usersRepository;