let teamName = [
  {
    image: "../asset/levi.webp",
    name: "Ghaniya Madinah Kesrul",
    universitas: "Universitas Al-Ghifari",
    jobdesk: ["DA Project Leader", " "],
  },
  {
    image: "../asset/levi.webp",
    name: "Theresia Elvita Tjia",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Analysis", "SE Deployment Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Siti Maysaroh Zain",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Cleaning", "SE Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Nur Hikmah",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Visualization", "SE Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Rafif Imam Faisal",
    universitas: "Universitas Dian Nuswantoro",
    jobdesk: ["DA Data Communication", "SE Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Mohamad Rizal Prasetyo",
    universitas: "Universitas Insan Pembangunan",
    jobdesk: ["DA Data Cleaning", "SE Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Ni Nyoman Kania Amandari",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Analysis", "SE Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Syifa Amalia Putri",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Visualization", "SE Pitch Deck Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Agung Hidayat",
    universitas: "Politeknik Negri Semarang",
    jobdesk: ["DA Data Comunication", "SE Pitch Deck Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Kentji Hadiwidjajalu",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Analysis", "SE Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Luther Jonatan Samuri",
    universitas: "Universitas Kampus Merdeka",
    jobdesk: ["DA Data Visualization", "SE Frontend Developer"],
  },
];

const card = document.querySelector(".container-card");
for (let i in teamName) {
  card.innerHTML += `
    <div class="box">
    <div class="image">
      <img src="${teamName[i].image}" alt="">
    </div>
    <div class="card-body">
      <h1 class="name">${teamName[i].name}</h1>
      <ul class="name-job">
        <li>${teamName[i].jobdesk[0]}</li>
        <li>${teamName[i].jobdesk[1]}</li>
      </ul>
      <p class="name-univ">${teamName[i].universitas}</p>
    </div>
    </div>
    `;
}