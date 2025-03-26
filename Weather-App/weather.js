const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const body = document.body;

search.addEventListener("click", () => {
	const APIKey = "YOUR_API_KEY"; // Replace with your actual API key
	const city = document.querySelector(".search-box input").value.trim();

	if (city === "") return;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);

			// Handle invalid city
			if (data.cod === "404") {
				container.style.height = "400px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
				body.className = ""; // Reset background
				return;
			}

			error404.style.display = "none";
			error404.classList.remove("fadeIn");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box .temperature");
			const description = document.querySelector(".weather-box .description");
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			const weatherCondition = data.weather[0].main.toLowerCase();

			// 🌤️ Set weather icon and background class
			const weatherIcons = {
				clear: "images/clear.png",
				rain: "images/rain.png",
				snow: "images/snow.png",
				clouds: "images/cloud.png",
				haze: "images/mist.png",
				mist: "images/mist.png",
				thunderstorm: "images/storm.png",
				drizzle: "images/drizzle.png",
				wind: "images/wind.png",
			};

			// Set image based on weather condition
			image.src = weatherIcons[weatherCondition] || "images/default.png";

			// Apply corresponding background class
			const backgroundClasses = {
				clear: "sunny",
				clouds: "cloudy",
				rain: "rainy",
				snow: "snowy",
				haze: "hazy",
				mist: "hazy",
				thunderstorm: "stormy",
				drizzle: "rainy",
				wind: "windy",
			};

			// Remove previous class and add new one
			body.className = backgroundClasses[weatherCondition] || "";

			// Update weather details
			temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
			description.innerHTML = data.weather[0].description;
			humidity.innerHTML = `${data.main.humidity}%`;
			wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`;

			// Display weather information
			weatherBox.style.display = "block";
			weatherDetails.style.display = "flex";
			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");
			container.style.height = "590px";
		})
		.catch((error) => {
			console.error("Error fetching weather data:", error);
			alert("Failed to retrieve weather data. Please try again.");
		});
});
