import express from 'express';
import cors from 'cors';
import config from './config.js';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(routes);
app.use('/files', express.static('./src/uploads'));

app.listen(config.port, config.host, () => {
    console.log(`Servidor rodando em http://${config.host}:${config.port}`)
})