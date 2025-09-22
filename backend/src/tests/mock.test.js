import { strict, test, log, describe } from 'poku';
import quibble from 'quibble';

// mock do PrismaClient
await quibble.esm('@prisma/client', {
  PrismaClient: function () {
    return {
      tb_usuarios: {
        create: async (args) => ({
          id_usuario: 1,
          ...args.data
        }),
        findMany: async () => ([
          { id_usuario: 1, email: 'teste@gmail.com' },
          { id_usuario: 2, email: 'teste2@gmail.com' }
        ]),
        findUnique: async (email) => {
          var data = [{id_usuario: 5, email: 'teste@gmail.com'}]
          return data.find(user => user.email === "teste@gmail.com");
        }
      }
    }
  }
});

const UserRepository = (await import('../repositories/userRepository.js')).default;


describe("TESTES NO USERREPOSITORY ", { background: 'blue', icon: '👤' })
test('UserRepository.create cria um usuário', async () => {
  const newUser = await UserRepository.create({ email: 'teste@gmail.com' });
  strict.equal(newUser.id_usuario, 1);
});

test('UserRepository.getAllUsers retorna lista mockada', async () => {
  const users = await UserRepository.getAllUsers();
  strict.equal(users.length, 2);
});

test('UserRepository.findUserByEmail retorna usuário', async () => {
  const user = await UserRepository.findUserByEmail();
  log(user)
  strict.equal(user.email, "teste@gmail.com");
});