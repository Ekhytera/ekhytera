import { Router } from "express";
import auth from '../middlewares/auth.js';
import PostController from "../controllers/postController.js";
import { validateText } from "../middlewares/validateText.js";

const routes = Router();

routes.post('/create-post', auth.verifyToken, validateText, PostController.createPost);
routes.get('/list-posts', auth.optionalAuth, PostController.getAllPosts);
routes.get('/list-posts/userId/:userId', PostController.getAllPostsByUserId);
routes.get('/list-posts/id/:id', PostController.getPostById);
routes.delete('/delete-post/:id', auth.verifyToken, auth.authorizePostOwner, PostController.deletePost);
routes.patch('/add-like/:id', auth.verifyToken, PostController.addLike);
routes.patch('/remove-like/:id', auth.verifyToken, PostController.removeLike);
routes.patch('/edit-post/:id', auth.verifyToken, validateText, auth.authorizePostOwner, PostController.editPost);

export default routes;