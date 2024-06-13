import express from 'express';
import db from './models';
import dotenv from 'dotenv';
import authRoutes from './routers/auth';
import book from './routers/bookRoutes';
import author from './routers/authorRoutes';
import reviews from './routers/reviewRoutes';
import rating from './routers/ratingRoutes';
import order from './routers/orderRoutes';
import payment from './routers/paymentRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: '*'

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Invoice Management System API');
});

app.use('/auth', authRoutes);
app.use('/book', book);
app.use('/author', author);
app.use('/review', reviews);
app.use('/rating',rating );
app.use('/order', order);
app.use('/payment', payment);


db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
