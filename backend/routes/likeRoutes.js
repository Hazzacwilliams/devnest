import express from 'express';
import * as likeController from '../controller/likeController.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const router = express.Router();

//Protected routes
router.get('/', likeController.getLikesByPostId);
router.post('/', jwtMiddleware, attachUserMiddleware, likeController.addLike);
router.delete('/:postid', jwtMiddleware, attachUserMiddleware, likeController.removeLike);
router.get('/all', likeController.getAllPostLikes);

export default router;