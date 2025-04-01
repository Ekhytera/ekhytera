import { Router } from "express";
import UserController from "./controllers/authController.js";
import middlewares from "./middlewares/middlewares.js";

const routes = Router();

routes.get('/', (req, res) => {
    res.status(200).json({message: 'Raiz do sistema acessada'})
})


routes.post('/cadastrar', UserController.createUser);
routes.post('/login', UserController.login);

routes.put('/usuario/id/:id', middlewares.verifyToken, UserController.updateUser);



export default routes