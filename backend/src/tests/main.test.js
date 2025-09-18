import { assert, strict, test, describe, log } from 'poku';
import { envFile } from 'poku';
import quibble from 'quibble'
// import UserRepository from '../repositories/userRepository.js';

await envFile();

const url = `http://${process.env.HOST}:${process.env.PORT}`;

describe("TESTES NAS ROTAS DE USUÁRIO: ", { background: 'blue', icon: '👤' })

test('Rota /usuarios retorna todos os usuários', async () => {
    await quibble.esm('../repositories/userRepository.js', {
        default: {
            getAllUsers: () => {
                return {
                    message: "Olá mundo!",
                    status: 200,
                    users: [{
                        id_usuario: 1,
                        username: "usuario para testes"
                    }]
                }
            }
        }
    });
    const UserRepository = (await import('../repositories/userRepository.js')).default;

    var res = await UserRepository.getAllUsers()
    var body = res.json();
    log(body.message)
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
        senha: "senha_incorreta400"
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


test('rota /usuarios/:id funciona', async () => {
    var res = await fetch(`${url}/usuarios/id?id=1`);
    strict.strictEqual(res.status, 401, "Buscar usuário por ID sem token deve retornar 401 Unauthorized");
});


// test('rota /usuarios/:id retorna 404 para usuário inexistente', async () => {
//     var res = await fetch(`${url}/usuarios/0`);
//     strict.strictEqual(res.status, 404, "Status deve ser 404 Not Found");
// });


// test('rota /usuarios/info/:userName retorna informações do usuário', async () => {
//     var res = await fetch(`${url}/usuarios/info/teste`);
//     assert(res.status, 200);
//     var body = await res.json();
//     strict.strictEqual(body.userName, "teste", "Nome de usuário deve ser \"teste\"");
// });