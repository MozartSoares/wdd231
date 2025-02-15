function renderBase() {
  document.addEventListener("DOMContentLoaded", () => {
    renderFooter();
    renderMenu();
  });
}

function renderMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

function renderFooter() {
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent =
    `© ${currentYear} 🧑🏻‍💻Mozart Soares 🧑🏻‍💻, Brazil`;
}
export default renderBase;