// =============== OPEN DROPDOWN FILTER ===============
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

// =============== FILTER PIZZA TYPE ===============
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const pizzaTypeFilter = document.querySelector(".pizza-type");
    const pizzas = [];
    // console.log(data)

    data.forEach((item) => {
      const pizza = item["Pizza Type ID"];
      if (pizzas.indexOf(pizza) === -1) {
        pizzas.push(pizza);
        // console.log(pizza)

        const listPizza = document.createElement("li");
        listPizza.className = "item";
        listPizza.innerHTML = `
                <input type="checkbox" id="${pizza}" />
                <label for="${pizza}">${pizza}</label>
            `;
        pizzaTypeFilter.appendChild(listPizza);

        const checkbox = listPizza.querySelector(`#${pizza}`);
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            console.log(this.id);
          }
        });
      }
    });
  });

// =============== FILTER CATEGORY ===============
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const pizzaCategoryFilter = document.querySelector(".pizza-category");
    const pizzas = [];
    // console.log(data)

    data.forEach((item) => {
      const pizza = item["Category"];
      if (pizzas.indexOf(pizza) === -1) {
        pizzas.push(pizza);
        // console.log(pizza)

        const listPizza = document.createElement("li");
        listPizza.className = "item";
        listPizza.innerHTML = `
                <input type="checkbox" id="${pizza}" />
                <label for="${pizza}">${pizza}</label>
            `;
        pizzaCategoryFilter.appendChild(listPizza);

        const checkbox = listPizza.querySelector(`#${pizza}`);
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            console.log(this.id);
          }
        });
      }
    });
  });

// =============== FILTER SIZE ===============
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const pizzaSizeFilter = document.querySelector(".pizza-size");
    const pizzas = [];
    // console.log(data)

    data.forEach((item) => {
      const pizza = item["Size"];
      if (pizzas.indexOf(pizza) === -1) {
        pizzas.push(pizza);
        // console.log(pizza)

        const listPizza = document.createElement("li");
        listPizza.className = "item";
        listPizza.innerHTML = `
                <input type="checkbox" id="${pizza}" />
                <label for="${pizza}">${pizza}</label>
            `;
        pizzaSizeFilter.appendChild(listPizza);

        const checkbox = listPizza.querySelector(`#${pizza}`);
        checkbox.addEventListener("change", function () {
          if (this.checked) {
            console.log(this.id);
          }
        });
      }
    });
  });

// =============== FILTER PRICE RANGE ===============

