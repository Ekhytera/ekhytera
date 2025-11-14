import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve a build do react
// o express ignora essa linha se não encontrar a pasta public (que só existe na build)
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.use(userRoutes);
app.use(postRoutes);

// determina o host e a porta do servidor baseado no ambiente (produção ou desenvolvimento)
const isProduction = process.env.NODE_ENV === 'production';
const protocol = isProduction ? 'https' : 'http';

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Modo: ${process.env.NODE_ENV}\nServidor rodando em ${protocol}://${process.env.HOST}${process.env.PORT ? `:${process.env.PORT}` : ''}`);
})