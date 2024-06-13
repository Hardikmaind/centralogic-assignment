import Author from '../models/author';

class AuthorService {
  async getAllAuthors() {
    return Author.findAll();
  }

  async getAuthorById(id: string) {
    return Author.findByPk(id);
  }

  async createAuthor(authorData: any) {
    return Author.create(authorData);
  }

  async updateAuthor(id: string, authorData: any) {
    const author = await Author.findByPk(id);
    if (author) {
      return author.update(authorData);
    }
    throw new Error('Author not found');
  }

  async deleteAuthor(id: string) {
    const author = await Author.findByPk(id);
    if (author) {
      return author.destroy();
    }
    throw new Error('Author not found');
  }
}

export default new AuthorService();
