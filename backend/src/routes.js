import { Router } from "express";
import UserController from "./controllers/authController.js";
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
routes.get('/usuarios/email/:email', UserController.getUserByEmail);


// cadastro
routes.post('/cadastrar', UserController.createUser);

// login
routes.post('/login', UserController.login);

// update infoUser
routes.put('/usuarios/update/:id', auth.verifyToken, upload.single('file'), UserController.updateUser);

// update Senha
routes.put('/usuarios/senha/:id', auth.verifyToken, UserController.updatePassword);


// update status
routes.put('/usuarios/delete/:id', auth.verifyToken, UserController.updateDeleteUser);



export default routes