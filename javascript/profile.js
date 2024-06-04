let teamName = [
  {
    image: "asset/photoGhaniya.jpg",
    name: "Ghaniya Madinah Kesrul",
    universitas: "Univ. Al-Ghifari",
    jobdesk: ["Project Leader", "DA & SE"],
    duration : 800,
  },
  {
    image: "asset/photoVita.JPG",
    name: "Theresia Elvita Tjia",
    universitas: "Univ. Cokroaminoto Palopo",
    jobdesk: ["DA Data Analysis", "SE Deployment Team"],
    duration : 1000,
  },
  {
    image: "asset/photoAchaa.png",
    name: "Siti Maysaroh Zain",
    universitas: "Univ. Hasanuddin",
    jobdesk: ["DA Data Cleaning", "SE Frontend Developer"],
    duration : 1200,
  },
  {
    image: "asset/photoHikma.jpg",
    name: "Nur Hikmah",
    universitas: "Univ. Hasanuddin",
    jobdesk: ["DA Data Visualization", "SE Quality Assurance"],
    duration : 1400,
  },
  {
    image: "asset/photoKania.jpg",
    name: "Ni Nyoman Kania Amandari",
    universitas: "Univ. Pendidikan Ganesha",
    jobdesk: ["DA Data Analysis", "SE Quality Assurance"],
    duration : 2000,
  },
  {
    image: "asset/photoSyifa.png",
    name: "Syifa Amalia Putri",
    universitas: "Univ. Gunadarma",
    jobdesk: ["DA Data Visualization", "SE Pitch Deck Team"],
    duration : 2200,
  },
  {
    image: "asset/photoRafif.jpg",
    name: "Rafif Imam Faisal",
    universitas: "Univ. Dian Nuswantoro",
    jobdesk: ["DA Data Communication", "SE Frontend Developer"],
    duration : 1600,
  },
  {
    image: "asset/photoRizal.jpg",
    name: "Mohamad Rizal Prasetyo",
    universitas: "Univ. Insan Pembangunan",
    jobdesk: ["DA Data Cleaning", "SE Frontend Developer"],
    duration : 1800,
  },
  {
    image: "asset/photoAgung.jpg",
    name: "Agung Hidayat",
    universitas: "Politeknik Negri Semarang",
    jobdesk: ["DA Data Comunication", "SE Pitch Deck Team"],
    duration : 2400,
  },
  {
    image: "asset/photoKentji.jpg",
    name: "Kentji Hadiwidjajalu",
    universitas: "Univ. Tarumanegara",
    jobdesk: ["DA Data Analysis", "SE Quality Assurance"],
    duration : 2600,
  },
];

const card = document.querySelector(".container-card");
for (let i in teamName) {
  card.innerHTML += `
    <div class="box" data-aos="fade-up" data-aos-duration="1000">
    <div class="image" data-aos="zoom-in" data-aos-duration="1500">
      <img src="${teamName[i].image}" alt="Foto">
    </div>
    <div class="card-body" data-aos="zoom-in" data-aos-duration="1500">
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