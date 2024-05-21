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

// Fetch the data and create filters
// fetch("./data.json")
// .then((response) => response.json())
// .then((data) => {
//   createFilter(data, "Pizza Type ID", ".pizza-type");
//   createFilter(data, "Category", ".pizza-category");
//   createFilter(data, "Size", ".pizza-size");
// });

// function createFilter(data, attribute, containerSelector) {
//   const container = document.querySelector(containerSelector);
//   const pizzas = [];
  
//   data.forEach((item) => {
//     const pizza = item[attribute];
//     if (pizzas.indexOf(pizza) === -1) {
//       pizzas.push(pizza);

//       const listItem = document.createElement("li");
//       listItem.className = "item";
//       listItem.innerHTML = `
//         <input type="checkbox" id="${pizza}" />
//         <label for="${pizza}">${pizza}</label>
//       `;
//       container.appendChild(listItem);

//       const checkbox = listItem.querySelector(`#${pizza}`);
//       checkbox.addEventListener("change", function () {
//         if (this.checked) {
//           console.log(`add : ${this.id}`)
//         } else {
//           console.log(`delete : ${this.id}`)
//         }
//       });
//     }
//   });
// }

// function displayData(data) {
//   const totalSales = data.reduce((acc, item) => acc + (item['Price'] * item['Quantity']), 0);
//   const numOrders = [...new Set(data.map(item => item['Order ID']))].length;
//   const averageSales = totalSales / numOrders;

//   document.querySelector(".total-sales h1").textContent = `Total Sales: ${totalSales.toLocaleString()}`;
//   document.querySelector(".num-of-orders h1").textContent = `Number of Orders: ${numOrders.toLocaleString()}`;
//   document.querySelector(".average-sales h1").textContent = `Average Sales: ${averageSales.toLocaleString()}`;
// }


// // =============== FILTER PRICE RANGE ===============
// const priceRanges = [
//   { PriceRange: "$9.75 - $13.99" }, 
//   { PriceRange: "$22 - $25.50" }, 
//   { PriceRange: "$18 - $21.99" }, 
//   { PriceRange: "$14 - $17.99" }
// ];

// const pizzaPriceFilter = document.querySelector(".pizza-pricerange");

// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     // Function to determine which price range a price belongs to
//     function getPriceRange(price) {
//       const priceValue = parseFloat(price.replace("$", ""));
//       for (const range of priceRanges) {
//         const [min, max] = range.PriceRange.replace("$", "").split(" - ").map(Number);
//         if (priceValue >= min && priceValue <= max) {
//           return range.PriceRange;
//         }
//       }
//       return null;
//     }
//     // Group data by price range
//     const groupedData = priceRanges.map((range) => {
//       return {
//         PriceRange: range.PriceRange,
//         items: data.filter((item) => getPriceRange(item.Price) === range.PriceRange),
//       };
//     });

//     console.log(groupedData)

//     // Create HTML for each price range and add event listener
//     groupedData.forEach((group) => {
//       const listPizza = document.createElement("li");
//       listPizza.className = "item";
//       listPizza.innerHTML = `
//         <input type="checkbox" id="${group.PriceRange}" />
//         <label for="${group.PriceRange}">${group.PriceRange}</label>
//       `;
//       pizzaPriceFilter.appendChild(listPizza);

//       // Add event listener inside the loop to correctly reference the current checkbox
//       const checkbox = listPizza.querySelector(`input[type="checkbox"]`);
//       checkbox.addEventListener("change", function () {
//         if (this.checked) {
//           console.log(this.id);
//         }
//       });
//     });
//   })
//   .catch((error) => console.error("Error fetching data:", error));



fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    createFilter(data, "Pizza Type ID", ".pizza-type");
    createFilter(data, "Category", ".pizza-category");
    createFilter(data, "Size", ".pizza-size");

    // Tambahkan event listener untuk mendeteksi perubahan pada filter
    document.querySelectorAll(".item input[type=checkbox]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedFilters = getSelectedFilters();
        const filteredData = data.filter(filterData(selectedFilters));
        displayData(filteredData);
      });
    });

    // Tampilkan nilai awal sebagai 0
    displayData([]);
  });

function createFilter(data, attribute, containerSelector) {
  const container = document.querySelector(containerSelector);
  const pizzas = [];

  data.forEach((item) => {
    const pizza = item[attribute];
    if (pizzas.indexOf(pizza) === -1) {
      pizzas.push(pizza);

      const listItem = document.createElement("li");
      listItem.className = "item";
      listItem.setAttribute("data-attribute", attribute);  // Menambahkan atribut data-attribute
      listItem.innerHTML = `
        <input type="checkbox" id="${pizza}" />
        <label for="${pizza}">${pizza}</label>
      `;
      container.appendChild(listItem);
    }
  });
}

function getSelectedFilters() {
  const selectedFilters = {
    "Pizza Type ID": [],
    Category: [],
    Size: [],
  };

  document.querySelectorAll(".item input[type=checkbox]:checked").forEach((checkbox) => {
    const attribute = checkbox.parentElement.getAttribute("data-attribute");
    selectedFilters[attribute].push(checkbox.id);
  });

  return selectedFilters;
}

function filterData(selectedFilters) {
  return (item) => {
    return (
      (!selectedFilters["Pizza Type ID"].length || selectedFilters["Pizza Type ID"].includes(item["Pizza Type ID"])) &&
      (!selectedFilters["Category"].length || selectedFilters["Category"].includes(item["Category"])) &&
      (!selectedFilters["Size"].length || selectedFilters["Size"].includes(item["Size"]))
    );
  };
}

function displayData(data) {
  const totalSales = data.reduce((acc, item) => {
    const price = parseFloat(item['Price'].replace('$', ''));
    return acc + (price * item['Quantity']);
  }, 0);

  const numOrders = data.length > 0 ? new Set(data.map(item => item['Order ID'])).size : 0;
  const averageSales = numOrders > 0 ? totalSales / numOrders : 0;

  document.querySelector(".total-sales h1").textContent = `$${totalSales.toLocaleString()}`;
  document.querySelector(".num-of-orders h1").textContent = `$${numOrders.toLocaleString()}`;
  document.querySelector(".average-sales h1").textContent = `${averageSales.toLocaleString()}`;
}
