document.addEventListener("DOMContentLoaded", function () {
	const particleContainer = document.getElementById("particles-js");

	function createParticle() {
		const particle = document.createElement("div");
		particle.classList.add("particle");

		// Random position and size
		const size = Math.random() * 40 + 40; // Reduce size slightly (40px to 80px)
		const xPos = Math.random() * window.innerWidth;
		const yPos = Math.random() * window.innerHeight;
		const duration = Math.random() * 8 + 5; // Keep duration reasonable

		particle.style.width = `${size}px`;
		particle.style.height = `${size}px`;
		particle.style.left = `${xPos}px`;
		particle.style.top = `${yPos}px`;
		particle.style.animationDuration = `${duration}s`;

		particleContainer.appendChild(particle);

		// Particle hover effect
		particle.addEventListener("mousemove", (e) => {
			const dx = (Math.random() - 0.5) * 120; // Reduce movement distance
			const dy = (Math.random() - 0.5) * 120;
			particle.style.transform = `translate(${dx}px, ${dy}px)`;
			particle.style.transition = "transform 0.6s ease-out";
		});

		// Remove particle after animation ends
		setTimeout(() => {
			particle.style.transition = "opacity 2s ease-in-out";
			particle.style.opacity = "0";
			setTimeout(() => particle.remove(), 2000);
		}, duration * 1000 - 2000);
	}

	// Generate particles efficiently
	function generateParticles(count) {
		let i = 0;
		function nextParticle() {
			if (i < count) {
				createParticle();
				i++;
				requestAnimationFrame(nextParticle);
			}
		}
		requestAnimationFrame(nextParticle);
	}

	generateParticles(8); // Reduce initial particles
	setInterval(() => generateParticles(2), 5000); // Reduce new particles over time
});

let ticking = false;

window.addEventListener("scroll", function () {
	if (!ticking) {
		requestAnimationFrame(() => {
			// Your scroll-dependent code here
			ticking = false;
		});
		ticking = true;
	}
});
