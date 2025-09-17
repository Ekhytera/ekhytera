import UserRepository from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { uploadToSupabase, deleteFromSupabase } from "../middlewares/uplaodImage.js";

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
                        id: newUser.id_usuario,
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

            res.status(200).json({
                status: 200,
                ok: true,
                token: token,
                id: user.id_usuario
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
            const id = req.user.id;

            const user = await UserRepository.findUserById(id, id);

            if (user) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Usuário encontrado com sucesso',
                    user: user
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

        if (!userName) {
            return res.status(200).json({
                message: 'O campo nome é obrigatório'
            });
        }

        const nomeUser = await UserRepository.findUserByUserName(userName);

        try {
            if (nomeUser) return res.status(200).json({
                error: true,
                message: 'Esse nome de usuário já esta em uso'
            });

            return res.status(404).json({
                error: false
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
    getUserInfoByUserNAme: async (req, res) => {
        const { userName } = req.params;

        if (!userName) {
            return res.status(200).json({
                message: 'O campo nome é obrigatório'
            });
        }

        const currentUserId = req.user?.id || null;
        const user = await UserRepository.findUserByUserName(userName, currentUserId);

        try {
            if (user) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Usuario encontrado com sucesso',
                    user: user
                });
            }

            return res.status(404).json({
                ok: false,
                status: 404,
                message: 'Usuario não encontrado'
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
        let data = req.body;
        const imageType = req.query.typeImage;

        try {
            if (req.file && (imageType === 'perfil' || imageType === 'banner')) {
                const uploadResult = await uploadToSupabase(req.file, imageType);

                if (!uploadResult.success) {
                    return res.status(500).json({
                        ok: false,
                        status: 500,
                        message: 'Erro ao fazer upload da imagem: ' + uploadResult.error
                    });
                }

                const currentUser = await UserRepository.findUserById(id);

                if (imageType === 'perfil') {
                    if (currentUser.endereco_imagem) {
                        const oldImagePath = currentUser.endereco_imagem.split('/').pop();
                        await deleteFromSupabase(`perfil/${oldImagePath}`);
                    }
                    data = { endereco_imagem: uploadResult.publicUrl };
                } else if (imageType === 'banner') {
                    if (currentUser.endereco_banner) {
                        const oldImagePath = currentUser.endereco_banner.split('/').pop();
                        await deleteFromSupabase(`banner/${oldImagePath}`);
                    }
                    data = { endereco_banner: uploadResult.publicUrl };
                }
            } else if (imageType === 'perfil' && data.endereco_imagem === "") {
                const currentUser = await UserRepository.findUserById(id);
                if (currentUser.endereco_imagem) {
                    const oldImagePath = currentUser.endereco_imagem.split('/').pop();
                    await deleteFromSupabase(`perfil/${oldImagePath}`);
                }
                data = { endereco_imagem: "" };
            } else if (imageType === 'banner' && data.endereco_banner === "") {
                const currentUser = await UserRepository.findUserById(id);
                if (currentUser.endereco_banner) {
                    const oldImagePath = currentUser.endereco_banner.split('/').pop();
                    await deleteFromSupabase(`banner/${oldImagePath}`);
                }
                data = { endereco_banner: "" };
            }

            if ('nome_usuario' in data && !data.nome_usuario) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: 'O campo nome é obrigatório'
                });
            }
            if ('email' in data && !data.email) {
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    message: 'O campo email é obrigatório'
                });
            }

            const result = await UserRepository.updateInfo(id, data);

            if (result) {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    message: 'Informações atualizadas com sucesso'
                });
            }

            return res.status(400).json({
                ok: false,
                status: 400,
                message: 'Erro ao atualizar informações'
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
    deleteUser: async (req, res) => {
        try {
            const id = req.user.id;
            const { senha } = req.body;

            const user = await UserRepository.findUserByEmail(req.user.email);

            if (!user) {
                return res.status(404).json({
                    ok: false,
                    status: 404,
                    message: "Usuario não encontrado"
                });
            }

            const checarSenha = await bcrypt.compare(senha, user.senha);

            if (!checarSenha) {
                return res.status(400).json({
                    status: 400,
                    ok: false,
                    message: 'Senha inválida'
                });
            }

            const deleted = await UserRepository.deleteUser(id);

            if (!deleted) {
                return res.status(400).json({
                    status: 400,
                    ok: false,
                    message: 'Falha ao deletar usuario'
                });
            }

            return res.status(200).json({
                status: 200,
                ok: true,
                message: 'Usuario deletado'
            });

        } catch (error) {
            console.log(error);

        }
    }
}

export default UserController