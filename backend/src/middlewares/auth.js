import jwt from 'jsonwebtoken';
import usersRepository from '../repositories/userRepository.js';
import postsRepository from '../repositories/postRepository.js';

const SECRET = process.env.JWT_SECRET;

const middlewares = {
    verifyToken: (req, res, next) => {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader ? tokenHeader.split(' ')[1] || tokenHeader : null;

        if (!token) return res.status(401).json({
            ok: false,
            status: 401,
            message: 'Acesso negado'
        });

        try {
            const payload = jwt.verify(token, SECRET);
            const id = payload.id ?? payload.id_usuario;
            req.user = { ...payload, id };
            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                status: 401,
                message: `Token inválido: ${error}`
            });
        }
    },
    optionalAuth: (req, res, next) => {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader ? tokenHeader.split(' ')[1] || tokenHeader : null;

        if (!token) return next();

        try {
            const payload = jwt.verify(token, SECRET);
            const id = payload.id ?? payload.id_usuario;
            req.user = { ...payload, id };
        } catch (error) {
            console.log(error)
        }
        next();
    },
    verifyStatus: async (req, res, next) => {
        const email = req.body.email;

        const user = await usersRepository.findUserByEmail(email);

        try {
            if (user) {
                if (!user.status) {
                    return res.status(404).json({
                        ok: false,
                        status: 404,
                        message: 'Usuario não encontrado ou email inválido'
                    })
                }
            }

            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                ok: false,
                status: 401,
                message: 'Erro no servidor'
            });
        }
    },
    authorizePostOwner: async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = req.user;

            const post = await postsRepository.findPostById(id);

            if (!post) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Post não encontrado'
                });
            }

            if (post.id_usuario === user.id || user.cargo === 'admin') {
                return next();
            }

            return res.status(403).json({
                ok: false,
                status: 403,
                message: "Permissão negada"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: "Erro no servidor"
            });
        }
    }
}

export default middlewares