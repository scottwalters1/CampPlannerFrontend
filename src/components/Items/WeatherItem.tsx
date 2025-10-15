import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import type { Weather } from "../../models/weather";

const WeatherComponent = ({
  date,
  temperature_min,
  temperature_max,
  windspeed,
  precipitation,
  weathercode,
}: Weather) => {
  const getWeatherIcon = (code: number) => {
    if ([0].includes(code)) return <WiDaySunny size={32} color="gold" />; // clear sky
    if ([1, 2, 3].includes(code)) return <WiCloudy size={32} color="gray" />; // partly cloudy / cloudy
    if ([51, 53, 55, 61, 63, 65].includes(code))
      return <WiRain size={32} color="blue" />; // rain / drizzle
    if ([71, 73, 75, 77].includes(code))
      return <WiSnow size={32} color="lightblue" />; // snow / sleet
    if ([95, 96, 99].includes(code))
      return <WiThunderstorm size={32} color="purple" />; // thunderstorm
    return <WiDaySunny size={32} color="gold" />; // fallback
  };
  return (
    <div className="item-container">
      <div style={{ display: "flex", justifyContent:"space-around", alignItems:"center" }} className="sub-header-container">
        {getWeatherIcon(weathercode)}
        <h6 className="text-white" >{new Date(date).toLocaleDateString()}</h6>
        {getWeatherIcon(weathercode)}
      </div>
      <p>
        Low: {temperature_min}°C  High: {temperature_max}°C <br />
        Wind speed: {windspeed} m/s <br />
        Precipitation: {precipitation}%
      </p>
    </div>
  );
};

export default WeatherComponent;
