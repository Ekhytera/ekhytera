import UserRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

const UserController = {
    createUser: async (req, res) => {
        const { nome_usuario, email, senha } = req.body;

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });
        if (!nome_usuario) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo nome é obrigatório'
        });
        if (!senha) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo senha é obrigatório'
        });

        const userExist = await UserRepository.findUserByEmail(email);

        if (userExist) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'email já cadastrado'
        });

        const nomeUser = await UserRepository.findUserByUsername(nome_usuario);

        if (nomeUser && nome_usuario === nomeUser.nome_usuario) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'esse nome de usuario já esta sendo utilizado'
        });

        try {
            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senha, salt);

            const newUser = await UserRepository.create({
                nome_usuario, email, senha: hashSenha
            });

            if (newUser) {
                return res.status(201).json({
                    ok: true,
                    status: 201,
                    message: 'usuario criado com sucesso',
                    user: {
                        id: newUser.insertId,
                        nome_usuario: nome_usuario,
                        email: email,
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
            const user = await UserRepository.findUserByEmail(email);

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
                id: user.id_usuario,
                nome_usuario: user.nome_usuario,
                email: user.email,
                cargo: user.cargo,
                status: user.status
            },
                SECRET,
                { expiresIn: '14d' }
            );

            console.log('Usuario logado: ', user);

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
            const users = await UserRepository.getAllUsers();

            if (users) {
                delete users.senha

                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Mostrando todos os usuários.',
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

            const user = await UserRepository.findUserByID(id);

            if (user) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Usuário encontrado com sucesso',
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

    getUserByToken: async (req, res) => {
        try {
            const userId = req.user.id;

            const user = await UserRepository.findUserByToken(userId);

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Usuário não encontrado'
                });
            }

            delete user.senha;

            return res.status(200).json({
                ok: true,
                status: 200,
                message: 'Usuário encontrado com sucesso',
                user: user
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: 'Erro ao verificar o token'
            });
        }
    },

    getUserByUserName: async (req, res) => {
        const { userName } = req.params;

        const nomeUser = await UserRepository.findUserByUsername(userName);

        try {
            if (nomeUser) return res.status(200).json({
                ok: true,
                status: 200,
                message: 'usuario encontrado com sucesso',
                user: nomeUser.nome_usuario,
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
        const user = await UserRepository.findUserByEmail(email);

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
        const id = req.user.id;
        const data = req.body;
        const file = req.file;
        let endereco_imagem;

        if (file) {
            endereco_imagem = file.filename;
        }

        if(data.dt_nascimento === ''){
            data.dt_nascimento = null
        }

        if ('email' in data && !data.email) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'O campo email é obrigatório'
            });
        }

        if ('nome_usuario' in data && !data.nome_usuario) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'O campo nome é obrigatório'
            });
        }

        if ('senha' in data && !data.senha) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'A senha é obrigatória para atualizar as informações'
            });
        }

        try {
            const currentUser = await UserRepository.findUserByID(id);

            if (!currentUser) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: 'Usuário não encontrado'
                });
            }

            const isPasswordValid = await bcrypt.compare(data.senha, currentUser.senha);

            if (!isPasswordValid) return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Senha inválida'
            })

            const updated = await UserRepository.updateInfo(id, { ...data, endereco_imagem: endereco_imagem });

            console.log({ ...data, endereco_imagem: endereco_imagem })

            if (updated) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Usuário atualizado com sucesso'
                });
            }

            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Nenhuma alteração foi feita'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                ok: false,
                status: 500,
                message: error.message
            });
        }
    },

    updatePassword: async (req, res) => {
        const id = req.user.id;
        const { email, senhaAtual, senhaNova, confirmar } = req.body;

        if (!email) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo email é obrigatório'
        });

        if (!senhaAtual) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo da senha atual é obrigatório'
        });

        if (!senhaNova) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo da nova senha é obrigatório'
        });

        if (!confirmar) return res.status(400).json({
            ok: false,
            status: 400,
            message: 'O campo de confirmação da senha é obrigatório'
        });

        const currentUser = await UserRepository.findUserByID(id);

        if (!currentUser) return res.status(404).json({
            ok: false,
            status: 404,
            message: 'Erro ao encontrar usuario atual'
        });

        try {
            if (currentUser.email !== email) return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Email incorreto'
            });

            const isCurrentPassordValid = await bcrypt.compare(senhaAtual, currentUser.senha);

            if(!isCurrentPassordValid) return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Senha incorreta'
            });

            if(senhaNova !== confirmar) return res.status(400).json({
                ok: false,
                status: 400,
                message: 'As senhas são diferentes'
            });

            const isNewPasswordValid = await bcrypt.compare(senhaNova, currentUser.senha);

            if(isNewPasswordValid) return res.status(400).json({
                ok: false,
                status: 400,
                message: 'A nova senha é igual a atual'
            });

            const salt = await bcrypt.genSalt(10);
            const hashSenha = await bcrypt.hash(senhaNova, salt);

            const updateUser = await UserRepository.updatePassword(id, hashSenha);

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
            const id = req.user.id;

            const userDelete = await UserRepository.logicalDelete(id);

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