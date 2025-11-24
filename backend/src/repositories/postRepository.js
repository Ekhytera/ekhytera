import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const postsRepository = {
    async getAllPosts() {
        try {
            const posts = await prisma.tb_posts.findMany({
                include: {
                    tb_usuarios: {
                        select: {
                            nome_usuario: true,
                            endereco_imagem: true
                        }
                    }
                }
            });
            return posts;
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

    async create(post) {
        try {
            const result = await prisma.tb_posts.create({
                data: {
                    texto: post.texto,
                    id_usuario: post.id_usuario,
                    criado_em: new Date()
                }
            });
            return { insertId: result.id_post };
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

    async findAmountPostByUser(id_usuario) {
        const postCount = await prisma.tb_posts.count({
            where: {
                id_usuario: id_usuario
            }
        });
        return postCount
    },

    async findAllPosts(page, pageSize, userId) {
        const skip = (page - 1) * 10;
        const take = pageSize;

        try {
            const posts = await prisma.tb_posts.findMany({
                skip: skip,
                take: take,
                include: {
                    tb_usuarios: {
                        select: {
                            nome_usuario: true,
                            endereco_imagem: true,
                            id_usuario: true
                        }
                    },
                    tb_curtidas: userId ? {
                        where: {
                            id_usuario: userId
                        },
                        select: {
                            id_curtida: true
                        }
                    } : false
                },
                orderBy: {
                    criado_em: 'desc'
                }
            });
            const postsWithLikeStatus = posts.map(post => ({
                ...post,
                isLiked: userId ? post.tb_curtidas.length > 0 : false,
                tb_curtidas: undefined
            }));

            return postsWithLikeStatus;
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

    async findAllPostsFromUserId(id_usuario) {
        try {
            const posts = await prisma.tb_posts.findMany({
                where: {
                    id_usuario: Number.parseInt(id_usuario)
                },
                include: {
                    tb_usuarios: {
                        select: {
                            nome_usuario: true,
                            endereco_imagem: true,
                            id_usuario: true
                        }
                    }
                },
                orderBy: {
                    criado_em: 'desc'
                }
            });
            return posts;
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

    async findPostById(id) {
        try {
            const post = await prisma.tb_posts.findUnique({
                where: {
                    id_post: Number.parseInt(id, 10)
                },
                select: {
                    id_post: true,
                    id_usuario: true,
                    status: true,
                    texto: true,
                    imagem_post: true,
                    criado_em: true
                }
            });
            return post;
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

    async addLikeByPost(id, client = prisma) {
        try {
            const result = await client.tb_posts.update({
                where: {
                    id_post: Number.parseInt(id)
                },
                data: {
                    curtidas: {
                        increment: 1
                    }
                }
            });
            return result;
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

    async removeLikeByPost(id, client = prisma) {
        try {
            const result = await client.tb_posts.update({
                where: {
                    id_post: Number.parseInt(id)
                },
                data: {
                    curtidas: {
                        decrement: 1
                    }
                }
            });
            return result
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

    async deletePost(id) {
        try {
            const result = await prisma.tb_posts.delete({
                where: {
                    id_post: Number.parseInt(id, 10)
                },
            });
            return result;
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

    async editTextPost(id, text) {
        try {
            const result = await prisma.tb_posts.update({
                where: {
                    id_post: Number.parseInt(id)
                },
                data: {
                    texto: text
                }
            });
            return result;
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

export default postsRepository;