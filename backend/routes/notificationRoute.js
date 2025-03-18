import express from 'express';
import * as notificationController from '../controller/notifcationController.js';
import jwtMiddleware from '../middleware/jwtMiddleware.js';
import attachUserMiddleware from '../middleware/attachUserMiddleware.js';

const router = express.Router();

//Protected Route
router.get('/', jwtMiddleware, attachUserMiddleware, notificationController.getNotificationsByUserId);
router.put('/', jwtMiddleware, attachUserMiddleware, notificationController.updateNotificationStatus);

export default router;