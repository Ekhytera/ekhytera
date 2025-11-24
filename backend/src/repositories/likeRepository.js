import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const likeRepository = {
    async addLike(data, client = prisma) {
        try {
            const like = await client.tb_curtidas.create({
                data: data
            });
            return like
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
    async removeLike(id_usuario, id_post, client = prisma) {
        try {
            const like = await client.tb_curtidas.delete({
                where: { id_usuario_id_post: { id_usuario, id_post } }
            });
            return !!like
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

export default likeRepository