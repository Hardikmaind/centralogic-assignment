

interface WeatherData {
city: string;
country: string;
}

interface WeatherResponse {
city: string;
country: string;
weather: string;
time: Date;
longitude: number;
latitude: number;
}

interface getapiresponse {
    id: number;
    city: string;
    country: string;
    weather: string;
    date: Date;
  }



export { WeatherData, WeatherResponse,getapiresponse };