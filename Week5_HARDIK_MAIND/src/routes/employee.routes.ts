import { Router } from 'express';
import { register, login, logout } from '../controllers/employee.controllers';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);

export default router;
