import { strict, test, log, describe, envFile } from 'poku';
import quibble from 'quibble';
import httpMocks from 'node-mocks-http'
await envFile();
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

        findUnique: async (args) => {
          var data = [{ id_usuario: 1, email: 'teste@gmail.com', senha: 'teste' },
          { id_usuario: 2, email: 'teste2@gmail.com', senha: 'teste2' },
          ]
          return data.find(user => user.email === args.where.email);
        }

      }
    }
  }
});
await quibble.esm('bcrypt', {
  default: {
    compare: async (s1, s2) => s1 === s2 ? true : false,
  }
});


const UserRepository = (await import('../repositories/userRepository.js')).default;
const UserController = (await import('../controllers/authController.js')).default;


describe("TESTES UNITÁRIOS - USUÁRIO: ", { background: 'blue', icon: '👤' })


test('UserRepository.create cria um usuário', async () => {
  const newUser = await UserRepository.create({ email: 'teste@gmail.com' });
  strict.equal(newUser.id_usuario, 1);
});



test('UserRepository.getAllUsers retorna lista mockada', async () => {
  const users = await UserRepository.getAllUsers();
  strict.equal(users.length, 2);
});



test('UserRepository.findUserByEmail retorna usuário', async () => {
  const email = "teste@gmail.com"
  var user = await UserRepository.findUserByEmail(email);
  strict.strictEqual(user.email, email);
});


describe("Teste da função de login: ", { background: 'grey', icon: '👤' })

test('Login via authController funcional', async () => {
  /* função que faz as requisições com os parametros email e senha,
  depois retorna o status, mensagem e token para verificação
  */
  var testar = async (email, senha) => {
    var req = httpMocks.createRequest({
      method: 'POST',
      body: { email: email, senha: senha }
    })
    var res = httpMocks.createResponse()

    await UserController.login(req, res)

    var body = await res._getJSONData();

    return { status: res.statusCode, message: res.statusMessage, token: body.token }
  }

  // uma requisição com senha correta, outra com incorreta
  var senha_correta = await testar("teste@gmail.com", "teste");
  var senha_incorreta = await testar("teste@gmail.com", "INCORRETO");
  var usuario_nexiste = await testar("teste_naoexisto@gmail.com", "nada");

  // com senha correta
  strict.strictEqual(senha_correta.status, 200, 'Status deve ser 200');
  strict.strictEqual(senha_correta.message, "OK", "Servidor deve retornar \"OK\"")
  strict.strictEqual(typeof (senha_correta.token), "string", "Token deve ser do tipo string")
  
  // com senha incorreta
  strict.strictEqual(senha_incorreta.status, 401, "Login com senha incorreta deve retornar 401 Unauthorized")

  strict.strictEqual(usuario_nexiste.status, 404, "Login com usuário inexistente retorna 404 Not Found")
})