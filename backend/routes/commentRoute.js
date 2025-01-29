import express from 'express';
import * as commentController from '../controller/commentController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';

const router = express.Router();

//Protected Route
router.post('/', ensureAuthenticated, attachUserMiddleware, commentController.addComment);
router.get('/', ensureAuthenticated, attachUserMiddleware, commentController.getAllComments);

export default router;