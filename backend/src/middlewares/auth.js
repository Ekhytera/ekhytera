import jwt from 'jsonwebtoken';
import usersRepository from '../repositories/userRepository.js';

const SECRET = process.env.JWT_SECRET;

const middlewares = {
    verifyToken: (req, res, next) => {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader ? tokenHeader.split(' ')[1] || tokenHeader : null;

        if(!token) return res.status(401).json({
            ok: false,
            status: 401,
            message: 'Acesso negado'
        });

        try {
            const dados = jwt.verify(token, SECRET);
            req.user = dados;

            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                status: 401,
                message: 'Token invalido'
            });
        }
    },
    verifyStatus: async (req, res, next) => {
        const email = req.body.email;

        const user = await usersRepository.findUserByEmail(email);
        console.log(user);

        try {
            if(!user.status){
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Usuario não encontrado'
                })
            }

            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({
                ok: false,
                status: 401,
                message: 'Erro no servidot'
            });
        }
    }
}

export default middlewares