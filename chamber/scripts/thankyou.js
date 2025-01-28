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
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", () => {

  const firstName = getUrlParam("firstName");
  const lastName = getUrlParam("lastName");
  const email = getUrlParam("email");
  const phone = getUrlParam("phone");
  const businessName = getUrlParam("organization");
  const timestamp = getUrlParam("timestamp");

  document.getElementById("firstName").textContent = firstName || "Not provided";
  document.getElementById("lastName").textContent = lastName || "Not provided";
  document.getElementById("email").textContent = email || "Not provided";
  document.getElementById("phone").textContent = phone || "Not provided";
  document.getElementById("businessName").textContent = businessName || "Not provided";
  document.getElementById("timestamp").textContent = timestamp
    ? new Date(timestamp).toLocaleString()
    : "Not available";
});