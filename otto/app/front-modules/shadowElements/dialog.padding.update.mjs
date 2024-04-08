/*
 * TODO: Populate input list with crates sizes;
 * TODO: Updates indexDB and DB server with new crates sizes;
 * TODO: input fields to new LENGTH, DEPTH, and HEIGHT paddings to selected crates;
 * TODO: Confirmation and abort buttons;
*/


import { htmlDialog } from "./html.content.mjs";
const shadowRoots = new WeakMap();

/**
 * @class Build the <dialog> element to popup when the user needs to customize the crate padding;
*/
export class DialogPadding extends HTMLElement {
	constructor () {
		super();
		const shadow =		this.attachShadow({ mode: "open" });

		this.close =		this.close.bind(this);
		this.apply =		this.apply.bind(this);
		this._watchEscape =	this._watchEscape.bind(this);
		shadowRoots.set(this, shadow);
	};

	/**
	 * @method Populates the dialog popup when clicked.;
	*/
	connectedCallback() {
		const shadowRoot =	shadowRoots.get(this);
		const link =	document.createElement('link');

		link.rel =	'stylesheet';
		link.type =	'text/css';
		link.href = './stylesheet.css';
		shadowRoot.innerHTML = htmlDialog;
		shadowRoot.appendChild(link);

		shadowRoot.getElementById('padding-close')
			.addEventListener('click', this.close);
		shadowRoot.getElementById('padding-apply')
			.addEventListener('click', this.apply);
		shadowRoot.getElementById('modal').setAttribute('open', '');
	};

	/**
	 * @method Removes the dialog popup when clicked.;
	*/
	disconnectedCallback() {
		this.shadowRoot.getElementById('padding-apply')
			.removeEventListener('click', this.close, true);
		this.shadowRoot.getElementById('padding-close')
			.removeEventListener('click', this.close, true);
	};

	/**
	 * @method Called when the dialog popup moves to the another document.
	*/
	adoptedCallback() {
	};

	/**
	 * @method Update when the dialog popup.
	*/
	attributeChangeCallback(attrName, oldVal, newVal) {
		console.log(`Setup values ${attrName}, ${oldVal}, and ${newVal}`);
	};

	_watchEscape(event) {
		event.key === 'Escape' ? this.close() : 0;
	};

	apply() {
		console.log('pressed');
	}

	close() {
		this.shadowRoot.getElementById('modal').removeAttribute('open');
		document.querySelector(".side-menu")
			.lastElementChild.remove();
	};
};

globalThis.customElements.define('padding-dialog', DialogPadding);
