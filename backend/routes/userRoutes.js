import express from 'express';
import ensureAuthenticated from '../middleware/authMiddleware.js';
import * as userController from '../controller/userController.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

//Public Routes
router.post('/login', userController.loginUser);
router.post('/', userController.createUser);


//Protected Routes
router.get('/', ensureAuthenticated, userController.getAllUsers);
router.get('/:userID', ensureAuthenticated, userController.getUserById);
router.put('/:userID', ensureAuthenticated, userController.updateUser);
router.delete('/:userID', ensureAuthenticated, userController.deleteUser);
router.get('/logout', ensureAuthenticated, userController.logoutUser);
router.post('/upload-profile-picture/:userid', upload.single('profilePicture'), userController.uploadProfilePicture);

export default router;