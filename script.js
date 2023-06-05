// const apikey = "46f80a02ecae410460d59960ded6e1c6";
const apikey = "45a9515ba214a0add5b9dcf0b0380e5b";


const weatherData = document.getElementById("weather-data");

const cityInput = document.getElementById("city-input");

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInput.value;

    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);

        const temperature = Math.round(data.main.temp);
        // console.log(temperature);

        const description = data.weather[0].description;
        // console.log(description);

        const icon = data.weather[0].icon;
        // console.log(icon);

        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]
        // console.log(details);
        weatherData.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        console.log(weatherData.querySelector(".icon").innerHTML);

        weatherData.querySelector(".temperature").textContent = `${temperature}°C`;
        console.log(weatherData.querySelector(".temperature").textContent);

        weatherData.querySelector(".description").textContent = description;

        weatherData.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {

        weatherData.querySelector(".icon").innerHTML="";
        weatherData.querySelector(".temperature").textContent ="";
        weatherData.querySelector(".description").textContent ="An error occured, Please try again";
        weatherData.querySelector(".details").innerHTML="";


    }
}


