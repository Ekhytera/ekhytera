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
    async findUserByUserName(name) {
        const user = await prisma.tb_usuarios.findUnique({
            where: { nome_usuario: name },
            omit: { senha: true },
            include: {
                tb_posts: true,
            }
        });
        return user;
    },
    async findUserById(id) {
        const user = await prisma.tb_usuarios.findUnique({
            where: { id_usuario: id },
            omit: { senha: true },
            include: { tb_posts: true }
        });
        return user;
    },
    async updateInfo(id, data) {
        const update = await prisma.tb_usuarios.update({
            where: { id_usuario: id },
            data: data
        });
        return update;
    },
    async deleteUser(id){
        const deleted = await prisma.tb_usuarios.delete({
            where: { id_usuario: id },
        });
        return !!deleted;
    }
}

export default UserRepository