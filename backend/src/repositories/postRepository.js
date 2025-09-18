import { PrismaClient } from '@prisma/client';

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
            throw new Error(`Database query failed: ${error.message}`);
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
            throw new Error(`Falha ao criar post: ${error.message}`);
        }
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
            throw new Error(`Falha ao listar post: ${error.message}`);
        }
    },

    async findAllPostsFromUserId(id_usuario) {
        try {
            const posts = await prisma.tb_posts.findMany({
                where: {
                    id_usuario: parseInt(id_usuario)
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
            throw new Error(`Falha ao listar post: ${error.message}`);
        }
    },

    async findPostById(id) {
        try {
            const post = await prisma.tb_posts.findUnique({
                where: {
                    id_post: parseInt(id),
                    status: 1
                },
                include: {
                    tb_usuarios: {
                        select: {
                            nome_usuario: true,
                            endereco_imagem: true
                        }
                    }
                }
            });
            return post ? [post] : [];
        } catch (error) {
            throw new Error(`Falha ao encontrar post: ${error.message}`);
        }
    },

    async addLikeByPost(id, client = prisma) {
        try {
            const result = await client.tb_posts.update({
                where: {
                    id_post: parseInt(id)
                },
                data: {
                    curtidas: {
                        increment: 1
                    }
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Falha ao curtir post: ${error.message}`);
        }
    },

    async removeLikeByPost(id, client = prisma) {
        try {
            const result = await client.tb_posts.update({
                where: {
                    id_post: parseInt(id)
                },
                data: {
                    curtidas: {
                        decrement: 1
                    }
                }
            });
            return result
        } catch (error) {
            throw new Error(`Falha ao remover a curtida: ${error.message}`);
        }
    },

    async deletePost(id) {
        try {
            const result = await prisma.tb_posts.delete({
                where: {
                    id_post: id
                },
            });
            return result;
        } catch (error) {
            throw new Error(`Falha ao apagar post: ${error.message}`);
        }
    },

    async editTextPost(id, text) {
        try {
            const result = await prisma.tb_posts.update({
                where: {
                    id_post: parseInt(id)
                },
                data: {
                    texto: text
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Falha ao editar post: ${error.message}`);
        }
    }
}

export default postsRepository;