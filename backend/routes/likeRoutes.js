import express from 'express';
import * as likeController from '../controller/likeController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';

const router = express.Router();

//Protected routes
router.get('/', likeController.getLikesByPostId);
router.post('/', ensureAuthenticated, attachUserMiddleware, likeController.addLike);
router.delete('/:postid', ensureAuthenticated, attachUserMiddleware, likeController.removeLike);
router.get('/all', likeController.getAllPostLikes);

export default router;