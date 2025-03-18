import express from 'express';
import * as commentController from '../controller/commentController.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const router = express.Router();

//Protected Route
router.post('/', jwtMiddleware, attachUserMiddleware, commentController.addComment);
router.get('/', jwtMiddleware, attachUserMiddleware, commentController.getAllComments);

export default router;