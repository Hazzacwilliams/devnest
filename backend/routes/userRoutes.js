import express from 'express';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import * as userController from '../controller/userController.js';
import passport from '../config/authConfig.js';

const router = express.Router();

//Public Routes
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);


//Protected Routes
router.get('/', ensureAuthenticated, userController.getAllUsers);
router.put('/:userID', ensureAuthenticated, userController.updateUser);
router.delete('/:userID', ensureAuthenticated, userController.deleteUser);
router.get('/logout', ensureAuthenticated, userController.logoutUser);

export default router;