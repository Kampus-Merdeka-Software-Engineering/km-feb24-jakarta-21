// =============== OPEN DROPDOWN FILTER ===============
const selectBtns = document.querySelectorAll(".select-btn");

selectBtns.forEach((selectBtn) => {
  selectBtn.addEventListener("click", () => {
    const listItems = selectBtn.nextElementSibling;
    const Open = selectBtn.classList.toggle("open-list");

    // Tutup dropdown lain yang terbuka
    selectBtns.forEach((btn) => {
      if (btn !== selectBtn) {
        btn.classList.remove("open-list");
        btn.nextElementSibling.style.maxHeight = "0";
        btn.nextElementSibling.style.opacity = "0";
      }
    });

    if (Open) {
      listItems.style.maxHeight = "285px";
      listItems.style.opacity = "1";
    } else {
      listItems.style.maxHeight = "0";
      listItems.style.opacity = "0";
    }
  });
});

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    createFilter(data, "Name", ".pizza-type");
    createFilter(data, "Category", ".pizza-category");
    createFilter(data, "Size", ".pizza-size");
    bestSellingPizzaTable(data);

    // Membuat Button SELECT ALL di Pizza Type
    const selectAllButton = document.createElement("button");
    selectAllButton.textContent = "Select All";
    selectAllButton.className = "select-all";
    document.querySelector(".pizza-type").prepend(selectAllButton);

    // Menambahkan Event buat button Select ALL
    let selectAllType = false;
    selectAllButton.addEventListener("click", (e) => {
      e.preventDefault();
      selectAllType = !selectAllType;
      document.querySelectorAll(".pizza-type .item input[type=checkbox]").forEach((checkbox) => {
        checkbox.checked = selectAllType;
      });

      if (!selectAllType) {
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
        const filteredData = data.filter(filterData(selectedFilters));
        if (Object.values(selectedFilters).every((filter) => filter.length === 0)) {
          displayData([]);
        } else {
          displayData(filteredData);
        }
      });
    });

    // // Menampilkan Data awal nya 0
    // displayData([]);

    // Menampilkan Data awal dengan semua checkbox terpilih
    const initialFilters = getSelectedFilters();
    updateFilters(data, initialFilters);
    const initialFilteredData = data.filter(filterData(initialFilters));
    displayData(initialFilteredData);
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
  const pizzaTypes = selectedFilters["Name"];
  const categories = new Set();
  const sizes = new Set();

  data.forEach((item) => {
    if (!pizzaTypes.length || pizzaTypes.includes(item["Name"])) {
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
    Name: [],
    Category: [],
    Size: [],
  };

  document.querySelectorAll(".item input[type=checkbox]:checked").forEach((checkbox) => {
    const attribute = checkbox.parentElement.getAttribute("data-attribute");
    selectedFilters[attribute].push(checkbox.id);
  });
  // console.log(selectedFilters);
  return selectedFilters;
}

function filterData(selectedFilters) {
  return (item) => {
    return (
      (!selectedFilters["Name"].length || selectedFilters["Name"].includes(item["Name"])) &&
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
  createAveragePurchasedPriceChart(data);
  createDailyPizzaSalesTrendChart(data);
  createTop5BestSellingPizzaTypeChart(data);
  createTop5LeastSellingPizzaTypeChart(data);
}

let bestSellingPizzaSizeChart;
function createBestSellingPizzaSizeChart(data) {
  const ctx = document.getElementById("bestSellingPizzaSizeChart").getContext("2d");

  if (bestSellingPizzaSizeChart) {
    bestSellingPizzaSizeChart.destroy();
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

  const colors = pizzaSizes.map((size) => sizeColors[size] || "#000");

  let tickColor = "#000";
  if (document.body.classList.contains("dark")) {
    tickColor = "#fff";
  }

  bestSellingPizzaSizeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: pizzaSizes,
      datasets: [
        {
          label: "Total Sales",
          data: sizeSales,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        duration: 1500,
        easing: "easeInOutCirc",
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: tickColor,
            usePointStyle: true,
          },
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
          display: true,
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
  bestSellingPizzaSizeChart.update();
}

let averagePurchasedPriceChart;
function createAveragePurchasedPriceChart(data) {
  const ctx = document.getElementById("averagePurchasedPriceChart").getContext("2d");

  if (averagePurchasedPriceChart) {
    averagePurchasedPriceChart.destroy();
  }

  const priceRanges = {
    "$9.75 - $13.99": { min: 9.75, max: 13.99 },
    "$14 - $17.99": { min: 14, max: 17.99 },
    "$18 - $21.99": { min: 18, max: 21.99 },
    "$22 - $25.50": { min: 22, max: 25.5 },
  };

  const rangeQuantities = {
    "$9.75 - $13.99": 0,
    "$14 - $17.99": 0,
    "$18 - $21.99": 0,
    "$22 - $25.50": 0,
  };

  data.forEach((item) => {
    const price = parseFloat(item["Price"].replace("$", ""));
    for (const range in priceRanges) {
      if (price >= priceRanges[range].min && price <= priceRanges[range].max) {
        rangeQuantities[range] += item.Quantity;
        break;
      }
    }
  });

  const labels = Object.keys(rangeQuantities);
  const quantities = Object.values(rangeQuantities);

  // Hapus kategori 'Other' jika tidak ada nilai di dalamnya
  const otherIndex = labels.indexOf("Other");
  if (otherIndex !== -1 && quantities[otherIndex] === 0) {
    labels.splice(otherIndex, 1);
    quantities.splice(otherIndex, 1);
  }

  let tickColor = "#000";
  if (document.body.classList.contains("dark")) {
    tickColor = "#fff";
  }

  averagePurchasedPriceChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Quantity",
          data: quantities,
          backgroundColor: "#E4B455",
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw.toLocaleString()}`;
            },
          },
        },
        datalabels: {
          color: "#fff",
          anchor: "center",
          align: "center",
          formatter: function (value) {
            return value.toLocaleString();
          },
          font: {
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: tickColor, 
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            stepSize: 5000,
            beginAtZero: true,
            color: tickColor,
            callback: function (value) {
              return value.toLocaleString();
            },
          },
          grid: {
            display: false, 
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

let dailyPizzaSalesTrendChart;
function createDailyPizzaSalesTrendChart(data) {
  const ctx = document.getElementById("dailyPizzaSalesTrendChart").getContext("2d");

  if (dailyPizzaSalesTrendChart) {
    dailyPizzaSalesTrendChart.destroy();
  }

  // Process data to get daily sales trend
  const dailySales = data.reduce((acc, item) => {
    const day = item["Day"];
    const price = parseFloat(item["Price"].replace("$", ""));
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += price * item.Quantity;
    return acc;
  }, {});

  const labels = Object.keys(dailySales).sort();
  const sales = labels.map((day) => dailySales[day]);

  let tickColor = "#000";
  if (document.body.classList.contains("dark")) {
    tickColor = "#fff";
  }

  dailyPizzaSalesTrendChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Total Sales ($)",
          data: sales,
          backgroundColor: "transparent",
          borderColor: "#E4B455",
          borderWidth: 2,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        tension: {
          duration: 2000, // Durasi animasi
          easing: "linear", 
          from: 1.2, 
          to: 0.5, 
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${Math.round(context.raw).toLocaleString()}`;
            },
            // label: function (context) {
            //   const value = Math.round(context.raw || 0).toLocaleString();
            //   return `${value}`;
            // },
          },
        },
        datalabels: {
          color: tickColor,
          anchor: "start",
          align: "start",
          formatter: function (value) {
            return `${Math.round(value).toLocaleString()}`;
          },
          // formatter: (value) => `${Math.round(value).toLocaleString()}`,
          font: {
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: tickColor
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            stepSize: 50000,
            beginAtZero: true,
            color: tickColor,
            callback: function (value) {
              return `${value.toLocaleString()}`;
            },
          },
          grid: {
            display: false,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

let top5BestSellingPizzaTypeChart;
function createTop5BestSellingPizzaTypeChart(data) {
  const ctx = document.getElementById("top5BestSellingPizzaTypeChart").getContext("2d");

  if (top5BestSellingPizzaTypeChart) {
    top5BestSellingPizzaTypeChart.destroy();
  }

  const pizzaTypes = [...new Set(data.map((item) => item["Pizza ID"]))];
  const typeSales = pizzaTypes.map((type) => {
    return data.filter((item) => item["Pizza ID"] === type).reduce((total, item) => total + parseFloat(item["Price"].replace("$", "")) * item["Quantity"], 0);
  });

  const top5Data = pizzaTypes
    .map((type, index) => ({ type, sales: typeSales[index] }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const top5Labels = top5Data.map((item) => item.type);
  const top5Sales = top5Data.map((item) => item.sales);

  let tickColor = "#000";
  if (document.body.classList.contains("dark")) {
    tickColor = "#fff";
  }

  top5BestSellingPizzaTypeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: top5Labels,
      datasets: [
        {
          label: "Total Sales",
          data: top5Sales,
          backgroundColor: "#AF672D",
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: tickColor,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10000,
            color: tickColor,
            callback: function (value) {
              return value.toLocaleString();
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = Math.round(context.raw || 0).toLocaleString();
              return `${value}`;
            },
          },
        },
        datalabels: {
          anchor: "center",
          align: "center",
          formatter: (value) => `${Math.round(value).toLocaleString()}`,
          color: "#fff",
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

let top5LeastSellingPizzaTypeChart;
function createTop5LeastSellingPizzaTypeChart(data) {
  const ctx = document.getElementById("top5LeastSellingPizzaTypeChart").getContext("2d");

  if (top5LeastSellingPizzaTypeChart) {
    top5LeastSellingPizzaTypeChart.destroy();
  }

  const pizzaTypes = [...new Set(data.map((item) => item["Pizza ID"]))];
  const typeSales = pizzaTypes.map((type) => {
    return data.filter((item) => item["Pizza ID"] === type).reduce((total, item) => total + parseFloat(item["Price"].replace("$", "")) * item["Quantity"], 0);
  });

  const top5Data = pizzaTypes
    .map((type, index) => ({ type, sales: typeSales[index] }))
    .sort((a, b) => a.sales - b.sales)
    .slice(0, 5);

  const top5Labels = top5Data.map((item) => item.type);
  const top5Sales = top5Data.map((item) => item.sales);

  let tickColor = "#000";
  if (document.body.classList.contains("dark")) {
    tickColor = "#fff";
  }

  top5LeastSellingPizzaTypeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: top5Labels,
      datasets: [
        {
          label: "Total Sales",
          data: top5Sales,
          backgroundColor: "#886839",
          borderRadius: 10,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1000,
        easing: "easeInOutQuad",
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: tickColor,
          },
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5000,
            color: tickColor,
            callback: function (value) {
              return value.toLocaleString();
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = Math.round(context.raw || 0).toLocaleString();
              return `${value}`;
            },
          },
        },
        datalabels: {
          anchor: "center",
          align: "center",
          formatter: (value) => `${Math.round(value).toLocaleString()}`,
          color: "#fff",
          font: {
            weight: "bold",
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
}

function bestSellingPizzaTable(data) {
  const pizzaSales = data.reduce((acc, item) => {
    const name = item["Name"];
    const price = parseFloat(item["Price"].replace("$", ""));
    const totalSales = price * item["Quantity"];

    if (acc[name]) {
      acc[name] += totalSales;
    } else {
      acc[name] = totalSales;
    }
    return acc;
  }, {});

  const sortedPizzaSales = Object.entries(pizzaSales).sort((a, b) => b[1] - a[1]);

  const tableData = sortedPizzaSales.map((pizza, index) => [index + 1, pizza[0], `$ ${Math.round(pizza[1]).toLocaleString()}`]);

  $(document).ready(function () {
    $(".content-table").DataTable({
      data: tableData,
      destroy: true,
      responsive: true,
    });
    $(".content-table tbody").on("click", "td", function () {
      $(".content-table tbody td").removeClass("active");
      $(this).addClass("active");
    });
  });
}

document.addEventListener("modeChange", () => {
  let tickColor = document.body.classList.contains("dark") ? "#fff" : "#000";

  if (top5BestSellingPizzaTypeChart) {
    top5BestSellingPizzaTypeChart.options.scales.x.ticks.color = tickColor;
    top5BestSellingPizzaTypeChart.options.scales.y.ticks.color = tickColor;
    top5BestSellingPizzaTypeChart.update();
  }
  if (top5LeastSellingPizzaTypeChart) {
    top5LeastSellingPizzaTypeChart.options.scales.x.ticks.color = tickColor;
    top5LeastSellingPizzaTypeChart.options.scales.y.ticks.color = tickColor;
    top5LeastSellingPizzaTypeChart.update();
  }
  if (averagePurchasedPriceChart) {
    averagePurchasedPriceChart.options.scales.x.ticks.color = tickColor;
    averagePurchasedPriceChart.options.scales.y.ticks.color = tickColor;
    averagePurchasedPriceChart.update();
  }
  if (dailyPizzaSalesTrendChart) {
    dailyPizzaSalesTrendChart.options.scales.x.ticks.color = tickColor;
    dailyPizzaSalesTrendChart.options.scales.y.ticks.color = tickColor;
    dailyPizzaSalesTrendChart.options.plugins.datalabels.color = tickColor;
    dailyPizzaSalesTrendChart.update();
  }
  if (bestSellingPizzaSizeChart) {
    bestSellingPizzaSizeChart.options.plugins.legend.labels.color = tickColor;
    bestSellingPizzaSizeChart.update();
  }
});
