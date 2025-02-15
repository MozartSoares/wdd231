const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent =
  `© ${currentYear} 🧑🏻‍💻Mozart Soares 🧑🏻‍💻, Brazil`;

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuToggle.classList.toggle("active");
});
