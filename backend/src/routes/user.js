import { Router } from "express";
import UserController from "../controllers/authController.js";
import auth from '../middlewares/auth.js';
import upload from "../middlewares/uplaodImage.js";
import { validateText } from "../middlewares/validateText.js";

const routes = Router();

// get
routes.get('/usuarios', UserController.getAllUser);
routes.get('/usuarios/userName/:userName', UserController.getUserByUserName);
routes.get('/usuarios/info/:userName', auth.optionalAuth, UserController.getUserInfoByUserNAme);

// post
routes.post('/cadastrar', UserController.createUser);
routes.post('/login', UserController.login);

// ROTAS PRIVADAS --------------------------------------------

routes.get('/usuarios/id', auth.verifyToken, UserController.getUserById);
routes.patch('/update-user', auth.verifyToken, upload.single('imagem'), validateText, UserController.updateUser);
routes.delete('/delete-user', auth.verifyToken, UserController.deleteUser);



export default routes