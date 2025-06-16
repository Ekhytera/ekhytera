import { Router } from "express";
import auth from '../middlewares/auth.js';
import PostController from "../controllers/postController.js";

const routes = Router();

routes.post('/create-post', auth.verifyToken, PostController.createPost);
routes.get('/list-posts', PostController.getAllPosts);
routes.get('/list-posts/active', PostController.getAllPostsByStatus);
routes.get('/list-posts/id/:id', PostController.getPostById);
routes.patch('/delete-post/:id', auth.verifyToken, auth.authorizePostOwner, PostController.logicalDeletePost);
routes.patch('/add-like/:id', auth.verifyToken, PostController.addLike);
routes.patch('/remove-like/:id', auth.verifyToken, PostController.removeLike);
routes.patch('/edit-post/:id', auth.verifyToken, PostController.editPost);

export default routes