import UserRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const UserController = {
    createUser: async (req, res) => {
        const { email, userName, senha } = req.body;

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });
        if (!userName) return res.status(400).json({
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

        const nomeUser = await UserRepository.getByUserName(userName);

        if (nomeUser && userName === nomeUser.userName) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'esse nome de usuario já esta sendo utilizado'
        });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);

            const newUser = await UserRepository.create({
                email, userName, senha: hashSenha
            })

            if (newUser) {
                return res.status(201).json({
                    ok: true,
                    status: 201,
                    message: 'usuario criado com sucesso',
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        userName: newUser.userName,
                        cargo: newUser.cargo
                    }
                })
            }

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
                userName: user.userName,
                email: user.email,
                cargo: user.cargo
            },
                SECRET,
                { expiresIn: '14d' }
            );

            console.log(user);

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

    getAllUser: async (req, res) => {
        try {
            const users = await UserRepository.getAll();

            if (users) {
                delete users.senha

                return res.status(200).json({
                    ok: false,
                    status: 200,
                    message: 'Erro no servidor',
                    users: users
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro no servidor'
            });
        }
    },

    getUserById: async (req, res) => {
        try {
            const id = req.params.id;

            const user = await UserRepository.getById(id);

            if (user) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'usuario encontrado com sucesso',
                    users: user
                });
            }

            return res.status(440).json({
                ok: false,
                status: 440,
                message: 'Erro ao encontrar com usuario',
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

    getUserByUserName: async (req, res) => {
        const { userName } = req.params;

        const nomeUser = await UserRepository.getByUserName(userName);

        try {
            if (nomeUser) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'usuario encontrado com sucesso',
                user: nomeUser.userName
            });

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'nenhum usuario com esse nome foi encontrado',
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

    getUserByEmail: async (req, res) => {
        const { email } = req.params;
        const user = await UserRepository.getByEmail(email);

        try {
            if (user) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuario encontrado com sucesso',
                user: user
            });

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Usuario não encontrado',
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

    updateUser: async (req, res) => {
        const id = req.params.id;
        const { email, userName, descricao, num_telefone, genero, localizacao, dt_nascimento } = req.body;
        const file = req.file;
        let foto;

        if(file) {
            foto = file.filename;
        }

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });

        if (!userName) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo nome é obrigatório'
        });

        try {
            const updateUser = await UserRepository.update(id, { email, userName, foto, descricao, num_telefone, genero, localizacao, dt_nascimento });

            if (updateUser) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'usuario atualizado com sucesso'
            });

            return res.status(404).json({
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
    },

    updatePassword: async (req, res) => {
        const id = req.params.id
        const { email, senhaAtual, senhaNova, confSenha } = req.body;

        const user = await UserRepository.getById(id);

        if (!user) return res.status(404).json({
            ok: false,
            status: 404,
            message: 'Usuario não encontrado'
        });

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });

        if (!senhaAtual) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha atual é obrigatório'
        });

        if (!senhaNova) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha é obrigatório'
        });

        if (!confSenha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha é obrigatório'
        });

        if (email !== user.email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Email incorreto'
        });

        const checkSenha = await bcrypt.compare(senhaAtual, user.senha);

        if (!checkSenha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'Senha incorreta'
        });

        if (senhaNova !== confSenha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'As senhas não conferem'
        });

        const checkNovaSenha = await bcrypt.compare(senhaNova, user.senha);

        if (checkNovaSenha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'A senha nova é igual a atual'
        });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senhaNova, salt);

            const updateUser = await UserRepository.update(id, { senha: hashSenha });

            if (updateUser) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Senha atualizada com sucesso'
            });

            return res.status(404).json({
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
    },

    updateDeleteUser: async (req, res) => {
        try {
            const id = req.params.id;

            const userDelete = await UserRepository.deleteUpdate(id);

            if (userDelete) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'usuario deletado com sucesso'
            });

            return res.status(404).json({
                ok: true,
                status: 200,
                message: 'Falha ao deletadar usuario'
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