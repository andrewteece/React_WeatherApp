const WeatherCard = () => {
  <div>
    {weatherData && weatherData.main && (
      <div className={styles.container}>
        <h2>
          {weatherData.name}, <span>{weatherData.sys.country}</span>
        </h2>
        <h3>
          <span>{getFormattedDate()}</span>
        </h3>
        <h3 className={styles.current}>Current Weather</h3>
        <div className={styles.row}>
          <img
            className={styles.image}
            src={`${WEATHER_IMAGES_URL}/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
          <span className={styles.temperature}>
            {Math.round(weatherData.main.temp)}
            <sup>&deg;c</sup>
          </span>

          <div className={styles.description}>
            <span>{weatherData.weather[0].main}</span>
            <br />
            <span>
              Feels like {Math.round(weatherData.main.feels_like)}
              <sup>&deg;</sup>
            </span>
          </div>
        </div>

        <div className={styles.row}>
          <div>
            Wind <br /> {Math.round(weatherData.wind.speed)} m/s
          </div>
          <div>
            Humidity <br /> {weatherData.main.humidity}%
          </div>
          <div>
            Pressure <br /> {weatherData.main.pressure} mb
          </div>
        </div>
      </div>
    )}
  </div>;
};

export default WeatherCard;
