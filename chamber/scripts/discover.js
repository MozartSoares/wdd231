document.addEventListener('DOMContentLoaded', () => {
  fetchAndBuildCards();
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentDate = Date.now();
  const oneDayInMs = 86400000; // 24*60*60*1000

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((currentDate - lastVisit) / oneDayInMs);
    if (daysSince === 0) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysSince === 1 ? 'day' : 'days';
      visitMessage.textContent = `You last visited ${daysSince} ${dayText} ago.`;
    }
  }

  localStorage.setItem('lastVisit', currentDate.toString());
});

const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} 🧑🏻‍💻Mozart Soares 🧑🏻‍💻, Brazil`;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last updated: ${lastModified}`;


const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

async function fetchAndBuildCards() {
  fetch('./data/discover.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('cards-container');
      data.cards.forEach(card => {
        const article = document.createElement('article');
        article.className = 'card';

        const htmlContent = `
                    <h2>${card.title}</h2>
                    <figure>
                        <img src="${card.imageSrc}" 
                          alt="${card.imageAlt}" 
                          loading="lazy" 
                          width="300" 
                          height="200">
                    </figure>
                    <address>${card.address}</address>
                    <p>${card.description}</p>
                    <a href="${card.link}">Learn More</a>
                `;

        article.innerHTML = htmlContent;
        container.appendChild(article);
      });
    })
    .catch(error => console.error('Error loading cards:', error));
}