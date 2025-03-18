import express from 'express';
import * as userController from '../controller/userController.js';
import multer from 'multer';
import jwtMiddleware from '../middleware/jwtMiddleware.js';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

//Public Routes
router.post('/', userController.createUser);


//Protected Routes
router.get('/', jwtMiddleware, userController.getAllUsers);
router.get('/:userID', jwtMiddleware, userController.getUserById);
router.put('/:userID', jwtMiddleware, userController.updateUser);
router.delete('/:userID', jwtMiddleware, userController.deleteUser);
router.post('/upload-profile-picture', upload.single('profilePicture'), userController.uploadProfilePicture);

export default router;