import { Request, Response } from 'express';
import AuthorService from '../services/authorService';

class AuthorController {
  async getAllAuthors(req: Request, res: Response) {
    try {
      const authors = await AuthorService.getAllAuthors();
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async getAuthorById(req: Request, res: Response) {
    try {
      const author = await AuthorService.getAuthorById(req.params.id);
      if (author) {
        res.json(author);
      } else {
        res.status(404).json({ error: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async createAuthor(req: Request, res: Response) {
    try {
      const author = await AuthorService.createAuthor(req.body);
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json({ error: error});
    }
  }

  async updateAuthor(req: Request, res: Response) {
    try {
      const author = await AuthorService.updateAuthor(req.params.id, req.body);
      res.json(author);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async deleteAuthor(req: Request, res: Response) {
    try {
      await AuthorService.deleteAuthor(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new AuthorController();
