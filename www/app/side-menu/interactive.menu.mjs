// ╭──────────────────────────────────────────────────────────╮
// │                     Accordion setup.                     │
// ╰──────────────────────────────────────────────────────────╯
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


// ╭──────────────────────────────────────────────────────────╮
// │                 Mobile side menu setup.                  │
// ╰──────────────────────────────────────────────────────────╯
function mobileMenu (selected, id) {
	if(selected.ariaHidden) {
		selected.setAttribute("aria-expanded", true);
		selected.setAttribute("aria-hidden", false);
	};
	setTimeout(() => globalThis.scroll({top: 10000, behavior: "smooth"}), 200);
	setTimeout(() => document.getElementById(id).click(), 100);
};


function closeFan(menu) {
	menu.setAttribute("aria-expanded", false);
	menu.setAttribute("aria-hidden", true);
}


function optionToggle(id, option) {
	let menu;

	switch (id) {
		case "fetch-mob":
			menu =	document.querySelector(".get-estimate");
			mobileMenu(menu, 'search');
			closeFan(option);
			break;
		case "currency-mob":
			menu =	document.querySelector(".exchange--content");
			mobileMenu(menu, 'exchange');
			closeFan(option);
			setTimeout(() => {
				document.getElementById('exchange-header').click()
			}, 250);
			break;
		case "units-mob":
			menu =	document.querySelector(".units-conversion");
			mobileMenu(menu, 'measures');
			closeFan(option);
			break;
		default:
			break;
	}
};


globalThis.document.querySelector(".IO__press-mobile")
	.addEventListener("click", (element) => {
	const { id } =		element.target;
	const menuOpts =	document.querySelector(".fan-options");

	if (id === "menu-options" && menuOpts.ariaHidden) {
		menuOpts.setAttribute("aria-expanded", true);
		menuOpts.setAttribute("aria-hidden", false);
	}
	else {
		menuOpts.setAttribute("aria-expanded", false);
		menuOpts.setAttribute("aria-hidden", true);
	}
	optionToggle(id, menuOpts);
}, true);
