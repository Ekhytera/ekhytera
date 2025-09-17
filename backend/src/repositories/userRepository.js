import { PrismaClient } from "@prisma/client";

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
    async findUserByUserName(name, currentUserId = null) {
        const user = await prisma.tb_usuarios.findUnique({
            where: { nome_usuario: name },
            omit: { senha: true },
            include: {
                tb_posts: {
                    include: {
                        tb_usuarios: {
                            select: {
                                nome_usuario: true,
                                endereco_imagem: true,
                                id_usuario: true
                            }
                        },
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

        // Se não precisa da formatação de curtidas, retorna direto
        if (!currentUserId) return user;

        // Formatar posts com isLiked quando há currentUserId
        const userWithFormattedPosts = {
            ...user,
            tb_posts: user.tb_posts.map(post => ({
                ...post,
                isLiked: post.tb_curtidas.length > 0,
                tb_curtidas: undefined
            }))
        };

        return userWithFormattedPosts;
    },
    async findUserById(id, currentUserId = null) {
        const user = await prisma.tb_usuarios.findUnique({
            where: { id_usuario: id },
            omit: { senha: true },
            include: {
                tb_posts: {
                    include: {
                        tb_usuarios: {
                            select: {
                                nome_usuario: true,
                                endereco_imagem: true,
                                id_usuario: true
                            }
                        },
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

        // Formatar posts com isLiked
        const userWithFormattedPosts = {
            ...user,
            tb_posts: user.tb_posts.map(post => ({
                ...post,
                isLiked: currentUserId ? post.tb_curtidas.length > 0 : false,
                tb_curtidas: undefined // Remove dados brutos de curtidas
            }))
        };

        return userWithFormattedPosts;
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