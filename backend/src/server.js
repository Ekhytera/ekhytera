import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use('/files', express.static('./src/uploads'));
app.use(userRoutes);
app.use(postRoutes);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Servidor rodando em http://${process.env.HOST}:${process.env.PORT}`)
})