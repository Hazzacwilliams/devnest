import express from 'express';
import * as postController from '../controller/postController.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';
import { uploadPostMedia } from '../middleware/s3Upload.js';

const router = express.Router();

//Protected Routes
router.get('/', jwtMiddleware, postController.getAllPosts);
router.get('/:userid', jwtMiddleware, postController.getAllPostsByUserId);
router.post('/', jwtMiddleware, attachUserMiddleware, uploadPostMedia.array("media", 5), postController.createPost);



export default router;