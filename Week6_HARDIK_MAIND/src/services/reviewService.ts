import Review from '../models/review';
import User from '../models/user';
import Book from '../models/book';

class ReviewService {
  async getReviewsByBookId(bookId: string) {
    return Review.findAll({
      where: { bookId },
      include: [User, Book],
    });
  }

  async createReview(reviewData: any) {
    return Review.create(reviewData);
  }

  async deleteReview(id: string, userId: string, isAdmin: boolean) {
    const review = await Review.findByPk(id);
    if (review) {
      if (review.userId === userId || isAdmin) {
        return review.destroy();
      } else {
        throw new Error('Not authorized to delete this review');
      }
    }
    throw new Error('Review not found');
  }
}

export default new ReviewService();
