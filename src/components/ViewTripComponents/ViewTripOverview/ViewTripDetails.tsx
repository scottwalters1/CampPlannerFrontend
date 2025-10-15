import { DayPicker } from "react-day-picker";
import WeatherComponent from "../../Items/WeatherItem";
import { useEffect, useState } from "react";
import { apiFetch } from "../../../api/api";
import type { Weather } from "../../../models/weather";

interface TripDetailsProps {
  tripName: string;
  recName: string;
  recAreaId:number;
  tripDescription: string;
  startDate: Date;
  endDate: Date;
  onChange: (date: Date) => void;
  selectedDate: Date | undefined;
}

const ViewTripDetails = ({
  tripName,
  tripDescription,
  recName,
  startDate,
  endDate,
  onChange,
  selectedDate,
  recAreaId,
}: TripDetailsProps) => {

  const [weather, setWeather] = useState<Weather[]>([]);

  useEffect(() => {
      if (!recAreaId) return;
      if(!selectedDate) return;
        console.log('Fetching weather for', selectedDate.toISOString());

      const fetchWeatherData = async () => {
        try {
          const data: {
            latitude: number;
            longitude: number;
          } = await apiFetch(`/ridb/recareas/${recAreaId}/coords`);
  
          const selDateToStr = selectedDate.toISOString().split("T")[0];
          const { latitude, longitude } = data;
          console.log({ latitude, longitude, selDateToStr });
          const weatherData: Weather[] = await apiFetch(
            `/weather?latitude=${latitude}&longitude=${longitude}&start_date=${selDateToStr}&end_date=${selDateToStr}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,weathercode`
          );
          console.log(weatherData);
  
          setWeather(
            weatherData.map((d) => ({
              date: d.date,
              temperature_max: d.temperature_max,
              temperature_min: d.temperature_min,
              windspeed: d.windspeed ?? 0,
              precipitation: d.precipitation ?? 0,
              weathercode: d.weathercode ?? 0,
            }))
          );
        } catch (err) {
          console.log(err);
        }
      };
      fetchWeatherData();
    }, [selectedDate]);


  return (
    <div className="d-flex flex-column text-center m-3 details">
      <h3 className="header-container">{tripName}</h3>
      <div className="inner-container text-start flex-grow-1 mb-3">
        <h6>
          <strong>
            <em>{recName}</em>
          </strong>
          : {tripDescription}
        </h6>
      </div>
      <h3 className="header-container">Camping Trip Dates</h3>
      <div className="inner-container" style={{flexDirection:"row"}}>
        <DayPicker
          mode="single"
          onSelect={(d) => {
            if (d) onChange(d); //dont let users deselect date. causes an error cause ui doesnt know what to render.
          }}
          selected={selectedDate}
          animate
          navLayout="around"
          month={startDate}
          disabled={{ before: startDate, after: endDate }}
        />
          <div style={{ flex: 1, overflowY: "auto", marginLeft: "10px" }}>
          {weather.map((w, index) => {
            return (
              <WeatherComponent
                key={index}
                weathercode={w.weathercode}
                windspeed={w.windspeed}
                temperature_max={w.temperature_max}
                temperature_min={w.temperature_min}
                date={w.date}
                precipitation={w.precipitation}
              />
            );
          })}
        </div>
      </div>
      <p className="inner-container mt-2">
        START: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}{" "}
        :END
      </p>
    </div>
  );
};

export default ViewTripDetails;
