import express from 'express';
import * as friendController from '../controller/friendController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';

const router = express.Router();

//Protected Route
router.post('/', ensureAuthenticated, attachUserMiddleware, friendController.addFriend);
router.get('/', ensureAuthenticated, attachUserMiddleware, friendController.retrieveFriendRequests);
router.patch('/', ensureAuthenticated, attachUserMiddleware, friendController.updateFriendRequest);
router.get('/getFriends', ensureAuthenticated, attachUserMiddleware, friendController.getAllFriends);

export default router;