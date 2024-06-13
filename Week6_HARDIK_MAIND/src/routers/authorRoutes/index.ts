import { Router } from 'express';
import AuthorController from '../../controllers/authorController';
import authMiddleware  from '../../middleware/authMiddleware';

const router = Router();

router.get('/authors', authMiddleware, AuthorController.getAllAuthors);
router.get('/authors/:id', authMiddleware, AuthorController.getAuthorById);
router.post('/authors', authMiddleware, AuthorController.createAuthor);
router.put('/authors/:id', authMiddleware, AuthorController.updateAuthor);
router.delete('/authors/:id', authMiddleware, AuthorController.deleteAuthor);

export default router;
