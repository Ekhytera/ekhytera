import { Router } from "express";
import UserController from "./controllers/authController.js";
import PostController from "./controllers/postController.js";
import auth from "./middlewares/auth.js";
import upload from "./middlewares/uplaodImage.js";

const routes = Router();

// rota raiz
routes.get('/', (req, res) => {
    res.status(200).json({message: 'Raiz do sistema acessada'})
})

// get
routes.get('/usuarios', UserController.getAllUser);
routes.get('/usuarios/id/:id', UserController.getUserById);
routes.get('/usuarios/userName/:userName', UserController.getUserByUserName);
routes.get('/usuarios/email/:email', auth.verifyStatus, UserController.getUserByEmail);

// cadastro
routes.post('/cadastrar', UserController.createUser);

// login
routes.post('/login', auth.verifyStatus, UserController.login);

// ROTAS PRIVADAS --------------------------------------------

routes.get('/usuarios/token', auth.verifyToken, UserController.getUserByToken);

// update infoUser
routes.put('/update-user', auth.verifyToken, upload.single('file'), UserController.updateUser);

// update Senha
routes.patch('/update-password-user', auth.verifyToken, UserController.updatePassword);

// update status
routes.patch('/delete-user', auth.verifyToken, UserController.updateDeleteUser);

//posts routes (mover pra outro arquivo)
routes.post('/create-post', auth.verifyToken, PostController.createPost);
routes.get('/list-posts', PostController.getAllPosts);

export default routes