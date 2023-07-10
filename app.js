const calls = document.querySelectorAll('.column');

document.addEventListener('keydown', event => {
	event.preventDefault()
	if (event.code.toLowerCase() == 'space') {
		setRandomColors()
	}
})

document.addEventListener('click', event => {
	const type = event.target.dataset.type

	if (type == 'lock') {
		const node = event.target.tagName.toLowerCase() == 'i'
			? event.target
			: event.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type == 'copy') {
		copyToClipboard(event.target.textContent)

		var popup = document.createElement("div");
		popup.innerHTML = "Copy";
		popup.classList.add("popup");
		document.body.appendChild(popup);

		setTimeout(function () {
			popup.classList.add("fade-out");
			setTimeout(function () {
				popup.remove();
			}, 1000);
		});
	}
})

function generateRandomColor() {
	const hexCodes = '0123456789ABCDEF'
	let color = ''
	for (let i = 0; i < 6; i++) {
		color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
	}
	return '#' + color
}

function copyToClipboard(text) {
	return navigator.clipboard.writeText(text)
}


function setRandomColors(isInitial) {
	const colors = isInitial ? getColorsFromHash() : []

	calls.forEach((column, index) => {
		const isLocked = column.querySelector('i').classList.contains('fa-lock')
		const text = column.querySelector('h2')
		const button = column.querySelector('button')
		const color = isInitial
			? colors[index]
				? colors[index]
				: generateRandomColor()
			: generateRandomColor()

		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		if (!isInitial) {
			colors.push(color)
		}

		text.textContent = color
		column.style.backgroundColor = color

		setTextColor(button, color)
		setTextColor(text, color)
	})

	updateHash(colors)
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateHash(colors = []) {
	document.location.hash = colors.map((column) => column.substring(1)).join('-')
}

function getColorsFromHash() {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => '#' + color)
	}
	return []
}

setRandomColors(true)