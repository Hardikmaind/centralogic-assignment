import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { dot } from "node:test/reporters";
import { WeatherData } from "./types/types";
import { fetchWeatherData,getWeatherData } from "./services/logic";
dotenv.config({
    path: "./.env",
});


const app=express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.get("/",(req:Request,res:Response)=>{
    res.send("this is testing server ...I am Hardik Maind");
})




app.post("/api/SaveWeatherMapping", async (req: Request, res: Response) => {
    try {
      const cities: WeatherData[] = req.body;
      const weatherData = await fetchWeatherData(cities);
      res.status(200).json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });


//   app.get('/api/weatherDashboard', async (req: Request, res: Response) => {
//     try {
//       const { city } = req.query;
  
//       let weatherData;
//       if (city) {
//         // If city parameter is provided, get all data related to that city
//         weatherData = await Weather.findAll({
//           where: { city: city as string },
//           order: [['time', 'DESC']],
//         });
//       } else {
//         // If no city parameter, get the latest weather condition for each city
//         weatherData = await Weather.findAll({
//           attributes: [
//             'id',
//             'city',
//             'country',
//             [sequelize.fn('MAX', sequelize.col('time')), 'time'],
//             'weather',
//           ],
//           group: ['id', 'city', 'country', 'weather'],
//           order: [[sequelize.fn('MAX', sequelize.col('time')), 'DESC']],
//         });
//       }
  
//       res.status(200).json(weatherData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//     }
//   });






app.get('/api/weatherDashboard/:city?', async (req: Request, res: Response) => {
    try {
      const { city } = req.params;
      const weatherData = await getWeatherData(city);
      res.status(200).json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });
  


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})