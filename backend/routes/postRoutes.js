import express from 'express';
import * as postController from '../controller/postController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';
import { uploadPostMedia } from '../config/multerConfig.js';

const router = express.Router();

//Protected Routes
router.get('/', ensureAuthenticated, postController.getAllPosts);
router.get('/:userid', ensureAuthenticated, postController.getAllPostsByUserId);
router.post('/', ensureAuthenticated, attachUserMiddleware, uploadPostMedia.array("media", 5), postController.createPost);



export default router;