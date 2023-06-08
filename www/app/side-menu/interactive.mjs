


globalThis.document.querySelector(".accordion")
	.addEventListener("click", event => {
	const activePanel = event.target.closest(".accordion-panel");

	if (!activePanel)
		return;
	toggleAccordion(activePanel);
});


function toggleAccordion(clicked) {
	const buttons =	clicked.parentElement.querySelectorAll("button");
	const panel =	clicked.parentElement.querySelectorAll(".menu__input");

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


globalThis.document.querySelector(".IO__press-mobile")
	.addEventListener("click", (element) => {
	const { id } =		element.target;
	const menuOpts =	document.querySelector(".fan-options");
	const menu =		document.querySelector(".get-estimate");

	if (id === "menu-options" && menuOpts.ariaHidden) {
		menuOpts.setAttribute("aria-expanded", true);
		menuOpts.setAttribute("aria-hidden", false);
	}
	else if(id === "fetch-mob") {
		menu.setAttribute("aria-hidden", false);
		menu.setAttribute("aria-expanded", true);
		setTimeout(() => {
			document.getElementById("search").click();
		}, 1000);
		setTimeout(() => {
			globalThis.scroll({top: 10000, behavior: "smooth"});
		}, 2000);
		menu.setAttribute("aria-hidden", false);
		menuOpts.setAttribute("aria-expanded", false);
		menuOpts.setAttribute("aria-hidden", true);
	}
	else {
		menuOpts.setAttribute("aria-expanded", false);
		menuOpts.setAttribute("aria-hidden", true);
	}
	console.log(element.target.id);
}, true);
