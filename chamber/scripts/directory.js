const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  menuToggle.classList.toggle('active');
});
let currentView = 'card';
let businesses = [];
document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('./data/members.json')
  businesses = await response.json();
  createList(businesses);
});

const currentYear = new Date().getFullYear();
document.getElementById('copyright').textContent = `© ${currentYear} 🧑🏻‍💻Mozart Soares 🧑🏻‍💻, Brazil`;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last updated: ${lastModified}`;

document.getElementById('toggle-view').addEventListener('click', () => {
  currentView = currentView === 'card' ? 'list' : 'card';
  if (businesses) {
    createList(businesses)
  }
})
function createList(businesses) {
  const container = document.getElementById("businesses-list");
  container.innerHTML = "";
  container.classList.remove("grid");
  container.classList.remove("list");

  if (currentView === 'card') {
    container.classList.add(`grid`)
    businesses.forEach(business => {
      const item = document.createElement("div");
      item.classList.add("business-card");

      let membershipClass = "";
      switch (business.membership_level) {
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

      item.innerHTML = `
        <div class="card-header">
          <div>
            <h1>${business.name}</h1>
            <p>${business.description}</p>
            <p class="membership-level"><span class="${membershipClass}">${membershipClass}</span></p>
          </div>
        </div>
        <div class="card-body">
          <div class="card-image">
            <img src="images/${business.image}" alt="${business.name}">
          </div>
          <div class="card-details">
            <p><strong>ADDRESS:</strong> ${business.address}</p>
            <p><strong>PHONE:</strong> ${business.phone}</p>
            <p><strong>URL: </strong><a href="${business.website}" target="_blank">${business.website}</a></p>
          </div>
        </div>
      `;

      container.appendChild(item);
    });
  } else {
    // Exibe como linhas separadas
    container.classList.add(`list`)
    businesses.forEach(business => {
      const row = document.createElement("div");
      row.classList.add("business-row");

      let membershipClass = "";
      switch (business.membership_level) {
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

      row.innerHTML = `
        <h1 class="row-item name">${business.name}</h1>
        <div class="row-item description"><strong>Description</strong> ${business.description}</div>
        <div class="row-item address"><strong>Address</strong> ${business.address}</div>
        <div class="row-item phone"><strong>Phone</strong> ${business.phone}</div>
        <div class="row-item membership button"><strong>Membership:</strong> <span class="${membershipClass}">${membershipClass}</span></div>
        <div class="website button"><a href="${business.website}" target="_blank">Website</a></div>
      `;
      container.appendChild(row);
    });
  }
}

