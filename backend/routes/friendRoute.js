import express from 'express';
import * as friendController from '../controller/friendController.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';

const router = express.Router();

//Protected Route
router.post('/', jwtMiddleware, attachUserMiddleware, friendController.addFriend);
router.get('/', jwtMiddleware, attachUserMiddleware, friendController.retrieveFriendRequests);
router.patch('/', jwtMiddleware, attachUserMiddleware, friendController.updateFriendRequest);
router.get('/getFriends', jwtMiddleware, attachUserMiddleware, friendController.getAllFriends);

export default router;