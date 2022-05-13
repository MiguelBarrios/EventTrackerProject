window.addEventListener('load', function() {
	init();

	document.addEventForm.addEventBtn.addEventListener('click',createNewEvent);
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

function createNewEvent(event){
	event.preventDefault();

	let form = document.addEventForm;

	let name = form.exerciseName.value;
	let weight = form.weight.value;
	let reps = form.reps.value;
	let type = form.type.value;
	let dateTime = new Date();
	let dateStr = formatDate(dateTime);
	let newEvent = {
    exerciseName : name,
    weight: weight,
    reps: reps,
    type: type,
    datetime: dateStr
	}

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/exerciseset', true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let film = JSON.parse(xhr.responseText);
				console.log(film);
			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	let eventJson = JSON.stringify(newEvent); // Convert JS object to JSON string

	// Pass JSON as request body
	xhr.send(eventJson);


}

function formatDate(date){

	let year = date.getFullYear();
	let month = numberStr(date.getMonth());
	let day = numberStr(date.getDate());
	let hour = numberStr(date.getHours());
	let minutes = numberStr(date.getMinutes());
	let seconds = numberStr(date.getSeconds());
	let dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
	console.log(dateStr);
}

function numberStr(number){
	return (number <= 9) ?  "0" + number : number;
}