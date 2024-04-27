export const htmlDialog = `
<div class="dialog" id="modal" role="dialog" aria-labelledby="title" aria-describedby="content">
	<h2 class="title"><i class="nf nf-cod-settings"></i> Padding setup </h2>
	<span class="pad">*Centimeters padding: L: 23 D: 23 H: 28<br>*Inches padding: L: 9.039 D: 9.039 H: 11</span>
	<form class="padding-dialog" method="dialog" id="dialog-form">
		<iframe loading="lazy" class="dialog-crates" title="Works set" src="./front-modules/shadowElements/padding_status.html"></iframe>
		<div class="pads-sizes" id="">
			<input type="text" inputmode="numeric" class="IO__sizes__len" id="pad_length" placeholder="Length" name="length" maxlength="7" required>
			<input type="text" inputmode="numeric" class="IO__sizes__dep" id="pad_depth" name="depth" placeholder="Depth" maxlength="7" required>
			<input type="text" inputmode="numeric" class="IO__sizes__hei" id="pad_height" placeholder="Height" name="height" maxlength="7" required>
		</div>
		<div class="pad__buttons" id="">
			<button formmethod="dialog" type="button" class="IO__press--btn padding--btn" id="padding-apply">Apply</button>
			<button formmethod="dialog" type="button" class="IO__press--btn padding--btn" id="padding-close">Close</button>
		</div>
	</form>
</div>
`
