// import connection from "../database/mysqlconnection.js";

const postsRepository = {
    async getAllPosts() {
        const sql = 'SELECT * FROM tb_posts';
        try {
            const [rows] = await connection.promise().execute(sql);
            return rows;
        } catch (error) {
            throw new Error(`Database query failed: ${error.message}`);
        }
    },
    async create(post) {
        const sql = 'INSERT INTO tb_posts (texto, id_usuario, criado_em) VALUES (?, ?, NOW());';
        try {
            const [result] = await connection.promise().execute(sql, [
                post.texto,
                post.id_usuario,
            ]);
            return result;
        } catch (error) {
            throw new Error(`Falha ao criar post: ${error.message}`);
        }
    },
    async findAllPosts() {
        const sql = `SELECT 
            p.id_post, p.texto, p.imagem_post, p.curtidas, p.status, p.criado_em, p.id_usuario, 
            u.nome_usuario, u.endereco_imagem
        FROM 
            tb_posts p
        INNER JOIN 
            tb_usuarios u
        ON 
            p.id_usuario = u.id_usuario;`

        try {
            const [result] = await connection.promise().execute(sql);
            return result;
        } catch (error) {
            throw new Error(`Falha ao listar post: ${error.message}`);
        }
    },
    async findAllPostByStatus() {
        const sql = `SELECT 
            p.id_post, p.texto, p.imagem_post, p.curtidas, p.status, p.criado_em, p.id_usuario, 
            u.nome_usuario, u.endereco_imagem
        FROM 
            tb_posts p
        INNER JOIN 
            tb_usuarios u
        ON 
            p.id_usuario = u.id_usuario
        WHERE p.status = 1;`

        try {
            const [result] = await connection.promise().execute(sql);
            return result;
        } catch (error) {
            throw new Error(`Falha ao listar post: ${error.message}`);
        }
    },
    async findPostById(id) {
        const sql = `SELECT 
            p.id_post, p.texto, p.imagem_post, p.curtidas, p.status, p.criado_em, p.id_usuario, 
            u.nome_usuario, u.endereco_imagem
        FROM 
            tb_posts p
        INNER JOIN 
            tb_usuarios u
        ON 
            p.id_usuario = u.id_usuario
        WHERE p.status = 1 AND p.id_post = ?;`

        try {
            const [result] = await connection.promise().execute(sql, [id]);
            return result
        } catch (error) {
            throw new Error(`Falha ao encontrar post: ${error.message}`);
        }
    },
    async addLikeByPost(id) {
        const sql = `UPDATE tb_posts 
        SET curtidas = curtidas + 1 
        WHERE id_post = ?;`

        try {
            const [result] = await connection.promise().execute(sql, [id]);
            return result
        } catch (error) {
            throw new Error(`Falha ao curtir post: ${error.message}`);
        }
    },
    async removeLikeByPost(id) {
        const sql = `UPDATE tb_posts 
        SET curtidas = curtidas - 1 
        WHERE id_post = ?;`

        try {
            const [result] = await connection.promise().execute(sql, [id]);
            return result
        } catch (error) {
            throw new Error(`Falha ao remover a curtida: ${error.message}`);
        }
    },
    async logicalDelete(id) {
        const sql = `UPDATE tb_posts 
        SET status = 0
        WHERE id_post = ?;`;

        try {
            const [result] = await connection.promise().execute(sql, [id]);
            return result
        } catch (error) {
            throw new Error(`Falha ao apagar post: ${error.message}`);
        }
    },
    async editTextPost(id, text) {
        const sql = `UPDATE tb_posts 
        SET texto = ?
        WHERE id_post = ?;`;
        try {
            const [result] = await connection.promise().execute(sql, [text, id]);
            return result
        } catch (error) {
            throw new Error(`Falha ao apagar post: ${error.message}`);
        }
    }
}

export default postsRepository;