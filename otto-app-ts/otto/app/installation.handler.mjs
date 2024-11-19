export async function installer() {
	globalThis.hideInstallPromotion();
	globalThis.deferredPrompt.prompt();

	const { outcome } = await deferredPrompt.userChoice;
	console.log(`User response to the install prompt: ${outcome}`);
	globalThis.deferredPrompt = null;
};
