document.addEventListener("DOMContentLoaded", function () {
	const projectsContainer = document.querySelector(".projects-container");

	const projects = [
		{
			name: "Credit Card Validator",
			link: "https://github.com/vintiw6/Projects/tree/main/CreditCard-Validator",
			image: "Project-Images/credit.jpg",
		},
		{
			name: "Slot Machine",
			link: "https://github.com/vintiw6/Projects/tree/main/SlotMachine",
			image: "Project-Images/slots.jpg",
		},
		{
			name: "Data Analysis Basics",
			link: "https://github.com/vintiw6/Projects/tree/main/DataAnalysis-Basic",
			image: "Project-Images/stats.jpg",
		},
		{
			name: "Smart Finance Tracker",
			link: "https://github.com/vintiw6/Projects/tree/main/SmartFinanceTracker",
			image: "Project-Images/finance.jpg",
		},
	];

	// Clear existing tiles before adding new ones
	projectsContainer.innerHTML = "";

	projects.forEach((project, index) => {
		const tile = document.createElement("div");
		tile.classList.add("project-tile", "fade-in");
		tile.innerHTML = `
			<img src="${project.image}" alt="${project.name}" loading="lazy">
			<h2>${project.name}</h2>
			<a href="${project.link}" target="_blank">View Project</a>
		`;
		projectsContainer.appendChild(tile);

		// Staggered fade-in effect with increasing delay
		setTimeout(() => {
			tile.classList.add("active");
		}, index * 400); // Delay increases for each item
	});

	// Fade-in effect for text elements (like introduction)
	const fadeElements = document.querySelectorAll(".fade-text, p");

	fadeElements.forEach((el, index) => {
		setTimeout(() => {
			el.classList.add("active");
		}, index * 400); // Delay increases for each element
	});

	// Lazy Loading for Images with Smooth Transition
	const lazyImages = document.querySelectorAll("img[loading='lazy']");

	const observer = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const img = entry.target;
					img.style.opacity = "0"; // Start hidden
					img.src = img.dataset.src; // Load actual image
					img.onload = () => {
						img.style.transition = "opacity 1s ease-in-out";
						img.style.opacity = "1"; // Smooth fade-in effect
					};
					observer.unobserve(img);
				}
			});
		},
		{ threshold: 0.2 }
	);

	lazyImages.forEach((img) => {
		img.dataset.src = img.src;
		img.src = "";
		observer.observe(img);
	});

	// Smooth Scrolling for Navigation Links
	const navLinks = document.querySelectorAll("nav ul li a");

	navLinks.forEach((link) => {
		link.addEventListener("click", function (event) {
			event.preventDefault();
			const targetId = this.getAttribute("href").substring(1);
			const targetSection = document.getElementById(targetId);

			if (targetSection) {
				window.scrollTo({
					top: targetSection.offsetTop - 50, // Adjust offset if needed
					behavior: "smooth",
				});
			}
		});
	});
});
