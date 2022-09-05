const getBackground = (mainWeather) => {
  switch (mainWeather) {
    case 'Clouds':
      return 'Clouds';
    case 'Clear':
      return 'Clear';
    case 'Snow':
      return 'Snow';
    case 'Rain':
      return 'Rain';
    case 'Drizzle':
      return 'Rain';
    case 'Thunderstorm':
      return 'Thunderstorm';
    default:
      return 'Mist';
  }
};

export default getBackground;
