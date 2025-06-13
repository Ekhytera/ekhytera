import { Router } from "express";
import UserController from "../controllers/authController.js";
import auth from '../middlewares/auth.js';
import upload from "../middlewares/uplaodImage.js";

const routes = Router();

// get
routes.get('/usuarios', UserController.getAllUser);
routes.get('/usuarios/id/:id', UserController.getUserById);
routes.get('/usuarios/userName/:userName', UserController.getUserByUserName);
routes.get('/usuarios/email/:email', auth.verifyStatus, UserController.getUserByEmail);

// cadastro
routes.post('/cadastrar',auth.verifyStatus, UserController.createUser);

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

export default routes