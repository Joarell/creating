

const accordion = globalThis.document.querySelector(".accordion");

accordion.addEventListener("click", event => {
	const activePanel = event.target.closest(".accordion-panel");

	if (!activePanel)
		return;
	toggleAccordion(activePanel);
});


function toggleAccordion(clicked) {
	const buttons = clicked.parentElement.querySelectorAll("button");
	const panel = clicked.parentElement.querySelectorAll(".menu__input");

	buttons.forEach(button => {
		button.setAttribute("aria-expanded", false);
	});
	panel.forEach(aria => {
		aria.setAttribute("aria-hidden", true);
	});
	openPanel(clicked);
};


function openPanel(panel) {
	panel.querySelector("button").setAttribute("aria-expanded", true);
	panel.querySelector(".menu__input").setAttribute("aria-hidden", false);
};
