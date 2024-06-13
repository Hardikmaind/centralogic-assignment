import { Request, Response } from 'express';
import BookService from '../services/bookService';

class BookController {
  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BookService.getAllBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const book = await BookService.getBookById(req.params.id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async createBook(req: Request, res: Response) {
    try {
      const book = await BookService.createBook(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const book = await BookService.updateBook(req.params.id, req.body);
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      await BookService.deleteBook(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new BookController();
