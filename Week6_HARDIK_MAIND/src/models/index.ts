import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import Book from './book';
import Review from './review';
import Rating from './rating';
import Order from './order';
import Author from './author';
import Payment from './payment';

const db: { [key: string]: any } = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Book = Book;
db.Review = Review;
db.Rating = Rating;
db.Order = Order;
db.Author = Author;
db.Payment = Payment;

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Book.hasMany(Review, { foreignKey: 'bookId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

Book.hasMany(Rating, { foreignKey: 'bookId' });
Rating.belongsTo(Book, { foreignKey: 'bookId' });

Book.hasMany(Payment, { foreignKey: 'bookId' });
Payment.belongsTo(Book, { foreignKey: 'bookId' });

Book.hasMany(Order, { foreignKey: 'bookId' });
Order.belongsTo(Book, { foreignKey: 'bookId' });

Author.belongsToMany(Book, { through: 'BookAuthors' });
Book.belongsToMany(Author, { through: 'BookAuthors' });

export default db;
