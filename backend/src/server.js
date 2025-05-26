import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(routes);
app.use('/files', express.static('./src/uploads'));

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Servidor rodando em http://${process.env.HOST}:${process.env.PORT}`)
})