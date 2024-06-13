import { Request, Response } from 'express';
import RatingService from '../services/ratingService';

class RatingController {
  async getRatingsByBookId(req: Request, res: Response) {
    try {
      const ratings = await RatingService.getRatingsByBookId(req.params.bookId);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async createRating(req: Request, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const ratingData = {
        ...req.body,
        userId: req.body.user.id,
        bookId: req.params.bookId,
      };
      const rating = await RatingService.createRating(ratingData);
      res.status(201).json(rating);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new RatingController();
