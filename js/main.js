listenForThemeToggle();

function listenForThemeToggle() {
	$(document).ready(function() {
		$("input[type='radio']").filter("[name='selectStyleRadioButton']").click(function() {
			let buttonValue = $(this).attr('value');
			updatePageOnThemeSelection(buttonValue);
		});
	});
}

function updatePageOnThemeSelection(buttonValue) {
	handleImagesChange(buttonValue);
	changeStyleHref(buttonValue);
	changePageHeaderText(buttonValue);
}

function handleImagesChange(buttonValue) {
	let targetBox = $('.' + buttonValue);
	$('.images').not(targetBox).hide();
	$(targetBox).show();
}

function changeStyleHref(stylesheet) {
	let newStyleHref = './css/' + stylesheet + '.css';
	console.log('href=', newStyleHref);
	document.getElementById('pageStyle').setAttribute('href', newStyleHref);
}

function changePageHeaderText(buttonValue) {
	document.getElementById('pageHeaderTheme').innerText = buttonValue;
}
