import { useEffect, useState } from 'react';
//import Autocomplete from 'react-google-autocomplete';
import styles from './Weather.module.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(fetchCoordinatesData, setError);
  }, []);

  const fetchCoordinatesData = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log('lat=', lat);
    console.log('long=', long);

    fetchData(lat, long);
  };

  const setError = (error) => {
    if (error.code === 1) {
      setErrorMessage(
        'Geolocation is disabled. The app does not work without Geolocation.'
      );

      return;
    }
    setErrorMessage(error.message);
  };

  const fetchData = async (lat, long) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${WEATHER_COORDS_URL}/?lat=${lat}&lon=${long}&units=metric&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );

      setLoading(false);
      if (!response.ok) {
        setErrorMessage('Error in response. Try again later');
      }

      const data = await response.json();
      setWeatherData(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage('Error in connection. Try again later');
    }
  };

  const onPlaceSelected = (place) => {
    console.log(place);
    if (!place || !place.geometry || !place.geometry.location) return;
    const lat = place.geometry.location.lat();
    const long = place.geometry.location.lng();
    console.log(lat, long);
    fetchData(lat, long);
  };

  return (
    <div>
      <h3>Current Weather</h3>
    </div>
  );
};

export default Weather;
