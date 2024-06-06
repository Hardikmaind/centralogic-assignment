import { Router } from 'express';
import { getReport } from '../controllers/reporting.controllers';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/', authenticate, getReport);

export default router;
