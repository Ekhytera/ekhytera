import { Router } from "express";
import UserController from "./controllers/authController.js";
import middlewares from "./middlewares/middlewares.js";

const routes = Router();

// rota raiz
routes.get('/', (req, res) => {
    res.status(200).json({message: 'Raiz do sistema acessada'})
})

// get
routes.get('/usuarios', middlewares.verifyToken, UserController.getAllUser);
routes.get('/usuarios/id/:id', middlewares.verifyToken, UserController.getUserById);


// cadastro
routes.post('/cadastrar', UserController.createUser);

// login
routes.post('/login', UserController.login);

// update
routes.put('/usuarios/update/:id', middlewares.verifyToken, UserController.updateUser);
routes.put('/usuarios/delete/:id', middlewares.verifyToken, UserController.updateDeleteUser);



export default routes