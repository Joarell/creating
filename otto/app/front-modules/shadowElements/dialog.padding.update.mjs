/*
 * TODO: ShadowRoot element;
 * TODO: Style custom Element;
 * TODO: Populate input list with crates sizes;
 * TODO: Updates indexDB and DB server with new crates sizes;
 * TODO: input fields to new LENGTH, DEPTH, and HEIGHT paddings to selected crates;
 * TODO: Confirmation and abort buttons;
 * TODO: attach the shadow element to 'div id="IO--btn"';
*/

import styleSheet from './dialog.css';
const shadowRoots = new WeakMap();
let test = "Try";

/**
 * @class Build the <dialog> element to popup when the user needs to customize the crate padding;
*/
class DialogPadding extends HTMLElement {
	constructor () {
		super();
		const shadow =				this.attachShadow({ mode: "open" });

		this.adoptedStyleSheet =	[styleSheet];
		this.close =				this.close.bind(this);
		this._watchEscape =			this._watchEscape.bind(this);
		shadowRoots.set(this, shadowRoot);
	};

	/**
	 * @method Populates the dialog popup when clicked.;
	*/
	connectedCallback() {
		const panel =	document.getElementById('IO--btn');
		const node =	document.importNode(panel.content, true);
		const shadow =	this.attachShadow({ mode: "close" });

		this.appendChild(node);
	};

	/**
	 * @method Removes the dialog popup when clicked.;
	*/
	disconnectedCallback() {
	};

	/**
	 * @method Called when the dialog popup moves to the another document.
	*/
	adoptedCallback() {
	};

	/**
	 * @method Update when the dialog popup.
	*/
	attributeChangeCallback() {
	};

	close() {
		this.open !== false ? this.open = false: 0;
	};

	_watchEscape(event) {
		event.key === 'Escape' ? this.close() : 0;
	};
};

globalThis.customElements.define('padding-dialog', DialogPadding);
