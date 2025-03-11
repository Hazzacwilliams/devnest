import express from 'express';
import * as notificationController from '../controller/notifcationController.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';

const router = express.Router();

//Protected Route
router.get('/', ensureAuthenticated, attachUserMiddleware, notificationController.getNotificationsByUserId);
router.put('/', ensureAuthenticated, attachUserMiddleware, notificationController.updateNotificationStatus);

export default router;