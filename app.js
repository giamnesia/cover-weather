btn = document.querySelector(".btn");
search = document.querySelector(".search");
container = document.querySelector(".container");
form = document.querySelector(".form");
hero = document.querySelector(".hero");

form.addEventListener("submit", result);

function result(e) {
  const inputval = search.value;
  e.preventDefault();

  fetch(
    "https://community-open-weather-map.p.rapidapi.com/find?q=" +
      inputval +
      "&cnt=1&mode=null&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ab12fc277emshff845f4cfb3c737p17440djsn9bac897570e9",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
    });
}
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function display(data) {
  hero.style.display = "none";
  search.value = "";
  const temp = `${data.list[0].main.temp}`;
  const cont = temp - 273.15;

  container.innerHTML = ` <div class="card">
  <div class="location">
    <h1 class="name">${data.list[0].name}, ${
    data.list[0].sys.country
  } <i class="fas fa-map-marker-alt"></i></h1>
    <h5 class="coord">Lat: ${data.list[0].coord.lat} -- Lon: ${
    data.list[0].coord.lon
  }</h5>
  <h3 class="desc">${capitalizeFirstLetter(
    data.list[0].weather[0].description
  )} <i class="fas fa-cloud-sun"></i></h3>
  </div>
  <div class="weather">
   
    <div class="temperature">
    <p>Temperature</p/>
    <span class="celsius" >${parseInt(cont)} &deg C</span>
    </div>
    <div class="wind">
    <p>Wind </p/>
    <span class="speed">${parseInt(data.list[0].wind.speed * 3.6)} km/h</span>
    </div>
    <div class="humid">
    <p >Humidity </p/>
    <span class="humidity">${data.list[0].main.humidity} %</span>
    </div>
  </div>
</div>`;
}
