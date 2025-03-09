const projectsContainer = document.querySelector(".projects-container");

const projects = [
	{
		name: "Credit Card Validator",
		link: "https://github.com/vintiw6/Projects/tree/main/CreditCard-Validator",
		image: "credit.jpg",
	},
	{
		name: "Slot Machine",
		link: "https://github.com/vintiw6/Projects/tree/main/SlotMachine",
		image: "slots.jpg",
	},
	{
		name: "Data Analysis Basics",
		link: "https://github.com/vintiw6/Projects/tree/main/DataAnalysis-Basic",
		image: "stats.jpg",
	},
	{
		name: "Smart Finance Tracker",
		link: "https://github.com/vintiw6/Projects/tree/main/SmartFinanceTracker",
		image: "finance.jpg",
	},
];

// Clear existing tiles before adding new ones
projectsContainer.innerHTML = "";

projects.forEach((project) => {
	const tile = document.createElement("div");
	tile.classList.add("project-tile");
	tile.innerHTML = `
        <img src="${project.image}" alt="${project.name}">
        <h2>${project.name}</h2>
        <a href="${project.link}" target="_blank">View Project</a>
    `;
	projectsContainer.appendChild(tile);
});
