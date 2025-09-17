import { assert, strict, test, describe, log } from 'poku';
import { envFile } from 'poku';

await envFile();

const url = `http://${process.env.HOST}:${process.env.PORT}`;
console.log(url);
describe("TESTES NAS ROTAS DE USUÁRIO: ", { background: 'blue', icon: '👤' })

test('rota /usuarios retorna todos os usuários', async () => {
    var res = await fetch(`${url}/usuarios`);
    strict.strictEqual(res.status, 200);
});

test('rota userName funcionando com usuário teste', async () => {
    var res = await fetch(`${url}/usuarios/userName/teste`);
    const msg = "Esse nome de usuário já esta em uso"
    strict.strictEqual(res.status, 200);
});


test('login funcionando', async () => {
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
    strict.strictEqual(typeof(body.token), "string");
})


test('login com senha incorreta retorna 401 Unauthorized', async () => {
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


test('login com usuário inexistente retorna 404 Not Found', async () => {
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