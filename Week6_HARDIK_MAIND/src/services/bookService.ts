import Book from '../models/book';

class BookService {
  async getAllBooks() {
    return Book.findAll({
      include: ['authors', 'reviews', 'ratings'],
    });
  }

  async getBookById(id: string) {
    return Book.findByPk(id, {
      include: ['authors', 'reviews', 'ratings'],
    });
  }

  async createBook(bookData: any) {
    return Book.create(bookData);
  }

  async updateBook(id: string, bookData: any) {
    const book = await Book.findByPk(id);
    if (book) {
      return book.update(bookData);
    }
    throw new Error('Book not found');
  }

  async deleteBook(id: string) {
    const book = await Book.findByPk(id);
    if (book) {
      return book.destroy();
    }
    throw new Error('Book not found');
  }
}

export default new BookService();
