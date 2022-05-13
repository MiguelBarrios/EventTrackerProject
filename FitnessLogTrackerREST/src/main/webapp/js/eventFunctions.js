window.addEventListener('load', function(){
	init();
});

function init(){
	loadEventsTable();
}


function loadEventsTable(){
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


function createTable(tableData){

	let tableHeaderContainer = document.getElementById('tableHeaders');
	let tableBodyContainer = document.getElementById('tableBody');

	let headers = ['Exercise Name', 'Weight', 'Num Reps', 'Type', 'Date'];
	let headerRow = document.createElement('tr');
	for(let i = 0; i < headers.length; ++i){
		let th = document.createElement('th');
		th.textContent = headers[i];
		th.scope = "col";
		headerRow.appendChild(th);
	}

	// Create Table Body
	for(let i = 0; i < tableData.length; ++i){
		let item = tableData[i];
		let tableRow = document.createElement('tr');
		let name = document.createElement('td');
		name.textContent = item.exerciseName;
		let reps = document.createElement('td');
		reps.textContent = item.reps;
		let type = document.createElement('td');
		type.textContent = item.type;
		let weight = document.createElement('td');
		weight.textContent = item.weight;
		let date = document.createElement('td');
		date.textContent = item.datetime;

		tableRow.appendChild(name);
		tableRow.appendChild(weight);
		tableRow.appendChild(reps);
		tableRow.appendChild(type);
		tableRow.appendChild(date);

		tableBodyContainer.appendChild(tableRow);


	}
	tableHeaderContainer.appendChild(headerRow);

}
/*

    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>

    </tbody>

	<!-- "id": 1,
"exerciseName": "Bench Press",
"weight": 135.0,
"reps": 15,
"type": "warmup",
"datetime": "2022-02-15 15:30:23" -->
*/