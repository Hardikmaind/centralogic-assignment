

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

export { WeatherData, WeatherResponse };