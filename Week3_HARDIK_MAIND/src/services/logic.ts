import dotenv from "dotenv";
import {Weather} from "../models/weather.model";
import axios from "axios";
import {WeatherData, WeatherResponse} from "../types/types";
dotenv.config({
    path: "./.env",
});
async function fetchWeatherData(cities: WeatherData[]): Promise<WeatherResponse[]> {
const weatherData: WeatherResponse[] = [];

for (const city of cities) {
    // Get the geographic coordinates
    const geoResponse = await axios.get('https://api.api-ninjas.com/v1/geocoding', {
    params: { city: city.city, country: city.country },
    headers: { 'X-Api-Key': process.env.GEO_API_KEY }
    });

    const { latitude, longitude } = geoResponse.data[0];

    // Get the weather information
    const weatherResponse = await axios.get('https://weatherapi-com.p.rapidapi.com/current.json', {
    params: { q: `${latitude},${longitude}` },
    headers: {
        'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
    });

    const weather = weatherResponse.data.current.condition.text;
    const time = new Date();

    weatherData.push({
    city: city.city,
    country: city.country,
    weather,
    time,
    longitude,
    latitude
    });

     await Weather.create({
       city: city.city,
       country: city.country,
       weather,
       time,
       Longitude: longitude,
       Latitude: latitude
     });
}

return weatherData;
}

export { fetchWeatherData };