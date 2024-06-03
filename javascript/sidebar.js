// =============== SIDEBAR ===============
const body = document.querySelector("body");
const sidebar = body.querySelector("nav");
const toggle = body.querySelector(".toggle");
const hamburgerMenu = body.querySelector(".nav-hamburger");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close-sidebar");
});
hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("close-sidebar");
  toggleMenuIcon()
});

function toggleMenuIcon() {
  if (sidebar.classList.contains("close-sidebar")) {
    openMenu.style.display = "block";
    closeMenu.style.display = "none"; 
  } else {
    openMenu.style.display = "none";
    closeMenu.style.display = "block"; 
  }
}
toggleMenuIcon()

// ============ Darkmode =============
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  modeSwitch.classList.toggle("active");
  document.dispatchEvent(new Event('modeChange'));
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (!body.classList.contains("dark")) {
    modeText.innerText = "Dark Mode";
    localStorage.setItem("mode", "light");
  } else {
    modeText.innerText = "Light Mode";
    localStorage.setItem("mode", "dark");
  }
  document.dispatchEvent(new Event('modeChange'));
});
modeSwitch.addEventListener("click", () => modeSwitch.classList.toggle("active"));
