document.addEventListener("DOMContentLoaded", () => {
	const body = document.body;
	const background = document.querySelector(".background");
	const search = document.querySelector(".search-box button");

	function clearEffects() {
		background.innerHTML = "";
	}

	function generateClouds(cloudDensity = 3) {
		clearEffects();
		let cloudCount = Math.floor(Math.random() * cloudDensity) + cloudDensity;

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

	function generateRain(intensity = 50) {
		clearEffects();
		let rainCount = Math.floor(Math.random() * intensity) + intensity;

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

	function generateThunderstorm() {
		generateRain(70);

		let thunder = document.createElement("div");
		thunder.classList.add("thunder");
		background.appendChild(thunder);

		setInterval(() => {
			thunder.style.opacity = Math.random() > 0.5 ? 1 : 0;
		}, Math.random() * 2000 + 1000);
	}

	function generateSnow() {
		clearEffects();
		let snowCount = Math.floor(Math.random() * 50) + 50;

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

	function generateMist() {
		clearEffects();
		let mist = document.createElement("div");
		mist.classList.add("mist");
		background.appendChild(mist);
	}

	function updateWeather(weatherCode) {
		body.classList.remove(
			"sunny",
			"few-clouds",
			"scattered-clouds",
			"broken-clouds",
			"shower-rain",
			"rain",
			"thunderstorm",
			"snow",
			"mist"
		);

		switch (weatherCode) {
			case "01d":
				body.classList.add("sunny");
				generateClouds(2);
				break;
			case "02d":
				body.classList.add("few-clouds");
				generateClouds(3);
				break;
			case "03d":
				body.classList.add("scattered-clouds");
				generateClouds(5);
				break;
			case "04d":
				body.classList.add("broken-clouds");
				generateClouds(7);
				break;
			case "09d":
				body.classList.add("shower-rain");
				generateRain(40);
				break;
			case "10d":
				body.classList.add("rain");
				generateRain(70);
				break;
			case "11d":
				body.classList.add("thunderstorm");
				generateThunderstorm();
				break;
			case "13d":
				body.classList.add("snow");
				generateSnow();
				break;
			case "50d":
				body.classList.add("mist");
				generateMist();
				break;
			default:
				body.classList.add("few-clouds");
				generateClouds(3);
				break;
		}
	}

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

				const weatherCode = data.weather[0].icon;
				updateWeather(weatherCode);
			})
			.catch((error) => {
				console.error("Error fetching weather:", error);
			});
	});
});
