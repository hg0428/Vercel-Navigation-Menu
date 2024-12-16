let Tabs: NodeListOf<HTMLElement>;
let tabsList: HTMLElement;
let background: HTMLElement;
let dropdownContainer: HTMLElement;
let masterContainer: HTMLElement;
let shiftingDropdown: HTMLElement;
let contentWrapper: HTMLElement;

window.addEventListener("load", (event: Event) => {
	Tabs = document.querySelectorAll(".tab");
	background = document.querySelector(".tabs-list .background") as HTMLElement;
	tabsList = document.querySelector(".tabs-list") as HTMLElement;
	dropdownContainer = document.querySelector(
		".content-container"
	) as HTMLElement;
	masterContainer = document.querySelector(
		".shifting-dropdown-container"
	) as HTMLElement;
	shiftingDropdown = document.querySelector(
		".shifting-dropdown"
	) as HTMLElement;

	// Create content wrapper if it doesn't exist
	const sections = document.querySelectorAll(".content-section");
	contentWrapper = document.querySelector(".content-wrapper") as HTMLElement;

	Tabs.forEach((tab) => {
		tab.addEventListener("mouseenter", () => {
			let currentSelected = document.querySelector(".tab.selected");
			const tabRect = tab.getBoundingClientRect();
			const listRect = tabsList.getBoundingClientRect();
			const left = tabRect.left - listRect.left;

			if (currentSelected) {
				currentSelected.classList.remove("selected", "hover");
				background.classList.add("sliding");
			} else {
				background.classList.remove("sliding");
			}

			tabsList.style.setProperty("--tab-left", `${left}px`);
			tabsList.style.setProperty("--tab-width", `${tabRect.width}px`);
			tab.classList.add("selected", "hover");

			// Handle content sections
			const visibleSection = document.querySelector(".content-section.visible");

			// Reset all chevrons
			const allChevrons = document.querySelectorAll(".chevron-down");
			allChevrons.forEach((chevron) => chevron.classList.remove("rotate"));

			if (tab.dataset.dropdown) {
				const dropdown = document.getElementById(
					`shift-content-${tab.dataset.dropdown}`
				);
				if (dropdown) {
					const tabRect = tab.getBoundingClientRect();
					const listRect = tabsList.getBoundingClientRect();
					const containerRect =
						dropdownContainer.parentElement?.getBoundingClientRect();

					if (containerRect) {
						const left = tabRect.left - listRect.left;
						const arrowLeft =
							tabRect.left + tabRect.width / 2 - containerRect.left;

						tabsList.style.setProperty("--tab-width", `${tabRect.width}px`);
						tabsList.style.setProperty("--tab-left", `${left}px`);
						dropdownContainer.style.setProperty(
							"--arrow-left",
							`${arrowLeft}px`
						);
					}

					// Set the width of the container to match the incoming section
					const dropdownWidth = dropdown.offsetWidth;
					const containerPadding =
						parseInt(getComputedStyle(dropdownContainer).paddingLeft) +
						parseInt(getComputedStyle(dropdownContainer).paddingRight);
					dropdownContainer.style.setProperty(
						"--content-width",
						`${dropdownWidth + containerPadding}px`
					);

					// Calculate the position for sliding based on offsetLeft
					const index = Array.from(sections).indexOf(dropdown);
					contentWrapper.style.transform = `translateX(-${dropdown.offsetLeft}px)`;

					dropdownContainer.classList.add("visible");
					dropdown.classList.add("visible");

					// Delay removing the visible class from the previous section
					if (visibleSection && visibleSection !== dropdown) {
						setTimeout(() => {
							visibleSection.classList.remove("visible");
						}, 200); // Match the transition duration
					}

					const chevron = tab.querySelector(".chevron-down");
					if (chevron) {
						chevron.classList.add("rotate");
					}
				}
			} else {
				dropdownContainer.classList.remove("visible");
				if (visibleSection) {
					visibleSection.classList.remove("visible");
				}
			}
		});
		tab.addEventListener("mouseleave", () => {
			tab.classList.remove("hover");
		});
		if (tab.getAttribute("href")) {
			tab.addEventListener("click", () => {
				window.location.href = tab.getAttribute("href")!;
			});
		}
	});
	shiftingDropdown.addEventListener("mouseleave", () => {
		Tabs.forEach((tab) => {
			tab.classList.remove("hover", "selected");
		});
		dropdownContainer.classList.remove("visible");
		// Reset all chevrons when dropdown closes
		const allChevrons = document.querySelectorAll(".chevron-down");
		allChevrons.forEach((chevron) => chevron.classList.remove("rotate"));
	});
});
