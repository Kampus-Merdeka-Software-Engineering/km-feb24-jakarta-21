let teamName = [
  {
    image: "../asset/levi.webp",
    name: "Ghaniya Madinah Kesrul",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Project Leader", "Project Leader"],
  },
  {
    image: "../asset/levi.webp",
    name: "Theresia Elvita Tjia",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Analysis", "Deployment Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Siti Maysaroh Zain",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Cleaning", "Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Nur Hikmah",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Visualization", "Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Rafif Imam Faisal",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Communication", "Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Mohamad Rizal Prasetyo",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Cleaning", "Frontend Developer"],
  },
  {
    image: "../asset/levi.webp",
    name: "Ni Nyoman Kania Amandari",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Analysis", "Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Syifa Amalia Putri",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Visualization", "Pitch Deck Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Agung Hidayat",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Comunication", "Pitch Deck Team"],
  },
  {
    image: "../asset/levi.webp",
    name: "Kentji Hadiwidjajalu",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Analysis", "Quality Assurance"],
  },
  {
    image: "../asset/levi.webp",
    name: "Luther Jonatan Samuri",
    universitas: "Universitas Kampus Merdeka 2024",
    jobdesk: ["Data Visualization", "Frontend Developer"],
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
      <p class="name-univ">${teamName[i].universitas}</p>
      <ul class="name-job">
        <li>${teamName[i].jobdesk[0]}</li>
        <li>${teamName[i].jobdesk[1]}</li>
      </ul>
    </div>
    </div>
    `;
}
