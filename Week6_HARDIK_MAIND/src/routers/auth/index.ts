import { Router } from 'express';
import { register, login } from '../../controllers/authController';

import db from '../../models';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
