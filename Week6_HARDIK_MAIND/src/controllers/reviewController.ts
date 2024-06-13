import { Request, Response } from 'express';
import ReviewService from '../services/reviewService';

class ReviewController {
  async getReviewsByBookId(req: Request, res: Response) {
    try {
      const reviews = await ReviewService.getReviewsByBookId(req.params.bookId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async createReview(req: Request, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const reviewData = {
        ...req.body,
        userId: req.body.user.id,
        bookId: req.params.bookId,
      };
      const review = await ReviewService.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async deleteReview(req: Request, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      await ReviewService.deleteReview(
        req.params.id,
        req.body.user.id,
        req.body.user.role === 'admin'
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new ReviewController();
