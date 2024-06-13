import { Router } from 'express';
import BookController from '../../controllers/bookController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get('/books' ,authMiddleware , BookController.getAllBooks);
router.get('/books/:id' ,authMiddleware, BookController.getBookById);
router.post('/books' ,authMiddleware, BookController.createBook);
router.put('/books/:id' ,authMiddleware, BookController.updateBook);
router.delete('/books/:id' ,authMiddleware, BookController.deleteBook);

export default router;
