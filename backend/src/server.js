import express from 'express';
import cors from 'cors';
import config from './config.js';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);

app.listen(config.port, config.host, () => {
    console.log(`Servidor rodando em http://${config.host}:${config.port}`)
})