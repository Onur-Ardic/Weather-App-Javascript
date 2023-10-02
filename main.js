const url = "https://api.openweathermap.org/data/2.5/";
const key = "865215315bcae635b2a711b7c3457adc";
const header = document.querySelector(".header");
const apps = document.querySelector(".content");
//add event listeners
const searchBar = document.getElementById("searchBar");

//function start
const setQuery = (e) => {
  if (e.keyCode == "13") {
    getResult(searchBar.value.trim());
    apps.style.display = "block";
  }
  if (searchBar.value === "" || searchBar.value === null) {
    showAlert("success", "Lütfen bir şehir ismi giriniz");
  }
};

searchBar.addEventListener("keypress", setQuery);

//get api
const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

//addUİ

const displayResult = (result) => {
  console.log(result);
  let city = document.querySelector(".city");
  city.innerText = `${result.name}, ${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerText = parseInt(`${result.main.temp}`);
  let minmax = document.querySelector(".minmax");
  if (`${result.main.temp_max} === ${result.main.min}`) {
    minmax.innerText = parseInt(`${result.main.temp_max}`);
  } else {
    minmax.innerText = `Maksimum Sıcaklık${result.main.temp_max},-Minimum Sıcaklık ${result.main.temp_min} *C   `;
  }

  let desc = document.querySelector(".desc");
  desc.innerText = `${result.weather[0].description}`;
};

//alert
const showAlert = (type, text) => {
  const alert = document.createElement("div");
  alert.classList = `alert alert-${type}`;
  alert.innerText = `${text}`;
  header.appendChild(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 3000);
};

