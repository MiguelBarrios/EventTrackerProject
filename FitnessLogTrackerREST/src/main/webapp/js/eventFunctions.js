window.addEventListener('load', function() {
	init();
});

function init() {
	loadEventsTable();
}


function loadEventsTable() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/exerciseset');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				console.log(data);
				createTable(data);
			}
			else {
				console.log('Unable to load event table');
			}
		}
	}
	xhr.send();
}


function createTable(tableData) {

	let tableHeaderContainer = document.getElementById('tableHeaders');
	let tableBodyContainer = document.getElementById('tableBody');

	let headers = ['Exercise Name', 'Weight', 'Num Reps', 'Type', 'Date'];
	let headerRow = document.createElement('tr');
	for (let i = 0; i < headers.length; ++i) {
		let th = document.createElement('th');
		th.textContent = headers[i];
		th.scope = "col";
		headerRow.appendChild(th);
	}

	tableHeaderContainer.appendChild(headerRow);

	// Create Table Body
	for (let i = 0; i < tableData.length; ++i) {

		let item = tableData[i];
		let tableRow = document.createElement('tr');

		createAndAppendElement('td', item.exerciseName, tableRow);
		createAndAppendElement('td', item.reps, tableRow);
		createAndAppendElement('td', item.type, tableRow);
		createAndAppendElement('td', item.weight, tableRow);
		createAndAppendElement('td', item.datetime, tableRow);

		tableBodyContainer.appendChild(tableRow);
	}

}

function createAndAppendElement(tag, content, parent) {
	let item = document.createElement(tag);
	item.textContent = content;
	parent.appendChild(item);
}
