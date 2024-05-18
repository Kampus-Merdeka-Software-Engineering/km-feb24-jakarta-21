// =============== FILTER DASHBOARD ===============
// =============== FILTER DASHBOARD ===============
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

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const pizzaList = document.querySelector(".list-items");
    const pizzas = [];
    console.log(data)

    data.forEach((item) => {
      const pizza = item["Pizza Type ID"];
      if (pizzas.indexOf(pizza) === -1) {
        pizzas.push(pizza);
        console.log(pizza)

        const listPizza = document.createElement("li");
        listPizza.className = "item";
        listPizza.innerHTML = `
                <input type="checkbox" id="${pizza}" />
                <label for="${pizza}">${pizza}</label>
            `;
        pizzaList.appendChild(listPizza);
      }
    });
  });
