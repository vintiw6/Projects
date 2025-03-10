document.addEventListener("DOMContentLoaded", function () {
	const section = document.querySelector("#Home");
	const element = document.querySelector("#element");
	let typedInstance;

	function startTypedJs() {
		stopTypedJs(); // 🧹 Fully clear before restarting

		typedInstance = new Typed("#element", {
			strings: ["Data Analyst", "Web Developer", "Graphic Designer"],
			typeSpeed: 80,
			backSpeed: 50,
			backDelay: 1500,
			loop: false, // ❌ No built-in loop (we manually restart)
			showCursor: true, // ✅ Cursor is enabled
			cursorChar: "|", // ✅ Ensures a single cursor
			smartBackspace: false,
			fadeOut: false,
			onComplete: () => {
				setTimeout(restartTypedJs, 1000); // 🔄 Restart manually
			},
		});
	}

	function restartTypedJs() {
		stopTypedJs(); // 🧹 Fully clear previous instance
		setTimeout(startTypedJs, 200); // ⏳ Delay prevents flicker
	}

	function stopTypedJs() {
		if (typedInstance) {
			typedInstance.destroy();
			typedInstance = null;
		}
		element.innerHTML = '<span class="typed-cursor">|</span>'; // ✅ Keeps one cursor
	}

	// 🔹 Observer for visibility-based animation
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					startTypedJs();
				} else {
					stopTypedJs();
				}
			});
		},
		{ threshold: 0.5 }
	);

	if (section) observer.observe(section);
});
