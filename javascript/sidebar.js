// =============== SIDEBAR ===============
const body = document.querySelector("body");
const sidebar = body.querySelector("nav");
const toggle = body.querySelector(".toggle");
const hamburgerMenu = body.querySelector(".nav-hamburger");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close-sidebar");
});
hamburgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("close-sidebar");
});

// ===== Darkmode
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
  body.classList.toggle("dark");
  modeSwitch.classList.toggle("active");
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (!body.classList.contains("dark")) {
    modeText.innerText = "Dark Mode";
    return localStorage.setItem("mode", "light");
  }
  modeText.innerText = "Light Mode";
  localStorage.setItem("mode", "dark");
});
modeSwitch.addEventListener("click", () => modeSwitch.classList.toggle("active"));
