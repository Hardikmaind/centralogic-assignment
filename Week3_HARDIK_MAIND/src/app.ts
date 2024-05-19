import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { dot } from "node:test/reporters";
import { WeatherData } from "./types/types";
import { fetchWeatherData } from "./services/logic";
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

// app.post("/api/SaveWeatherMapping", async (req: Request, res: Response) => {
//     try {
//       const cities = req.body;
//       const weatherData = [];
  
//       for (const city of cities) {
//         // Get the geographic coordinates
//         const geoResponse = await axios.get('https://api.api-ninjas.com/v1/geocoding', {
//           params: { city: city.city, country: city.country },
//           headers: { 'X-Api-Key': process.env.GEO_API_KEY }
//         });
  
//         const { latitude, longitude } = geoResponse.data[0];
  
//         // Get the weather information
//         const weatherResponse = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
//           params: { q: `${latitude},${longitude}` },
//           headers: {
//             'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
//             'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
//           }
//         });
  
//         const weather = weatherResponse.data.current.condition.text;
//         const time = new Date();
  
//         weatherData.push({
//           city: city.city,
//           country: city.country,
//           weather,
//           time,
//           longitude,
//           latitude
//         });
  
//         // Save to database
//         // await Weather.create({
//         //   city: city.city,
//         //   country: city.country,
//         //   weather,
//         //   time,
//         //   Longitude: longitude,
//         //   Latitude: latitude
//         // });
//       }
  
//       res.status(200).json(weatherData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal server error');
//     }
//   });




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




app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})