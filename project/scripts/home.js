import renderBase from "./base.js";
renderBase();
const exploreCards = [
  {
    image: "./images/serra.webp",
    alt: "Serra Catarinense",
    title: "Mountain Region",
    description:
      "Discover the breathtaking landscapes of Brazil with its cool climate, canyons, and traditional German-influenced architecture.",
    link: "https://dare2go.com/santa-catarina-spectacular-mountain-roadtrip/",
    buttonText: "Explore Mountains"
  },
  {
    image: "./images/florianopolis1.webp",
    alt: "Florianópolis Beaches",
    title: "Coastal Paradise",
    description:
      "Explore over 500km of coastline with pristine beaches, surfing spots, and coastal cities like Florianópolis and Balneário Camboriú.",
    link: "https://latinamericanpost.com/life/travel-en/brazils-beachfront-paradise-a-guide-to-florianopolis/",
    buttonText: "Discover Beaches"
  },
  {
    image: "./images/cultural.webp",
    alt: "Cultural Heritage",
    title: "Cultural Heritage",
    description:
      "Experience the unique blend of European traditions in cities like Blumenau and Pomerode, home to Oktoberfest and colonial architecture.",
    link: "https://www.hurfpostbrasil.com/santa-catarina-brazil/",
    buttonText: "Explore Culture"
  }
];

function createCards(cards) {
  const exploreSection = document.querySelector(".cards-container");
  exploreCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.alt}" loading="lazy">
      <div class="card-content">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <a href="${card.link}" class="card-btn">>${card.buttonText}</a>
      </div>
    `;
    exploreSection.appendChild(cardElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  createCards(exploreCards);
});

