listenForThemeToggle();
addDraggableStyleSelection();

function addDraggableStyleSelection() {
	$(document).ready(function() {
		const themeSelectionSectionElement = document.getElementById('theme-selection-section');
		makeElementDraggable(themeSelectionSectionElement);
	});
}

function listenForThemeToggle() {
	$(document).ready(function() {
		$("input[type='radio']").filter("[name='selectStyleRadioButton']").click(function() {
			let buttonValue = $(this).attr('value');
			updatePageOnThemeSelection(buttonValue);
		});
	});
}

function updatePageOnThemeSelection(buttonValue) {
	changeImages(buttonValue);
	changeStyleHref(buttonValue);
	changePageHeaderText(buttonValue);
	changeLiveStream(buttonValue);
}

function changeImages(buttonValue) {
	const targetBox = $('.' + buttonValue);
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

function changeLiveStream(buttonValue) {
	const targetBox = $('.' + buttonValue);
	$('.livestream').not(targetBox).hide();
	$(targetBox).show();
}

function makeElementDraggable(element) {
	let pos1 = 0;
	let pos2 = 0;
	let pos3 = 0;
	let pos4 = 0;

	element.onmousedown = dragMouseDown;

	function dragMouseDown(event) {
		event = event || window.event;
		event.preventDefault();

		pos3 = event.clientX;
		pos4 = event.clientY;

		document.onmousemove = elementDrag;
		document.onmouseup = stopMovementWhenMouseReleased;
	}

	function elementDrag(event) {
		event = event || window.event;
		event.preventDefault();
		calculateNewCursorPosition(event);

		if (!cursorPositionIsOutOfBounds()) {
			setNewPositionOfElement();
		}
	}

	function calculateNewCursorPosition(event) {
		pos1 = pos3 - event.clientX;
		pos2 = pos4 - event.clientY;
		pos3 = event.clientX;
		pos4 = event.clientY;
	}

	function cursorPositionIsOutOfBounds() {
		const width = element.style.width;
		const height = element.style.height;

		const boundaryRight = window.width;
		const boundaryBottom = window.height;

		const newPositionY = element.offsetTop - pos2;
		const newPositionX = element.offsetLeft - pos1;

		return newPositionY < 0 || newPositionX < 0 || newPositionX > boundaryRight || newPositionY > boundaryBottom;
	}

	function setNewPositionOfElement() {
		element.style.top = element.offsetTop - pos2 + 'px';
		element.style.left = element.offsetLeft - pos1 + 'px';
	}

	function stopMovementWhenMouseReleased() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
