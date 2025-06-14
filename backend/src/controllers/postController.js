import postsRepository from "../repositories/postRepository.js";

const PostController = {
    createPost: async (req, res) => {
        const { texto } = req.body;
        const userId = req.user.id;

        if (!texto) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Post não pode ser vazio'
        });

        try {
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
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await postsRepository.findAllPosts();

            if (posts) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Posts encontrados com sucesso',
                posts: posts
            });

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Falha ao encontrar posts'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },
    getAllPostsByStatus: async (req, res) => {
        try {
            const posts = await postsRepository.findAllPostByStatus();

            if (posts) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Posts encontrados com sucesso',
                posts: posts
            });

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Falha ao encontrar posts'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },
    getPostById: async (req, res) => {
        const id = req.params.id;

        try {
            const post = await postsRepository.findPostById(id);

            if(post) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Post encontrado com sucesso',
                post: post
            });

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Post não encontrado'
            });

        } catch (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },
    logicalDeletePost: async (req, res) => {
        const id = req.params.id;
        console.log(id)

        try {
            const deleted = !!(await postsRepository.logicalDelete(id));

            if(deleted) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Post deletado com sucesso'
            });

            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Erro ao deletar post'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    }
}

export default PostController;