import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const UserRepository = {
    async create(data) {
        try {
            const user = await prisma.tb_usuarios.create({
                data: data
            });
            return user;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });

            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async getAllUsers() {
        try {
            const users = await prisma.tb_usuarios.findMany({
                omit: { senha: true }
            });
            return users;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async findUserByEmail(email) {
        try {
            const user = await prisma.tb_usuarios.findUnique({
                where: { email: email }
            });
            return user;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async findUserByUser(name) {
        try {
            const user = await prisma.tb_usuarios.findUnique({
                where: {
                    nome_usuario: name
                },
                omit: {
                    senha: true
                }
            });
            return user
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async findUserByUserNameWithPost(name, currentUserId = null, page, pageSize) {

        try {
            const user = await prisma.tb_usuarios.findUnique({
                where: { nome_usuario: name },
                omit: { senha: true },
                include: {
                    tb_posts: {
                        include: {
                            tb_curtidas: currentUserId ? {
                                where: {
                                    id_usuario: currentUserId
                                },
                                select: {
                                    id_curtida: true
                                }
                            } : false
                        },
                        orderBy: {
                            criado_em: 'desc'
                        }
                    }
                }
            });

            if (!user) return null;

            if (!currentUserId) return user;

            const userWithFormattedPosts = {
                ...user,
                tb_posts: user.tb_posts.map(post => ({
                    ...post,
                    tb_usuarios: {
                        nome_usuario: user.nome_usuario,
                        endereco_imagem: user.endereco_imagem,
                        id_usuario: user.id_usuario
                    },
                    isLiked: post.tb_curtidas.length > 0,
                    tb_curtidas: undefined
                }))
            };

            return userWithFormattedPosts;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async findUserByIdWithPost(id, currentUserId = null, page, pageSize) {

        try {
            const user = await prisma.tb_usuarios.findUnique({
                where: { id_usuario: id },
                omit: { senha: true },
                include: {
                    tb_posts: {
                        include: {
                            tb_curtidas: currentUserId ? {
                                where: {
                                    id_usuario: currentUserId
                                },
                                select: {
                                    id_curtida: true
                                }
                            } : false
                        },
                        orderBy: {
                            criado_em: 'desc'
                        }
                    }
                }
            });

            if (!user) return null;

            const userWithFormattedPosts = {
                ...user,
                tb_posts: user.tb_posts.map(post => ({
                    ...post,
                    tb_usuarios: {
                        nome_usuario: user.nome_usuario,
                        endereco_imagem: user.endereco_imagem,
                        id_usuario: user.id_usuario
                    },
                    isLiked: currentUserId ? post.tb_curtidas.length > 0 : false,
                    tb_curtidas: undefined
                }))
            };

            return userWithFormattedPosts;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },

    async findUserById(id) {
        try {
            const user = await prisma.tb_usuarios.findUnique({
                where: {
                    id_usuario: id
                },
                omit: {
                    senha: true
                }
            });
            return user
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },

    async updateInfo(id, data) {
        try {
            const update = await prisma.tb_usuarios.update({
                where: { id_usuario: id },
                data: data,
                omit: { senha: true }
            });
            return update;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    },
    async deleteUser(id) {
        try {
            const deleted = await prisma.tb_usuarios.delete({
                where: { id_usuario: id },
            });
            return !!deleted;
        } catch (error) {
            console.error("Erro no banco de dados", {
                message: error.message,
                code: error.code,
                meta: error.meta,
                timestamp: new Date().toISOString()
            });
            throw new Error("Erro desconhecido, tente novamente!");
        }
    }
}

export default UserRepository