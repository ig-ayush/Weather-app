const input = document.querySelector('input');
const icon = document.querySelector('i');
const iconCon = document.querySelector('change-icons');

const search = document.querySelector('.search');
let temp = document.querySelector('#temp');
let city = document.querySelector('#city-name');
let image = document.querySelector('#weather');
let displayW = document.querySelector('.weather');
let hum = document.querySelector('#humidity');
let speed = document.querySelector('#speedD');
const error = document.querySelector('.error');
// Search 

input.addEventListener('input',()=>{
    
    if(input.value !== ""){

        icon.innerHTML = '<i class="fa-solid fa-xmark" ></i>';
        icon.style.fontSize = "1.1rem"
    }else{

        icon.innerHTML = '<i class="fa-solid fa-location-dot"></i>'
    }
});

if(input.value == ""){
    icon.innerHTML = '<i class="fa-solid fa-location-dot" ></i>';
};

icon.addEventListener('click',()=>{
    input.value = "";
    icon.innerHTML = '<i class="fa-solid fa-location-dot"></i>'
})

// Weather 
const apikey = "c3185d64e932b3d188e68bcab001b6b0";
const WeatherApi = `https://api.openweathermap.org/data/2.5/weather?&appid=${apikey}&units=metric`;


async function CheakWeather() {

    let searchCity = input.value;

    const response = await fetch(WeatherApi + `&q=${searchCity}`);

    if(response.status == 404){
        console.log('error');
        error.style.display = "block";
        displayW.classList.remove('show');
    }
    else{
        error.style.display = "none";
        displayW.classList.add('show');
        const data = await response.json();
        console.log(data);
    
    if(data.weather[0].main == 'Clouds'){
        image.src = './images/clouds.png';
    }
    else if(data.weather[0].main == 'Clear'){
        image.src = './images/clear.png';
    }
    else if(data.weather[0].main == 'Drizzle'){
        image.src = './images/drizzle.png';
    }
    else if(data.weather[0].main == 'Mist'){
        image.src = './images/mist.png';
    }
    else if(data.weather[0].main == 'Rain'){
        image.src = './images/rain.png';
    }
    else if(data.weather[0].main == 'Snow'){
        image.src = './images/snow.png';
    }
    let temparature = Math.round(data.main.temp);
    let name = data.name;
    let humidity = data.main.humidity;
    let sp = Math.round(data.wind.speed);

    temp.innerHTML = `${temparature}<span> °C</span>`
    city.innerText = name;

    hum.innerText = `${humidity} %`;
    speed.innerText =`${sp} km/h`;
}
}

search.addEventListener('click',CheakWeather);
