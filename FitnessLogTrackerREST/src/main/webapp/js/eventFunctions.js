window.addEventListener('load', function() {
	init();

	document.addEventForm.addEventBtn.addEventListener('click',createNewEvent);
	document.getElementById("deleteEvent").addEventListener('click', function(){
		console.log("delete event btn pressed");
	});

	$('.closeModalBtn').on('click', function(element_id){
		$('#addItemModal').modal('hide')
	});
});

function init() {
	loadEventsTable();
}

function addItemToTable(item){
	let tableBodyContainer = document.getElementById('tableBody');

	let tableRow = document.createElement('tr');
	tableRow.id = "eventid-" + item.id;

	createAndAppendElement('td', item.exerciseName, tableRow);
	createAndAppendElement('td', item.weight, tableRow);
	createAndAppendElement('td', item.reps, tableRow);
	createAndAppendElement('td', item.type, tableRow);
	createAndAppendElement('td', item.datetime, tableRow);

	tableRow.addEventListener('click', settingsEvent)
	tableBodyContainer.prepend(tableRow);


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
	for (let i = tableData.length - 1; i >= 0; --i) {

		let item = tableData[i];
		let tableRow = document.createElement('tr');
		tableRow.id = "eventid-" + item.id;

		createAndAppendElement('td', item.exerciseName, tableRow);
		createAndAppendElement('td', item.weight, tableRow);
		createAndAppendElement('td', item.reps, tableRow);
		createAndAppendElement('td', item.type, tableRow);
		createAndAppendElement('td', item.datetime, tableRow);

		tableRow.addEventListener('click', updateEvent)
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
	};

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/exerciseset', true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let item = JSON.parse(xhr.responseText);
				console.log(item);
				addItemToTable(item);

			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	xhr.send(JSON.stringify(newEvent));
}

//yyyy-mm-dd hh-mm-ss
function formatDate(date){
	let year = date.getFullYear();
	let month = numberStr(date.getMonth());
	let day = numberStr(date.getDate());
	let hour = numberStr(date.getHours());
	let minutes = numberStr(date.getMinutes());
	let seconds = numberStr(date.getSeconds());
	return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
}

function numberStr(number){
	return (number <= 9) ?  "0" + number : number;
}

function updateEvent(event){
	var target = event.target.parentElement;
	let id = target.id.split("-")[1];
	let children = target.children;
	let name = children[0].textContent;
	let weight = children[1].textContent;
	let reps = children[2].textContent;
	let type = children[3].textContent;
	let datetime = children[4].textContent;
	console.log(name);
	console.log(weight);
	console.log(reps);
	console.log(type);
	console.log(datetime);
	document.updateEventForm.exerciseName.value = name;
	document.updateEventForm.weight.value = weight;
	document.updateEventForm.reps.value = reps;
	document.updateEventForm.type.value = type;

	let date = datetime.split(" ")[0];
	let time = datetime.split(" ")[1];
	document.updateEventForm.currentDate.value = date;
	document.updateEventForm.currentTime.value = time;


	$("#addItemModal").modal("show");
}

