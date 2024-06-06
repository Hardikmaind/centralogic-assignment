import { Router } from 'express';
import { createTimesheet } from '../controllers/timesheets.controllers';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/', authenticate, createTimesheet);

export default router;
