import { Router } from 'express';
import { editUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.put('/user/:id', editUser);

router.delete('/user/:id', deleteUser);

export default router;