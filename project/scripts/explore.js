let map;
let currentLocation = null;
const modal = document.getElementById('locationModal');
const closeModal = document.querySelector('.close-modal');

function openModal(location) {
  currentLocation = location;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  document.querySelector('.modal-image').src = location.image;
  document.querySelector('.modal-title').textContent = location.name;
  document.querySelector('.modal-description').textContent = location.description;
  document.querySelector('.modal-tip').textContent = location.culturalTip;
  document.querySelector('.modal-temp').textContent = `${location.weather.temp}°C`;
  document.querySelector('.modal-humidity').textContent = `${location.weather.humidity}%`;
  document.querySelector('.modal-elevation').textContent = location.elevation;
  document.querySelector('.modal-details-link').href = location.detailsLink;
}

function closeModalFunc() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModalFunc();
});
async function loadRegionData() {
  try {
    const response = await fetch('./data/index.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.regions;
  } catch (error) {
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const regions = await loadRegionData();

    document.querySelectorAll('.region-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        updateRegion(btn.dataset.region, regions);
      });
    });

    if (regions.length > 0) {
      updateRegion('north', regions);
    } else {
      showError('No region data found');
    }
  } catch (error) {
    showError('Failed to load region data');
  }
});

function updateRegion(regionId, regions) {
  try {
    const region = regions.find(r => r.id === regionId);
    if (!region) throw new Error(`Region ${regionId} not found`);

    document.querySelectorAll('.region-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.region === regionId);
    });

    const contentContainer = document.getElementById('region-content');
    contentContainer.innerHTML = `
      <div class="region-header">
        <h2>${region.name}</h2>
        <div class="region-meta">
          <p class="climate-info">${region.climate}</p>
          <p class="best-time">Best time to visit: ${region.bestTime}</p>
          <p class="best-time">Click on a card to expand it's details</p>
        </div>
      </div>
      <div class="locations-grid">
        ${region.locations.map(location =>
      `<article class="location-card" data-location='${JSON.stringify(location)}'>
            <div class="card-media" onclick="openModal(${JSON.stringify(location)})">
              <img src="${location.image}" alt="${location.name}" loading="lazy">
              <div class="card-badge">${location.type}</div>
              <div class="card-rating">⭐ ${location.rating}/5</div>
            </div>
            <div class="card-content">
              <h3>${location.name}</h3>
              <div class="card-stats">
                <div class="stat-item">
                  <span>🌡️ Avg Temp</span>
                  <strong>${location.weather.temp}°C</strong>
                </div>
                <div class="stat-item">
                  <span>💧 Humidity</span>
                  <strong>${location.weather.humidity}%</strong>
                </div>
                <div class="stat-item">
                  <span>📌 Elevation</span>
                  <strong>${location.elevation}</strong>
                </div>
              </div>
              <p class="card-desc">${location.description}</p>
              <div class="card-actions">
                
                <a href="${location.detailsLink}" class="btn-learn-more">
                  Learn More →
                </a>
              </div>
              <div class="cultural-tip">
                <strong>Local Tip:</strong> ${location.culturalTip}
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;

    initMap(region.locations);
    document.querySelectorAll('.location-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.btn-learn-more')) {
          openModal(JSON.parse(card.dataset.location));
        }
      })
    })

    document.querySelectorAll('.btn-map').forEach(btn => {
      btn.addEventListener('click', () => {
        const coords = btn.dataset.coords;
        map.setCenter(JSON.stringify(coords));
        map.setZoom(12);
      });
    });
  } catch (error) {
    showError(error.message);
  }
}

function initMap(locations) {
  try {
    const mapElement = document.getElementById('map');
    if (!locations) return
    if (!mapElement) throw new Error('Map container not found');

    if (!map && locations.length > 0) {
      map = new google.maps.Map(mapElement, {
        center: locations[0].coords,
        zoom: 6,
      });
    }

    if (window.markers) {
      window.markers.forEach(marker => marker.setMap(null));
    }

    window.markers = locations.map(location => {
      return new google.maps.Marker({
        position: location.coords,
        map,
        title: location.name,
      });
    });

    const bounds = new google.maps.LatLngBounds();
    locations.forEach(location => bounds.extend(location.coords));
    map.fitBounds(bounds);
  } catch (error) {
    return
  }
}

function showError(message) {
  const container = document.getElementById('region-content');
  container.innerHTML = `<div class="error-message">${message}</div>`;
}

function loadMapScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?&callback=initMap`;
  script.defer = true;
  document.head.appendChild(script);
}

window.addEventListener('load', loadMapScript);