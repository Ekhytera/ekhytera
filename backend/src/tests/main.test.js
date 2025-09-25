import { assert, strict, test, describe, log } from 'poku';
import { envFile } from 'poku';
await envFile();
import quibble from 'quibble';
const url = `http://${process.env.HOST}:${process.env.PORT}`;

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
                    var data = [{ id_usuario: 5, email: 'teste@gmail.com' }]
                    return data.find(user => user.email === "teste@gmail.com");
                }
            }
        }
    }
});

const UserRepository = (await import('../repositories/userRepository.js')).default;


describe("TESTES INTEGRADOS - USUÁRIO: ", { background: 'blue', icon: '👤' })

test('Rota /usuarios retorna todos os usuários', async () => {
    var res = await fetch(`${url}/usuarios`);
    strict.strictEqual(res.status, 200);
});

test('Rota /userName funcionando com usuário teste', async () => {
    var res = await fetch(`${url}/usuarios/userName/teste`);
    strict.strictEqual(res.status, 200);
});


test('Login funcionando', async () => {
    const dados = {
        email: "teste@gmail.com",
        senha: "@Teste123"
    }
    var res = await fetch(`${url}/login`,
        {
            method: "POST",
            body: JSON.stringify(dados),
            headers: { 'Content-Type': 'application/json' }
        }
    )
    var body = await res.json();
    strict.strictEqual(typeof (body.token), "string");
})


test('Login com senha incorreta retorna 401 Unauthorized', async () => {
    const dados = {
        email: "teste@gmail.com",
        senha: "senha_incorreta401"
    }
    var res = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' }
    })

    strict.strictEqual(res.status, 401, "Senha incorreta deve retornar 401 Unauthorized");
})


test('Login com usuário inexistente retorna 404 Not Found', async () => {
    const dados = {
        email: "inexistente@inexistente.naoexiste",
        senha: "senha_incorreta400"
    }
    var res = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(dados),
        headers: { 'Content-Type': 'application/json' }
    })

    strict.strictEqual(res.status, 404, "Login com usuário inexistente deve retornar 404 Not Found");
})


test('rota /usuarios/id funciona', async () => {
    var res = await fetch(`${url}/usuarios/id?id=1`);
    strict.strictEqual(res.status, 401, "Buscar usuário por ID sem token deve retornar 401 Unauthorized");
});


test('rota /usuarios/info/:userName retorna informações do usuário', async () => {
    var res = await fetch(`${url}/usuarios/info/teste`);
    assert(res.status, 200);
    var body = await res.json();
    strict.strictEqual(body.user.nome_usuario, "teste", "Nome de usuário deve ser \"teste\"");
});