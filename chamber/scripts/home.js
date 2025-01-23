document.addEventListener('DOMContentLoaded', async () => {
  fetchSpotlightMembers()
  fetchWeatherData();
});
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} 🧑🏻‍💻Mozart Soares 🧑🏻‍💻, Brazil`;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last updated: ${lastModified}`;

const apiKey = 'f012c3a9c8db66ad692a01c1ba3dfb8b';
const chamberLocation = { lat: -26.9078, lon: -48.6619 };

async function fetchWeatherData() {
  try {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${chamberLocation.lat}&lon=${chamberLocation.lon}&units=imperial&appid=${apiKey}`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl)
    ]);

    const currentWeather = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    const currentWeatherElement = document.getElementById('current-weather');
    currentWeatherElement.innerHTML = `
        <p><strong class="active-link">${Math.round(currentWeather.main.temp)}°F</strong> - ${currentWeather.weather[0].description}</p>
        <p>High: ${Math.round(currentWeather.main.temp_max)}°F | Low: ${Math.round(currentWeather.main.temp_min)}°F</p>
        <p>Humidity: ${currentWeather.main.humidity}%</p>
        <p>Sunrise: ${new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</p>
      `;

    const forecastElement = document.getElementById('forecast');
    let forecastHtml = '<h3>3-Day Forecast</h3>';
    for (let i = 0; i < 3; i++) {
      const forecast = forecastData.list[i * 8];
      forecastHtml += `
          <p>
            <strong>${new Date(forecast.dt * 1000).toLocaleDateString()}</strong>: 
            ${Math.round(forecast.main.temp)}°F - ${forecast.weather[0].description}
          </p>
        `;
    }
    forecastElement.innerHTML = forecastHtml;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    document.getElementById('current-weather').innerHTML = `<p>Error loading weather data.</p>`;
  }
}

async function fetchSpotlightMembers() {
  try {
    const response = await fetch('./data/members.json');
    const members = await response.json();

    const eligibleMembers = members.filter(member =>
      member.membership_level === 3 || member.membership_level === 2
    );

    const spotlightMembers = [];
    while (spotlightMembers.length < 3 && eligibleMembers.length > 0) {
      const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
      spotlightMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
    }

    const spotlightGrid = document.querySelector('.spotlight-grid');
    spotlightGrid.innerHTML = spotlightMembers.map(member => {
      let membershipClass = "";
      switch (member.membership_level) {
        case 1:
          membershipClass = "Member";
          break;
        case 2:
          membershipClass = "Silver";
          break;
        case 3:
          membershipClass = "Gold";
          break;
        default:
          membershipClass = "Member";
      }
      return `
        <div class="spotlight-card">
          <p class="${membershipClass}">Membership<br>${membershipClass}</p>
          <img src="images/${member.image}" class="svg-image" alt="${member.name} logo">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <div class="button">
            <a href="${member.website}" target="_blank">Visit Website</a>
          </div>
        </div>
      `}).join('');

  } catch (error) {
    console.error('Error loading members:', error);
    document.querySelector('.spotlight-grid').innerHTML = `<p>Error loading spotlight members.</p>`;
  }
}