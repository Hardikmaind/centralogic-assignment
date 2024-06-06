import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import employeeRoutes from './routes/employee.routes';
import timesheetRoutes from './routes/employee.routes';
import reportingRoutes from './routes/employee.routes';
import  sequelize  from './database/dbconn';



dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




app.use('/api/employees', employeeRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/reports', reportingRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("this is a testing route");
});





const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});





