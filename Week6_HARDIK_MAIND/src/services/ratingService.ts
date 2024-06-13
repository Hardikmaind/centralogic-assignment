import Rating from '../models/rating';

class RatingService {
  async getRatingsByBookId(bookId: string) {
    return Rating.findAll({ where: { bookId } });
  }

  async createRating(ratingData: { userId: string, bookId: string, rating: number }) {
    return Rating.create(ratingData);
  }
}

export default new RatingService();
