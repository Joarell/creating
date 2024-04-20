/*
 * TODO: Updates indexDB and DB server with new crates sizes;
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

		globalThis.sessionStorage.setItem('PopulateCrates', "call");
		shadowRoot.getElementById('padding-close')
			.addEventListener('click', this.close);
		shadowRoot.getElementById('padding-apply')
			.addEventListener('click', this.apply);
		shadowRoot.getElementById('modal').setAttribute('open', '');

		globalThis.onstorage = () => {
			const closeDialog = sessionStorage.getItem('CLOSED');

			if (closeDialog === 'NOW') {
				shadowRoot.getElementById('padding-close').click();
				sessionStorage.removeItem('CLOSED');
			};
		};
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

	/**
	 * @function call worker to updates the solved list applying the new sizes
	*/
	apply() {
		const X =	this.shadowRoot.getElementById('pad_length');
		const Z =	this.shadowRoot.getElementById('pad_depth');
		const Y =	this.shadowRoot.getElementById('pad_height');

		sessionStorage.setItem('SetCrates', JSON.stringify([X.value, Z.value, Y.value]));
		X.value = '';
		Z.value = '';
		Y.value = '';
	}

	/**
	 * @function close the dialog when the button is pressed
	*/
	close() {
		this.shadowRoot.getElementById('modal').removeAttribute('open');
		document.querySelector(".side-menu")
			.lastElementChild.remove();
	};
};

globalThis.customElements.define('padding-dialog', DialogPadding);
