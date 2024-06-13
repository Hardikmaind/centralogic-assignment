import { Router } from 'express';
import RatingController from '../../controllers/ratingController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get('/books/:bookId/ratings', RatingController.getRatingsByBookId);
router.post('/books/:bookId/ratings', authMiddleware, RatingController.createRating);

export default router;
