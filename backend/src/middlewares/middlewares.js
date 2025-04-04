import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const middlewares = {
    verifyToken: (req, res, next) => {
        const tokenHeader = req.headers.authorization;
        const token = tokenHeader.split(' ')[1];

        if(!token) return res.status(401).json({
            ok: false,
            status: 401,
            message: 'Acesso negado'
        });

        try {
            const dados = jwt.verify(token, SECRET);
            req.user = dados

            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                status: 401,
                message: 'Token invalido'
            });
        }
    },
    // verifyCargo: (req, res, next) => {

    // }
}

export default middlewares