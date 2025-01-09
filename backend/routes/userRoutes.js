import express from 'express';
import * as userController from '../controller/userController.js';

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:userID', userController.updateUser);
router.delete('/:userID', userController.deleteUser);

export default router;