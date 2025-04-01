import UserRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const UserController = {
    createUser: async (req, res) => {
        const { email, nome, senha } = req.body;

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });
        if (!nome) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo nome é obrigatório'
        });
        if (!senha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha é obrigatório'
        });

        const userExist = await UserRepository.getByEmail(email);

        if (userExist) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'email já cadastrado'
        });

        const nomeUser = await UserRepository.getByName(nome);

        if (nomeUser && nome === nomeUser.nome) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'esse nome de usuario já esta sendo utilizado'
        });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);

            const newUser = await UserRepository.create({
                email, nome, senha: hashSenha
            })

            if (newUser) return res.status(201).json({
                ok: true,
                status: 201,
                message: 'usuario criado com sucesso',
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    nome: newUser.nome,
                    senha: newUser.senha,
                    cargo: newUser.cargo,
                    createdAt: newUser.createdAt
                }
            })

            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Erro ao registrar usuario'
            });
        } catch (error) {
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },
    login: async (req, res) => {
        const { email, senha } = req.body;

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });
        if (!senha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha é obrigatório'
        });

        try {
            const user = await UserRepository.getByEmail(email);
            console.log(user)

            if (!user) return res.status(404).json({
                status: 404,
                ok: false,
                message: 'Usuario não encontrado'
            });

            const checarSenha = await bcrypt.compare(senha, user.senha);

            if (!checarSenha) return res.status(400).json({
                status: 400,
                ok: false,
                message: 'Senha inválida'
            });

            const token = jwt.sign({
                id: user.id,
                nome: user.nome,
                email: user.email
            },
                SECRET,
                { expiresIn: '14d' }
            );

            res.status(200).json({
                status: 200,
                ok: true,
                token: token,
                id: user.id
            });

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },
    updateUser: async (req, res) => {
        const id = req.params.id;
        const body = req.body;

        try {
            const updateUser = await UserRepository.update(id, body );
            console.log(updateUser)

            if (updateUser) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'usuario atualizado com sucesso',
                user: updateUser
            });

            return res.status(200).json({
                ok: false,
                status: 404,
                message: 'erro ao atualizar'
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

export default UserController