import { Router } from 'express';
import ReviewController from '../../controllers/reviewController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get('/books/:bookId/reviews', ReviewController.getReviewsByBookId);
router.post('/books/:bookId/reviews', authMiddleware, ReviewController.createReview);
router.delete('/reviews/:id', authMiddleware, ReviewController.deleteReview);

export default router;
