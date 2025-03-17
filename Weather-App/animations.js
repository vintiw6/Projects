document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const background = document.querySelector(".background");
	const search = document.querySelector(".search-box button");

	function clearEffects() {
		background.innerHTML = "";
	}

	function generateClouds() {
		clearEffects();
		let cloudCount = Math.floor(Math.random() * 5) + 3;

		for (let i = 0; i < cloudCount; i++) {
			let cloud = document.createElement("div");
			cloud.classList.add("cloud");

			let randomSize = Math.random() * 120 + 50;
			let randomSpeed = Math.random() * 40 + 20;
			let randomTop = Math.random() * 60 + 5;

			cloud.style.width = `${randomSize}px`;
			cloud.style.height = `${randomSize / 2}px`;
			cloud.style.animationDuration = `${randomSpeed}s`;
			cloud.style.top = `${randomTop}%`;

			background.appendChild(cloud);
		}
	}

	function generateRain() {
		clearEffects();
		let rainCount = Math.floor(Math.random() * 30) + 50;

		for (let i = 0; i < rainCount; i++) {
			let drop = document.createElement("div");
			drop.classList.add("rain");

			let randomX = Math.random() * window.innerWidth;
			let randomDuration = Math.random() * 3 + 2;
			let randomDelay = Math.random() * 2;

			drop.style.left = `${randomX}px`;
			drop.style.animationDuration = `${randomDuration}s`;
			drop.style.animationDelay = `-${randomDelay}s`;

			background.appendChild(drop);
		}
	}

	function generateSnow() {
		clearEffects();
		let snowCount = Math.floor(Math.random() * 30) + 50;

		for (let i = 0; i < snowCount; i++) {
			let snow = document.createElement("div");
			snow.classList.add("snow");

			let randomX = Math.random() * window.innerWidth;
			let randomSize = Math.random() * 5 + 2;
			let randomDuration = Math.random() * 5 + 3;
			let randomDelay = Math.random() * 2;

			snow.style.left = `${randomX}px`;
			snow.style.width = `${randomSize}px`;
			snow.style.height = `${randomSize}px`;
			snow.style.animationDuration = `${randomDuration}s`;
			snow.style.animationDelay = `-${randomDelay}s`;

			background.appendChild(snow);
		}
	}

	function generateThunderstorm() {
		clearEffects();
		generateRain();

		let thunder = document.createElement("div");
		thunder.classList.add("thunder");
		background.appendChild(thunder);

		setInterval(() => {
			thunder.style.opacity = Math.random() > 0.5 ? 1 : 0;
		}, Math.random() * 2000 + 1000);
	}

	function generateFog() {
		clearEffects();
		let fog = document.createElement("div");
		fog.classList.add("fog");
		background.appendChild(fog);
	}

	function generateWind() {
		clearEffects();
		let wind = document.createElement("div");
		wind.classList.add("wind");
		background.appendChild(wind);
	}

	function updateWeather(weatherDescription) {
		body.classList.remove(
			"sunny",
			"rainy",
			"cloudy",
			"snowy",
			"hazy",
			"stormy",
			"windy"
		);

		if (weatherDescription.includes("clear")) {
			body.classList.add("sunny");
			generateClouds();
		} else if (
			weatherDescription.includes("rain") ||
			weatherDescription.includes("drizzle")
		) {
			body.classList.add("rainy");
			generateRain();
		} else if (weatherDescription.includes("snow")) {
			body.classList.add("snowy");
			generateSnow();
		} else if (
			weatherDescription.includes("cloud") ||
			weatherDescription.includes("overcast")
		) {
			body.classList.add("cloudy");
			generateClouds();
		} else if (
			weatherDescription.includes("haze") ||
			weatherDescription.includes("mist") ||
			weatherDescription.includes("fog")
		) {
			body.classList.add("hazy");
			generateFog();
		} else if (
			weatherDescription.includes("thunderstorm") ||
			weatherDescription.includes("storm")
		) {
			body.classList.add("stormy");
			generateThunderstorm();
		} else if (
			weatherDescription.includes("wind") ||
			weatherDescription.includes("gale")
		) {
			body.classList.add("windy");
			generateWind();
		} else {
			body.classList.add("cloudy");
			generateClouds();
		}
	}

	updateWeather("clear sky");

	search.addEventListener("click", () => {
		const APIKey = "API_KEY";
		const city = document.querySelector(".search-box input").value.trim();

		if (city === "") return;

		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
		)
			.then((response) => {
				if (!response.ok) throw new Error("City not found");
				return response.json();
			})
			.then((data) => {
				console.log("Weather Data:", data);

				if (data.cod === "404") {
					console.error("City not found");
					return;
				}

				const weatherDescription = data.weather[0].description.toLowerCase();
				updateWeather(weatherDescription);
			})
			.catch((error) => {
				console.error("Error fetching weather:", error);
			});
	});
});
