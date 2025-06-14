import { Router } from "express";
import auth from '../middlewares/auth.js';
import PostController from "../controllers/postController.js";

const routes = Router();

routes.post('/create-post', auth.verifyToken, PostController.createPost);
routes.get('/list-posts', PostController.getAllPosts);
routes.get('/list-posts/active', PostController.getAllPostsByStatus);
routes.get('/list-posts/id/:id', PostController.getPostById);
routes.patch('/delete-post/:id', auth.verifyToken, auth.authorizePostOwner, PostController.logicalDeletePost);

export default routes