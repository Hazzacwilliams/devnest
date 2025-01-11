import express from 'express';
import * as postController from '../controller/postController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware,js';

const router = express.Router();

//Protected Routes
router.get('/', ensureAuthenticated, postController.getAllPosts);
router.post('/', ensureAuthenticated, attachUserMiddleware, postController.createPost);

export default router;