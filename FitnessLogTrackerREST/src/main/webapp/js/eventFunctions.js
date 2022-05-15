window.addEventListener('load', function() {
	init();

	document.addEventForm.addEventBtn.addEventListener('click',createNewEvent);
	document.getElementById("deleteEvent").addEventListener('click', deleteEvent);
	document.getElementById("updateEvent").addEventListener('click', updateEvent);

	$('.closeModalBtn').on('click', function(element_id){
		$('#addItemModal').modal('hide')
	});
});

function init() {
	loadEventsTable();
	loadStatistics();
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

	tableRow.addEventListener('click', loadEventModal);
	tableBodyContainer.prepend(tableRow);
}


function loadEventsTable() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/exerciseset');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
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

	for (let i = tableData.length - 1; i >= 0; --i) {

		let item = tableData[i];
		let tableRow = document.createElement('tr');
		tableRow.id = "eventid-" + item.id;

		createAndAppendElement('td', item.exerciseName, tableRow);
		createAndAppendElement('td', item.weight, tableRow);
		createAndAppendElement('td', item.reps, tableRow);
		createAndAppendElement('td', item.type, tableRow);
		createAndAppendElement('td', item.datetime, tableRow);

		tableRow.addEventListener('click', loadEventModal)
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
				addItemToTable(item);
				loadStatistics();

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

function loadEventModal(event){
	var target = event.target.parentElement;
	let id = target.id.split("-")[1];
	let children = target.children;
	let name = children[0].textContent;
	let weight = children[1].textContent;
	let reps = children[2].textContent;
	let type = children[3].textContent;
	let datetime = children[4].textContent;

	document.updateEventForm.exerciseName.value = name;
	document.updateEventForm.weight.value = weight;
	document.updateEventForm.reps.value = reps;
	document.updateEventForm.type.value = type;

	let date = datetime.split(" ")[0];
	let time = datetime.split(" ")[1];
	document.updateEventForm.currentDate.value = date;
	document.updateEventForm.currentTime.value = time;
	document.updateEventForm.eventId.value = id;


	$("#addItemModal").modal("show");
}

function deleteEvent(event){
	let id = document.updateEventForm.eventId.value;

	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/exerciseset/' + id, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				console.log("item deleted succesfully");
				var divid = "eventid-" + id;
				// Delete element by id
				var elem = document.getElementById(divid);
				elem.parentNode.removeChild(elem);
				$('#addItemModal').modal('hide');
				loadStatistics();
			}
			else {
				console.error("DELETE request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	xhr.send();
}

function updateEvent(){
	let id = document.updateEventForm.eventId.value;
	let name = document.updateEventForm.exerciseName.value;
	let weight = document.updateEventForm.weight.value;
	let reps = document.updateEventForm.reps.value;
	let type = document.updateEventForm.type.value;
	let date = document.updateEventForm.currentDate.value;
	let time = document.updateEventForm.currentTime.value;
	if(time.length == 5){
		time += ":00";
	}
	let dateTime = date + " " + time;
	let newEvent = {
    exerciseName : name,
    weight: weight,
    reps: reps,
    type: type,
    datetime: dateTime
	};
	console.log("***");
	console.log(newEvent);

	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/exerciseset/' + id, true);
	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				let item = JSON.parse(xhr.responseText);
				updateEventContainer(item);
				loadStatistics();
			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	xhr.send(JSON.stringify(newEvent));

}

function updateEventContainer(item){

	var rowId = "eventid-" + item.id;
	var tds = document.getElementById(rowId).children;
	tds[0].textContent = item.exerciseName;
	tds[1].textContent = item.weight;
	tds[2].textContent = item.reps;
	tds[3].textContent = item.type;
	tds[4].textContent = item.datetime;

	$('#addItemModal').modal('hide')

}

function loadStatistics(){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/exerciseset/stats');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				let data = JSON.parse(xhr.responseText);
				buildStatisticsContainer(data);
			}
			else {
				console.log('Unable to load event table');
			}
		}
	}
	xhr.send();
}

function buildStatisticsContainer(data){
	console.log(data);
	let containerMain = document.getElementById('statsInfoContainer');

	document.getElementById('totalVolume').textContent = "Total Volume: " + data["totalVolume"];
	document.getElementById('numActiveDays').textContent = "Days worked out: " + data["daysWorkedOut"];
	document.getElementById('numEx').textContent = "Total Exercises: " + data["distinctExercies"].length;


	let totalVolumePerExerciesPerDay = data["totalVolumePerExerciesPerDay"];
	let totalVolumePerExercise = data["totalVolumePerExercise"];
	console.log(totalVolumePerExerciesPerDay);
	renderTotalVolumeGraph(totalVolumePerExercise);

	document.getElementById('statistics').classList.remove('hidden');
}

function createElement(tag, content){
	let item = document.createElement(tag);
	item.textContent = content;
	return item;
}

function renderTotalVolumeGraph(volumeData){
				document.getElementById('chart_div').innerHTML = '';

	      // Load the Visualization API and the corechart package.
				google.charts.load('current', {'packages':['corechart']});

				// Set a callback to run when the Google Visualization API is loaded.
				google.charts.setOnLoadCallback(drawChart);

				// Callback that creates and populates a data table,
				// instantiates the pie chart, passes in the data and
				// draws it.
				function drawChart() {

					// Create the data table.
					var data = new google.visualization.DataTable();
					data.addColumn('string', 'Exercise Name');
					data.addColumn('number', 'Volume');
					data.addRows(volumeData)

					// Set chart options
					var options = {'title':'Total Volume By exercise',
												 'width':500,
												 'height':400};

					// Instantiate and draw our chart, passing in some options.
					var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
					chart.draw(data, options);
				}

}