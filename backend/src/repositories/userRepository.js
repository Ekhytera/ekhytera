import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const UserRepository = {
    async create(data) {
        const user = await prisma.tb_usuarios.create({
            data: data
        });
        return user;
    },
    async getAllUsers() {
        const users = await prisma.tb_usuarios.findMany({
            omit: { senha: true }
        });
        return users;
    },
    async findUserByEmail(email) {
        const user = await prisma.tb_usuarios.findUnique({
            where: { email: email }
        });
        return user;
    },
    async findUserByUser(name) {
        const user = await prisma.tb_usuarios.findUnique({
            where: {
                nome_usuario: name
            },
            omit: {
                senha: true
            }
        });
        return user
    },
    async findUserByUserNameWithPost(name, currentUserId = null, page, pageSize) {

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
    },
    async findUserByIdWithPost(id, currentUserId = null, page, pageSize) {

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
    },

    async findUserById(id) {
        const user = await prisma.tb_usuarios.findUnique({
            where: {
                id_usuario: id
            },
            omit: {
                senha: true
            }
        });
        return user
    },

    async updateInfo(id, data) {
        const update = await prisma.tb_usuarios.update({
            where: { id_usuario: id },
            data: data,
            omit: { senha: true } // Não retornar senha na resposta
        });
        return update;
    },
    async deleteUser(id) {
        const deleted = await prisma.tb_usuarios.delete({
            where: { id_usuario: id },
        });
        return !!deleted;
    }
}

export default UserRepository