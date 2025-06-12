import postsRepository from "../repositories/postRepository.js";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const PostController = {
    createPost: async (req, res) => {
        const { texto } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!texto) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Post não pode ser vazio'
        });

        if (!token) {
            return res.status(401).json({
                ok: false,
                status: 401,
                message: 'Token não fornecido'
            });
        }

        try {
            const decoded = jwt.verify(token, SECRET);
            const userId = decoded.id;

            const postData = {
                texto: texto,
                id_usuario: userId
            };

            const result = await postsRepository.create(postData);

            if (result.insertId) {
                return res.status(201).json({
                    ok: true,
                    status: 201,
                    message: 'Post criado com sucesso',
                    post: {
                        id: result.insertId,
                        texto: texto,
                        id_usuario: userId
                    }
                });
            }

            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Erro ao criar post'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: `Erro no servidor: ${error}`,
            });
        }
    }
}

export default PostController;