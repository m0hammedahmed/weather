const apikey = '062e5ccdceed63124e58f62653a95b6b';
const apiurl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const search_box = document.querySelector ('.search input');
const search_btn = document.querySelector ('.search button');
const weathericonv = document.querySelector ('#weather-icon');

async function check_weather (city) {
  const response = await fetch (apiurl + city + `&appid=${apikey}`);
  if (response.status == 404) {
    document.querySelector ('.error').style.display = 'block';
    document.querySelector ('.weather').style.display = 'none';
  } else {
    const data = await response.json ();
    document.querySelector ('#city').innerHTML = data.name;
    document.querySelector ('#temp').innerHTML =
      Math.round (data.main.temp) + '°C';
    document.querySelector ('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector ('.wind').innerHTML = data.wind.speed + 'km/h';
    if (data.weather[0].main == 'Clouds') {
      weathericonv.src = 'cloud.png';
    } else if (data.weather[0].main == 'Clear') {
      weathericonv.src = 'clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weathericonv.src = 'rain.png';
    } else if (data.weather[0].main == 'Mist') {
      weathericonv.src = 'mist.png';
    }
    document.querySelector ('.weather').style.display = 'block';
    document.querySelector ('.error').style.display = 'none';
  }
}

search_btn.addEventListener ('click', () => {
  check_weather (search_box.value);
});
