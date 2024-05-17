// =============== CONTENT DASHBOARD ===============
// =============== CONTENT DASHBOARD ===============

const selectBtns = document.querySelectorAll(".select-btn");

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener("click", () => {
    const isOpen = selectBtn.classList.toggle("open-list");
    if (isOpen) {
      const openDropdowns = document.querySelectorAll(".open-list");
      openDropdowns.forEach((dropdown) => {
        if (dropdown !== selectBtn) {
          dropdown.classList.remove("open-list");
        }
      });
    }
  });
});
