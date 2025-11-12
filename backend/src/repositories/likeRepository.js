import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const likeRepository = {
    async addLike(data, client = prisma){
        const like = await client.tb_curtidas.create({
            data: data
        });
        return like
    },
    async removeLike(id_usuario, id_post, client = prisma){
        const like = await client.tb_curtidas.delete({
            where: { id_usuario_id_post: {id_usuario, id_post} }
        });
        return !!like
    }
}

export default likeRepository