const input = document.querySelector("#text");
const search = document.querySelector(".search");
const displayW = document.querySelector(".weather");
const error = document.querySelector(".error");

let temp = document.querySelector("#temp");
let city = document.querySelector("#city-name");
let image = document.querySelector("#weather");
let hum = document.querySelector("#humidity");
let speed = document.querySelector("#speedD");

const apikey = "c3185d64e932b3d188e68bcab001b6b0";
const WeatherApi = `https://api.openweathermap.org/data/2.5/weather?&appid=${apikey}&units=metric`;

async function CheakWeather() {
    let searchCity = input.value;
    const response = await fetch(WeatherApi + `&q=${searchCity}`);

    if (response.status == 404) {
        console.log("Error: Location not found!");
        
       
        displayW.style.display = "none";
        displayW.classList.remove("show");
 
        error.style.display = "block";
        setTimeout(() => {
            error.classList.add("show");
        }, 10);
    } else {
        error.classList.remove("show");
        setTimeout(() => {
            error.style.display = "none";
        }, 400); 
        const data = await response.json();
        console.log(data);

        
        error.style.display = "none";

        if (displayW.classList.contains("show")) {
            displayW.classList.add("animate-out");
            setTimeout(() => {
                updateWeatherData(data);
            }, 400);
        } else {
            updateWeatherData(data);
        }
    }
}


function updateWeatherData(data) {
  
    if (data.weather[0].main == "Clouds") {
        image.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        image.src = "./images/clear.png";
    } else if (data.weather[0].main == "Drizzle") {
        image.src = "./images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        image.src = "./images/mist.png";
    } else if (data.weather[0].main == "Rain") {
        image.src = "./images/rain.png";
    } else if (data.weather[0].main == "Snow") {
        image.src = "./images/snow.png";
    }

    temp.innerHTML = `${Math.round(data.main.temp)}<span> °C</span>`;
    city.innerText = data.name;
    hum.innerText = `${data.main.humidity} %`;
    speed.innerText = `${Math.round(data.wind.speed)} km/h`;

  
    displayW.classList.remove("animate-out");
    displayW.style.display = "block";
    setTimeout(() => {
        displayW.classList.add("show");
    }, 10);
}

search.addEventListener("click", CheakWeather);
