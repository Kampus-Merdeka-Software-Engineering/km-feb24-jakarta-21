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

    // Membuat Button SELECT ALL di Pizza Type
    const selectAllButton = document.createElement("button");
    selectAllButton.textContent = "Select All";
    selectAllButton.className = "select-all";
    document.querySelector(".pizza-type").prepend(selectAllButton);

    // Menambahkan Event buat button Select ALL
    let selectAllState = false;
    selectAllButton.addEventListener("click", (e) => {
      e.preventDefault();
      selectAllState = !selectAllState;
      document.querySelectorAll(".pizza-type .item input[type=checkbox]").forEach((checkbox) => {
        checkbox.checked = selectAllState;
      });

      if (!selectAllState) {
        // Jika semua checkbox di-uncheck, tampilkan data kosong
        displayData([]);
      } else {
        const selectedFilters = getSelectedFilters();
        updateFilters(data, selectedFilters);
        const filteredData = data.filter(filterData(selectedFilters));
        displayData(filteredData);
      }
    });

    document.querySelectorAll(".pizza-type .item input[type=checkbox]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedFilters = getSelectedFilters();
        updateFilters(data, selectedFilters);
        // const filteredData = data.filter(filterData(selectedFilters));
        // displayData(filteredData);
        // console.log(filteredData);
        const filteredData = data.filter(filterData(selectedFilters));
        if (Object.values(selectedFilters).every((filter) => filter.length === 0)) {
          displayData([]); // Tampilkan data kosong jika tidak ada yang di ceklis
        } else {
          displayData(filteredData);
        }
      });
    });

    document.querySelectorAll(".pizza-category .item input[type=checkbox], .pizza-size .item input[type=checkbox]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        const selectedFilters = getSelectedFilters();
        // const filteredData = data.filter(filterData(selectedFilters));
        // displayData(filteredData);
        const filteredData = data.filter(filterData(selectedFilters));
        if (Object.values(selectedFilters).every((filter) => filter.length === 0)) {
          displayData([]); // Tampilkan data kosong jika tidak ada yang di ceklis
        } else {
          displayData(filteredData);
        }
      });
    });

    // Menampilkan Data awal nya 0
    displayData([]);
  });

function createFilter(data, attribute, containerSelector) {
  const container = document.querySelector(containerSelector);
  const items = [];

  data.forEach((item) => {
    const value = item[attribute];
    if (items.indexOf(value) === -1) {
      items.push(value);

      const listItem = document.createElement("li");
      listItem.className = "item";
      listItem.setAttribute("data-attribute", attribute);
      listItem.innerHTML = `
          <input type="checkbox" id="${value}" />
          <label for="${value}">${value}</label>
        `;
      container.appendChild(listItem);
    }
  });
}

function updateFilters(data, selectedFilters) {
  const pizzaTypes = selectedFilters["Pizza Type ID"];
  const categories = new Set();
  const sizes = new Set();

  data.forEach((item) => {
    if (!pizzaTypes.length || pizzaTypes.includes(item["Pizza Type ID"])) {
      categories.add(item["Category"]);
      sizes.add(item["Size"]);
    }
  });

  updateFilterOptions(".pizza-category", categories, selectedFilters["Category"]);
  updateFilterOptions(".pizza-size", sizes, selectedFilters["Size"]);
}

function updateFilterOptions(containerSelector, options, selectedOptions) {
  const container = document.querySelector(containerSelector);
  container.querySelectorAll(".item").forEach((item) => {
    const value = item.querySelector("input").id;
    const checkbox = item.querySelector("input");
    if (options.has(value)) {
      item.style.display = "";
      checkbox.checked = selectedOptions.includes(value);
    } else {
      item.style.display = "none";
      checkbox.checked = false;
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

  console.log(selectedFilters);
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
  // Total Sales = price * quantity
  let totalSales = 0;
  if (data.length > 0) {
    totalSales = data.reduce((acc, item) => {
      const price = parseFloat(item["Price"].replace("$", ""));
      return acc + price * item["Quantity"];
    }, 0);
  }

  // Num of Order = count_distinct(Order_id)
  let numOrders = 0;
  if (data.length > 0) {
    const orderIds = data.map((item) => item["Order ID"]);
    const uniqueOrderIds = new Set(orderIds);
    numOrders = uniqueOrderIds.size;
  }

  // AVG Sales = price * quantity / count_distinct(Order_id)
  let averageSales = 0;
  if (numOrders > 0) {
    averageSales = totalSales / numOrders;
  }

  document.querySelector(".total-sales h1").textContent = `$${totalSales.toLocaleString()}`;
  document.querySelector(".num-of-orders h1").textContent = `${numOrders.toLocaleString()}`;
  document.querySelector(".average-sales h1").textContent = `$${averageSales.toLocaleString()}`;

  // Update chart
  createBestSellingPizzaSizeChart(data);
}

let bestSellingPizzaSizeChart;

function createBestSellingPizzaSizeChart(data) {
  const ctx = document.getElementById("bestSellingPizzaSizeChart").getContext("2d");

  if (bestSellingPizzaSizeChart) {
    bestSellingPizzaSizeChart.destroy(); // Destroy previous chart instance if it exists
  }

  const pizzaSizes = [...new Set(data.map((item) => item.Size))];
  const sizeSales = pizzaSizes.map((size) => {
    return data.filter((item) => item.Size === size).reduce((total, item) => total + parseFloat(item.Price.replace("$", "")) * item.Quantity, 0);
  });

  const sizeColors = {
    S: "#AF672D",
    M: "#D3B786",
    L: "#886839",
    XL: "#E4B455",
  };

  const colors = pizzaSizes.map((size) => sizeColors[size] || "#000000");

  bestSellingPizzaSizeChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: pizzaSizes,
      datasets: [
        {
          label: "Total Sales",
          data: sizeSales,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
              const percentage = ((value / total) * 100).toFixed(2);
              return `${label}: $${value.toFixed(2)} (${percentage}%)`;
            },
          },
        },
        datalabels: {
          formatter: (value, context) => {
            const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${percentage}%`;
          },
          color: "#fff",
          labels: {
            title: {
              font: {
                weight: "bold",
              },
            },
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}
