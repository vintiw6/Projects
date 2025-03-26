const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const body = document.body;
const cityInput = document.querySelector(".search-box input");

search.addEventListener("click", () => {
	const APIKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
	const city = cityInput.value.trim();

	if (city === "") return;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((data) => {
			console.log("API Response:", data); // Debugging

			// If the city is not found
			if (data.cod === "404") {
				console.warn("City not found!"); // Debugging
				container.style.height = "400px";
				weatherBox.style.display = "none";
				weatherDetails.style.display = "none";
				error404.style.display = "block";
				error404.classList.add("fadeIn");
				body.className = ""; // Reset background
				return;
			}

			// Reset error display if city is valid
			error404.style.display = "none";
			error404.classList.remove("fadeIn");

			const image = document.querySelector(".weather-box img");
			const temperature = document.querySelector(".weather-box .temperature");
			const description = document.querySelector(".weather-box .description");
			const humidity = document.querySelector(
				".weather-details .humidity span"
			);
			const wind = document.querySelector(".weather-details .wind span");

			// Get the weather condition code (e.g., "01d", "04d")
			const weatherIconCode = data.weather[0].icon;
			console.log("Weather Icon Code:", weatherIconCode); // Debugging

			// OpenWeatherMap icons mapping
			const weatherIcons = {
				"01d": "Images/clear.png",
				"02d": "Images/cloud.png",
				"03d": "Images/cloud.png",
				"04d": "Images/cloud.png",
				"09d": "Images/rain.png",
				"10d": "Images/rain.png",
				"11d": "Images/storm.png",
				"13d": "Images/snow.png",
				"50d": "Images/mist.png",
			};

			image.src = weatherIcons[weatherIconCode] || "Images/default.png";

			// Map background classes
			const backgroundClasses = {
				"01d": "sunny",
				"02d": "cloudy",
				"03d": "cloudy",
				"04d": "cloudy",
				"09d": "rainy",
				"10d": "rainy",
				"11d": "stormy",
				"13d": "snowy",
				"50d": "hazy",
			};

			// Update background class
			body.className = backgroundClasses[weatherIconCode] || "";

			// Update weather details
			temperature.innerHTML = `${Math.round(data.main.temp)}<span>°C</span>`;
			description.innerHTML = data.weather[0].description;
			humidity.innerHTML = `${data.main.humidity}%`;
			wind.innerHTML = `${Math.round(data.wind.speed)} Km/h`;

			// Make sure weather details are visible
			weatherBox.style.display = "block";
			weatherDetails.style.display = "flex";

			// Reset animation and reapply it
			weatherBox.classList.remove("fadeIn");
			weatherDetails.classList.remove("fadeIn");

			// Force reflow (fixes animation issues)
			void weatherBox.offsetWidth;

			weatherBox.classList.add("fadeIn");
			weatherDetails.classList.add("fadeIn");

			// Adjust container height
			container.style.height = "590px";
		})
		.catch((error) => {
			console.error("Error fetching weather data:", error);
			alert(
				"Failed to retrieve weather data. Please check your API key and try again."
			);
		});
});
