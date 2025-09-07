import { Router } from "express";
import UserController from "../controllers/authController.js";
import auth from '../middlewares/auth.js';
import upload from "../middlewares/uplaodImage.js";

const routes = Router();

// get
routes.get('/usuarios', UserController.getAllUser);
routes.get('/usuarios/userName/:userName', UserController.getUserByUserName);

// post
routes.post('/cadastrar', UserController.createUser);
routes.post('/login', UserController.login);

// ROTAS PRIVADAS --------------------------------------------

routes.get('/usuarios/id', auth.verifyToken, UserController.getUserById);
routes.put('/update-user', auth.verifyToken, upload.single('file'), UserController.updateUser);
routes.patch('/update-password-user', auth.verifyToken, UserController.updatePassword);
routes.patch('/delete-user', auth.verifyToken, UserController.updateDeleteUser);

export default routes