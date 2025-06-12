import connection from "../database/mysqlconnection.js";

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
        const sql = 'INSERT INTO tb_posts (texto, id_usuario, postado_em) VALUES (?, ?, NOW());';
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
            p.id_post, p.texto, p.imagem_post, p.curtidas, p.status, p.criado_erm, p.id_usuario, 
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
    }
}

export default postsRepository;